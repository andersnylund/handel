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
        .$fragment('{ id title description image largeImage user { id sub } }');

      // TODO test and abstract away this
      if (!myItem || myItem.user.sub !== ctx.request.user.sub) {
        throw new Error('Item not found');
      }

      const participationsWithItem = await prisma.participants({
        where: {
          deal: {
            participants_none: {
              item: null,
            },
          },
          item: {
            id: myItem.id,
          },
          approval_in: ['ACCEPT', 'REJECT'],
        },
      }).$fragment(`{
        deal {
          participants {
            item {
              id
            }
          }
        }
      }`);

      let otherItemsInMyDeals = [];
      participationsWithItem.forEach(participation => {
        participation.deal.participants.forEach(participant => {
          otherItemsInMyDeals = [...otherItemsInMyDeals, participant.item.id];
        });
      });

      const notMyItems = await prisma
        .items({
          where: {
            id_not_in: [...otherItemsInMyDeals],
            user: {
              id_not: me.id,
            },
          },
        })
        .$fragment('{ id title description image largeImage }');

      return notMyItems[0];
    }),

    myDeals: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const myAcceptedDeals = await prisma.deals({
        where: {
          participants_every: {
            approval: 'ACCEPT',
          },
          participants_none: {
            item: null,
          },
          participants_some: {
            item: {
              user: {
                id: ctx.request.user.id,
              },
            },
          },
        },
      }).$fragment(`{
          participants {
            item {
              id
              title
              description
              image
              user {
                id
                email
              }
            }
          }
        }`);

      return myAcceptedDeals.map(deal => {
        const myItem = deal.participants.find(
          p => p.item.user.id === ctx.request.user.id,
        ).item;
        const otherItem = deal.participants.find(
          p => p.item.user.id !== ctx.request.user.id,
        ).item;

        return {
          myItem,
          otherItem,
          contactEmail: otherItem.user.email,
        };
      });
    }),
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

      const previousDealsWithItems = await prisma
        .deals({
          where: {
            participants_every: {
              item: {
                id_in: [myItem.id, otherItem.id],
              },
            },
          },
        })
        .$fragment('{ id participants { id item { id title } } }');

      // no previous deals
      if (previousDealsWithItems.length === 0) {
        const now = new Date().toISOString();

        const me = await prisma.createParticipant({
          approval: args.approval,
          lastSeen: now,
          user: { connect: { id: myItem.user.id } },
          item: { connect: { id: myItem.id } },
        });

        const otherParticipant = await prisma.createParticipant({
          approval: 'UNACKNOWLEDGED',
          lastSeen: now,
          user: { connect: { id: otherItem.user.id } },
          item: { connect: { id: otherItem.id } },
        });

        const deal = await prisma.createDeal({
          participants: {
            connect: [{ id: me.id }, { id: otherParticipant.id }],
          },
        });

        return deal;
      }

      const previousDeal = previousDealsWithItems[0];
      const me = previousDeal.participants.find(
        participant => participant.item.id === myItem.id,
      );

      await prisma.updateParticipant({
        where: {
          id: me.id,
        },
        data: {
          approval: args.approval,
        },
      });

      return prisma.deal({
        id: previousDeal.id,
      });
    }),
  },
};
