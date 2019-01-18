import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import { UserInputError } from 'apollo-server';

import { isAuthenticated } from './authorization';

const toCursorHash = string =>
  Buffer.from(JSON.stringify(string)).toString('base64');

const fromCursorHash = string =>
  JSON.parse(Buffer.from(string, 'base64').toString('utf-8'));

export default {
  Query: {
    myItems: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 100 }, { models: { Item }, me }) => {
        const cursorOptions = cursor
          ? {
              createdAt: {
                [Op.lt]: fromCursorHash(cursor),
              },
            }
          : {};

        const items = await Item.findAll({
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
          where: {
            userId: me.id,
            ...cursorOptions,
          },
        });

        if (items.length === 0) {
          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          };
        }

        const hasNextPage = items.length > limit;
        const edges = hasNextPage ? items.slice(0, -1) : items;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor: toCursorHash(edges[edges.length - 1].createdAt),
          },
        };
      }
    ),
    getMyItem: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models: { Item }, me }) => {
        const item = await Item.findByPk(id);
        if (!item || item.userId !== me.id) {
          throw new UserInputError('Item not found');
        }
        return item;
      }
    ),
    nextItem: combineResolvers(
      isAuthenticated,
      async (parent, { myItemId }, { models: { Item, Offer }, me }) => {
        const myItem = await Item.findByPk(myItemId);

        if (!myItem) {
          throw new UserInputError('Item ID not found');
        }

        const myItems = await Item.findAll({
          where: {
            userId: me.id,
          },
        }).map(item => item.id);

        const offersWithItem = await Offer.findAll({
          where: {
            makerId: myItemId,
          },
        }).map(offer => offer.receiverId);

        const result = await Item.findAll({
          limit: 1,
          where: {
            id: {
              [Op.notIn]: [...offersWithItem, ...myItems],
            },
          },
        });
        const first = result[0];
        return first;
      }
    ),
  },
  Mutation: {
    addItem: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { title, description, price, image, largeImage },
        { models: { Item }, me }
      ) => {
        const item = await Item.create({
          title,
          description,
          price,
          image,
          largeImage,
          userId: me.id,
        });
        return item;
      }
    ),
    editItem: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { id, title, description, price, image, largeImage },
        { models: { Item }, me }
      ) => {
        const item = await Item.findByPk(id);
        if (!item || item.userId !== me.id) {
          throw new UserInputError('Item not found');
        }

        const result = await item.update({
          ...(title && { title }),
          ...(description && { description }),
          ...(price && { price }),
          ...(image && { image }),
          ...(largeImage && { largeImage }),
        });
        return result;
      }
    ),
  },
};
