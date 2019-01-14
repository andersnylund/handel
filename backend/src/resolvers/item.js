import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';

import { isAuthenticated } from './authorization';

const toCursorHash = string =>
  Buffer.from(JSON.stringify(string)).toString('base64');

const fromCursorHash = string =>
  JSON.parse(Buffer.from(string, 'base64').toString('utf-8'));

const getItems = async (Item, cursor, limit, where) => {
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
      ...where,
      ...cursorOptions,
    },
  });

  const hasNextPage = items.length > limit;
  const edges = hasNextPage ? items.slice(0, -1) : items;

  // FIXME breaks if limit=0

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: toCursorHash(edges[edges.length - 1].createdAt),
    },
  };
};

export default {
  Query: {
    myItems: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 100 }, { models: { Item }, me }) => {
        const where = {
          userId: me.id,
        };
        return getItems(Item, cursor, limit, where);
      }
    ),
    items: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 100 }, { models: { Item }, me }) => {
        const where = {
          userId: {
            [Op.not]: me.id,
          },
        };
        return getItems(Item, cursor, limit, where);
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
  },
};
