import express from 'express';
import helmet from 'helmet';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

dotenv.config();
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();
app.use(cors());
app.use(helmet());

const getMe = async req => {
  const token = req.headers.bearer;

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError('Your sessions expired. Sign in again.');
    }
  }

  return null; // TODO test this
};

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

const createUsers = async () => {
  await models.User.create({
    username: 'andersnylund',
    email: 'anders.nylund.an@gmail.com',
    password: 'secretpassword',
  });

  await models.User.create({
    username: 'jdoe',
    email: 'john.doe@example.com',
    password: 'johndoe',
  });
};

sequelize.sync({ force: isDevelopment }).then(async () => {
  if (isDevelopment) {
    createUsers();
  }

  app.listen({ port: 8000 }, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.green('Apollo Server on http://localhost:8000/graphql'));
  });
});
