import { prisma } from '../generated/prisma-client';

export default {
  Mutation: {
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
  },
};
