import { combineResolvers } from 'graphql-resolvers';

import { prisma } from '../generated/prisma-client';
import { isAuthenticated } from './authorization';

export default {
  Mutation: {
    addItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const item = prisma.createItem({
        ...args,
        user: {
          connect: {
            id: ctx.request.user.id,
          },
        },
      });
      return item;
    }),

    editItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const item = await prisma
        .item({
          id: args.id,
        })
        .$fragment(
          '{ title description image largeImage price user { id sub } }',
        );

      // TODO test this
      if (!item || item.user.sub !== ctx.request.token.sub) {
        throw new Error('Item not found');
      }

      // first take a copy of the updates
      const updates = { ...args };
      // remove the ID from the updates
      delete updates.id;
      // run the update mehtod
      return prisma.updateItem({
        data: updates,
        where: {
          id: args.id,
        },
      });
    }),

    removeItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const item = await prisma
        .item({
          id: args.id,
        })
        .$fragment(
          '{ title description image largeImage price user { id sub } }',
        );

      // TODO test and abstract away this
      if (!item || item.user.sub !== ctx.request.token.sub) {
        throw new Error('Item not found');
      }

      await prisma.deleteItem({
        id: args.id,
      });

      return true;
    }),
  },

  Query: {
    myItems: combineResolvers(isAuthenticated, (parent, args, ctx) => {
      const items = prisma.items({
        where: {
          user: {
            sub: ctx.request.user.sub,
          },
        },
      });

      return items;
    }),

    getMyItem: combineResolvers(isAuthenticated, (parent, args) => {
      const item = prisma.item({
        id: args.id,
      });

      return item;
    }),

    nextItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }

      const myItem = await prisma.item({
        id: args.myItemId,
      });

      // TODO test and abstract away this
      if (!myItem || myItem.userId !== ctx.request.user.sub) {
        throw new Error('Item not found');
      }

      const myItemIds = (await Promise.resolve(
        prisma.items({
          where: {
            userId: ctx.request.user.sub,
          },
        }),
      )).map(item => item.id);

      const offeredItemIds = (await Promise.resolve(
        prisma
          .offers({
            where: {
              maker: {
                id: myItem.id,
              },
            },
          })
          .$fragment('{ receiver { id } }'),
      )).map(item => item.receiver.id);

      const result = await prisma.items({
        where: {
          id_not_in: [...myItemIds, ...offeredItemIds],
        },
        first: 1,
      });
      const first = result[0];
      return first;
    }),
  },
};
