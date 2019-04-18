import { combineResolvers } from 'graphql-resolvers';

import { prisma } from '../generated/prisma-client';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    nextItem: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
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

      const myItemIds = (await Promise.resolve(
        prisma.items({
          where: {
            user: {
              sub: ctx.request.user.sub,
            },
          },
        }),
      )).map(item => item.id);

      const allNotMyItems = await prisma.items({
        where: {
          id_not_in: myItemIds,
        },
      });

      // const dealsWithMyItems = await prisma.deals({
      //   where: {
      //     items_some: {
      //       id_in: myItemIds,
      //     },
      //   },
      // });

      return allNotMyItems[0];
    }),

    myDeals: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
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
    }),
  },
};
