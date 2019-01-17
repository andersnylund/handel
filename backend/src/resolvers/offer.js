import { combineResolvers } from 'graphql-resolvers';
import { UserInputError } from 'apollo-server';

import { isAuthenticated } from './authorization';

export default {
  Query: {},
  Mutation: {
    makeOffer: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { myItemId, otherItemId, type },
        { models: { Offer, Item } }
      ) => {
        const myItem = await Item.findByPk(myItemId);
        const otherItem = await Item.findByPk(otherItemId);
        if (!myItem || !otherItem) {
          throw new UserInputError('Item ID not found!');
        }
        const result = await Offer.create({
          type,
          makerId: myItem.id,
          receiverId: otherItem.id,
        });
        return {
          id: result.id,
          myItem,
          otherItem,
          type: result.type,
        };
      }
    ),
  },
};
