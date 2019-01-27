import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';
import jwt from 'jsonwebtoken';

import { getKey, options } from './utils';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

dotenv.config();
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();
app.use(cors());
app.use(helmet());

const relativeFrontendBuildPath = '../../frontend/build';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, relativeFrontendBuildPath)));

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
    const token = req.headers.authorization;
    try {
      const user = await Promise.resolve(
        new Promise((resolve, reject) => {
          // eslint-disable-next-line consistent-return
          jwt.verify(token, getKey, options, (err, decoded) => {
            if (err) {
              return reject(err);
            }
            resolve(decoded);
          });
        })
      );
      return {
        models,
        user,
      };
    } catch (e) {
      return {
        models,
        user: null,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(`Apollo Server on http://localhost:${port}/graphql`)
    );
    // eslint-disable-next-line no-console
    console.log(chalk.yellow(`NODE_ENV=${process.env.NODE_ENV}`));
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, relativeFrontendBuildPath, '/index.html'));
});
