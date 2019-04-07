// This file connects to the prisma DB and gives us the abiliity to query it with JS
import { Prisma } from 'prisma-binding';

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

export default db;
