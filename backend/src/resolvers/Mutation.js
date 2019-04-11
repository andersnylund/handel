import { prisma } from '../generated/prisma-client';

const Mutations = {
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

  makeOffer: async (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    // TODO check if myItem is owned by the right person

    const myItem = await prisma.item({
      id: args.myItemId,
    });
    const otherItem = await prisma.item({
      id: args.otherItemId,
    });
    if (!myItem || !otherItem) {
      throw new Error('Item ID not found!');
    }
    const result = await prisma.createOffer({
      type: args.type,
      maker: {
        connect: {
          id: myItem.id,
        },
      },
      receiver: {
        connect: {
          id: otherItem.id,
        },
      },
    });

    return result;
  },
};

export default Mutations;
