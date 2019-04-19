import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, ctx) => {
  const { token } = ctx.request;
  if (!token) {
    throw new Error('Not logged in');
  } else {
    return skip;
  }
};

// export const isMessageOwner = async (parent, { id }, { models, me }) => {
//   const message = await models.Message.findByPk(id, { raw: true });
//   if (message.userId !== me.id) {
//     throw new ForbiddenError('Not authenticated as owner');
//   }
//   return skip;
// };

export default {
  isAuthenticated,
};
