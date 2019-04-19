import { combineResolvers } from 'graphql-resolvers';

import { prisma } from '../generated/prisma-client';
import { isAuthenticated } from './authorizationHelpers';

export default {
  Mutation: {
    register: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      // eslint-disable-next-line camelcase
      const { sub, email_verified, email } = ctx.request.token;
      const users = await prisma.users({
        where: {
          sub,
        },
      });
      if (users.length === 0) {
        await prisma.createUser({
          sub,
          email,
          emailVerified: email_verified,
        });
        return true;
      }
      const user = users[0];
      await prisma.updateUser({
        where: {
          id: user.id,
        },
        data: {
          sub,
          email,
          emailVerified: email_verified,
        },
      });
      return false;
    }),
  },
};