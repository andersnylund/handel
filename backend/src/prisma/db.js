import { Prisma } from 'prisma-binding';
import dotenv from 'dotenv';

// TODO why is this needed here?
dotenv.config();

// This file connects to the prisma DB and gives us the abiliity to query it with JS

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

export default db;
