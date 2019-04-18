import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';

import './env';
import createServer from './createServer';
import { getKey, options } from './utils';
import { prisma } from './generated/prisma-client';

const server = createServer();

// decode the jwt so we can get the userId on each request
server.express.use(async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    const token = await Promise.resolve(
      new Promise((resolve, reject) => {
        // eslint-disable-next-line consistent-return
        jwt.verify(idToken, getKey, options, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      }),
    );
    const users = await prisma.users({
      where: {
        sub: token.sub,
      },
    });
    req.token = token;
    req.user = users[0] ? users[0] : null;
    next();
  } catch (e) {
    // TODO throw error message to client
    req.token = null;
    req.user = null;
    next();
  }
});

server.start(
  {
    endpoint: '/graphql',
    playground: '/playground',
    subscriptions: '/subscriptions',
    port: process.env.PORT,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    // eslint-disable-next-line no-console
    console.log('Server running: \n', deets);
  },
);

const relativeFrontendBuildPath = '../../frontend/build';

// Serve static files from the React app
server.express.use(
  express.static(path.join(__dirname, relativeFrontendBuildPath)),
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.express.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, relativeFrontendBuildPath, '/index.html'));
});
