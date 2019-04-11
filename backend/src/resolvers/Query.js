const { prisma } = require('../generated/prisma-client');

const Queries = {
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

  myDeals: async (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    const myItemIds = (await Promise.resolve(
      prisma.items({
        where: {
          userId: ctx.request.user.sub,
        },
      }),
    )).map(item => item.id);

    const myOfferReceiverItemIds = (await Promise.resolve(
      prisma
        .offers({
          where: {
            maker: {
              id_in: [...myItemIds],
            },
            type: 'ACCEPT',
          },
        })
        .$fragment('{ receiver { id }}'),
    )).map(offer => offer.receiver.id);

    const myAnsweredOffers = await prisma
      .offers({
        where: {
          maker: {
            id_in: [...myOfferReceiverItemIds],
          },
          receiver: {
            id_in: [...myItemIds],
          },
          type: 'ACCEPT',
        },
      })
      .$fragment(
        '{ id type maker { id title description price image largeImage email } receiver { id title description price image largeImage email } }',
      );

    return myAnsweredOffers.map(offer => ({
      myItem: offer.maker,
      otherItem: offer.receiver,
      participant: {
        email: offer.receiver.email,
      },
      offer,
    }));
  },
};

export default Queries;
