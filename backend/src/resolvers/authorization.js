import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { user }) =>
  user ? skip : new ForbiddenError('Not authenticated as user.');

export const isItemOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Item.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
