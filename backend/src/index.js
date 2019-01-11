import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import { getMe } from './utils';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import { createData } from './testData';

dotenv.config();
const isDevelopment = false; // process.env.NODE_ENV === 'development';

const app = express();
app.use(cors());
app.use(helmet());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  debug: isDevelopment,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync({ force: isDevelopment }).then(async () => {
  if (isDevelopment) {
    await createData(models);
  }

  app.listen({ port: 8000 }, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.green('Apollo Server on http://localhost:8000/graphql'));
  });
});

export default { getMe };
