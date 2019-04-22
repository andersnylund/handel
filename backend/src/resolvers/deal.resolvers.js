import { combineResolvers } from 'graphql-resolvers';

import { prisma } from '../generated/prisma-client';
import { isAuthenticated } from './authorizationHelpers';

export default {
  Query: {
    nextItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const me = ctx.request.user;

      const myItem = await prisma
        .item({
          id: args.myItemId,
        })
        .$fragment(
          '{ id title description price image largeImage user { id sub } }',
        );

      // TODO test and abstract away this
      if (!myItem || myItem.user.sub !== ctx.request.user.sub) {
        throw new Error('Item not found');
      }

      const myDeals = await prisma.deals({
        where: {
          dealParticipants_some: {
            participant: {
              id: me.id,
            },
          },
        },
      });
      console.log('myDeals:', myDeals);

      const allNotMyItems = await prisma.items({
        where: {
          NOT: {
            user: {
              id: ctx.request.user.id,
            },
          },
        },
      });

      return allNotMyItems[0];
    }),

    // myDeals: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
    //   if (!ctx.request.user) {
    //     throw new Error('You must be logged in');
    //   }

    //   const myItemIds = (await Promise.resolve(
    //     prisma.items({
    //       where: {
    //         userId: ctx.request.user.sub,
    //       },
    //     }),
    //   )).map(item => item.id);

    //   const myOfferReceiverItemIds = (await Promise.resolve(
    //     prisma
    //       .offers({
    //         where: {
    //           maker: {
    //             id_in: [...myItemIds],
    //           },
    //           type: 'ACCEPT',
    //         },
    //       })
    //       .$fragment('{ receiver { id }}'),
    //   )).map(offer => offer.receiver.id);

    //   const myAnsweredOffers = await prisma
    //     .offers({
    //       where: {
    //         maker: {
    //           id_in: [...myOfferReceiverItemIds],
    //         },
    //         receiver: {
    //           id_in: [...myItemIds],
    //         },
    //         type: 'ACCEPT',
    //       },
    //     })
    //     .$fragment(
    //       '{ id type maker { id title description price image largeImage email } receiver { id title description price image largeImage email } }',
    //     );

    //   return myAnsweredOffers.map(offer => ({
    //     myItem: offer.maker,
    //     otherItem: offer.receiver,
    //     participant: {
    //       email: offer.receiver.email,
    //     },
    //     offer,
    //   }));
    // }),
  },

  Mutation: {
    deal: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const myItem = await prisma
        .item({
          id: args.myItemId,
        })
        .$fragment('{ id user { id sub } }');

      if (!myItem || myItem.user.sub !== ctx.request.user.sub) {
        throw new Error('Item not found!');
      }

      const otherItem = await prisma
        .item({
          id: args.otherItemId,
        })
        .$fragment('{ id user { id sub } }');

      const previousDeals = await prisma.deals({
        where: {
          dealParticipants_some: {
            items_some: {
              id_in: [myItem.id, otherItem.id],
            },
          },
        },
      });

      // no previous deals
      if (previousDeals.length === 0) {
        const now = new Date().toISOString();

        const me = await prisma.createDealParticipant({
          approval: args.approval,
          lastSeen: now,
          participant: {
            connect: {
              id: myItem.user.id,
            },
          },
          items: {
            connect: [{ id: myItem.id }],
          },
        });

        const otherParticipant = await prisma.createDealParticipant({
          approval: 'UNACKNOWLEDGED',
          lastSeen: now,
          participant: {
            connect: {
              id: otherItem.user.id,
            },
          },
          items: {
            connect: [{ id: otherItem.id }],
          },
        });

        const deal = await prisma.createDeal({
          dealParticipants: {
            connect: [{ id: me.id }, { id: otherParticipant.id }],
          },
        });

        return deal;
      }
      return null;
    }),
  },
};
