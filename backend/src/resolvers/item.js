import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    myItems: combineResolvers(
      isAuthenticated,
      async (parent, args, { models: { Item }, me }) => {
        const items = await Item.findAll({
          where: {
            userId: me.id,
          },
        });
        return items;
      }
    ),
    items: combineResolvers(
      isAuthenticated,
      async (parent, args, { models: { Item }, me }) => {
        const items = await Item.findAll({
          where: {
            userId: {
              [Op.not]: me.id,
            },
          },
        });
        return items;
      }
    ),
  },
  Mutation: {
    addItem: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { title, description, price, image, largeImage },
        { models: { Item }, me }
      ) => {
        const item = await Item.create({
          title,
          description,
          price,
          image,
          largeImage,
          userId: me.id,
        });
        return item;
      }
    ),
  },
};
