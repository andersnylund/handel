import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';

import { isAuthenticated } from './authorization';
import { fromCursorHash, toCursorHash } from '../utils';

export default {
  Query: {
    myDeals: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { cursor, limit = 100 },
        { models: { Item, Offer }, user }
      ) => {
        const cursorOptions = cursor
          ? {
              createdAt: {
                [Op.lt]: fromCursorHash(cursor),
              },
            }
          : {};

        const myItemIds = await Item.findAll({
          where: {
            userId: user.sub,
          },
        }).map(item => item.id);

        const myOffers = await Offer.findAll({
          where: {
            makerId: {
              [Op.in]: [...myItemIds],
            },
          },
        });

        const myOffersOtherIds = await myOffers.map(offer => offer.receiverId);

        const myAnsweredOffers = await Offer.findAll({
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
          where: {
            ...cursorOptions,
            makerId: {
              [Op.in]: [...myOffersOtherIds],
            },
            receiverId: {
              [Op.in]: [...myItemIds],
            },
          },
        });

        if (myAnsweredOffers.length === 0) {
          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          };
        }

        const hasNextPage = myAnsweredOffers.length > limit;

        const myDeals = await Promise.all(
          myAnsweredOffers.map(async offer => {
            const myItem = await Item.findByPk(offer.receiverId);
            const otherItem = await Item.findByPk(offer.makerId);

            return {
              myItem,
              otherItem,
              participant: {
                userId: otherItem.userId,
              },
              offer,
            };
          })
        );

        const edges = hasNextPage ? myDeals.slice(0, -1) : myDeals;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor: toCursorHash(edges[edges.length - 1].offer.createdAt),
          },
        };
      }
    ),
  },
};
