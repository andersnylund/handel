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
};

export default Queries;
