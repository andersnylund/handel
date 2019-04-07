const Mutations = {
  addItem: async (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }
    const item = ctx.db.mutation.createItem({
      data: { ...args, userId: ctx.request.user.sub },
    });

    return item;
  },

  editItem: async (parent, args, ctx, info) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    const item = await ctx.db.query.item({
      where: {
        id: args.id,
      },
    });

    // TODO test this
    if (!item || item.userId !== ctx.request.user.sub) {
      throw new Error('Item not found');
    }

    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update mehtod
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  removeItem: async (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    const item = await ctx.db.query.item({
      where: {
        id: args.id,
      },
    });

    // TODO test and abstract away this
    if (!item || item.userId !== ctx.request.user.sub) {
      throw new Error('Item not found');
    }

    await ctx.db.mutation.deleteItem({
      where: {
        id: args.id,
      },
    });

    return true;
  },
};

export default Mutations;
