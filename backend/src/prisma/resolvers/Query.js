const Queries = {
  myItems: (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    const items = ctx.db.query.items({
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

    const item = ctx.db.query.item({
      where: {
        id: args.id,
      },
    });

    return item;
  },

  nextItem: async (parent, args, ctx) => {
    if (!ctx.request.user) {
      throw new Error('You must be logged in');
    }

    const myItem = await ctx.db.query.item({
      where: {
        id: args.myItemId,
      },
    });

    // TODO test and abstract away this
    if (!myItem || myItem.userId !== ctx.request.user.sub) {
      throw new Error('Item not found');
    }

    const myItems = await ctx.db.query.items({
      where: {
        userId: ctx.request.user.sub,
      },
    });
    const myItemIds = myItems.map(item => item.id);

    const offeredItems = await ctx.db.query.offers(
      {
        where: {
          maker: {
            id: myItem.id,
          },
        },
      },
      `{ receiver { id } }`,
    );
    const offeredItemIds = offeredItems.map(item => item.receiver.id);

    const result = await ctx.db.query.items({
      where: {
        id_not_in: [...myItemIds, ...offeredItemIds],
      },
      first: 1,
    });
    const first = result[0];
    return first;
  },
};

export default Queries;
