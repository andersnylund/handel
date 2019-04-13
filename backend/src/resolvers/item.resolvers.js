import { prisma } from '../generated/prisma-client';

export default {
  Mutation: {
    addItem: async (parent, args, ctx) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }
      const item = prisma.createItem({
        ...args,
        userId: ctx.request.user.sub,
        email: ctx.request.user.email,
      });

      return item;
    },
    editItem: async (parent, args, ctx, info) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }

      const item = await prisma.item({
        id: args.id,
      });

      // TODO test this
      if (!item || item.userId !== ctx.request.user.sub) {
        throw new Error('Item not found');
      }

      // first take a copy of the updates
      const updates = { ...args };
      // remove the ID from the updates
      delete updates.id;
      // run the update mehtod
      return prisma.updateItem(
        {
          data: updates,
          where: {
            id: args.id,
          },
        },
        info,
      );
    },
    removeItem: async (parent, args, ctx) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }

      const item = await prisma.item({
        id: args.id,
      });

      // TODO test and abstract away this
      if (!item || item.userId !== ctx.request.user.sub) {
        throw new Error('Item not found');
      }

      await prisma.deleteItem({
        id: args.id,
      });

      return true;
    },
  },

  Query: {
    myItems: (parent, args, ctx) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }

      const items = prisma.items({
        where: {
          userId: ctx.request.user.sub,
        },
      });

      return items;
    },

    getMyItem: (parent, args, ctx) => {
      if (!ctx.request.user) {
        throw new Error('You must be logged in');
      }

      const item = prisma.item({
        id: args.id,
      });

      return item;
    },

    nextItem: async (parent, args, ctx) => {
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
    },
  },
};