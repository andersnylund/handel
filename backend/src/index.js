import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import createServer from './prisma/createServer';

dotenv.config();

const server = createServer();

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
    console.log('deets:', deets);
    // eslint-disable-next-line no-console
    console.log(`Server is now running on port http://localhost:${deets.port}`);
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
