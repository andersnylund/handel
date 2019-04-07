import { GraphQLServer } from 'graphql-yoga';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import db from './db';

// Create the GraphQL Yoga server

const createServer = () =>
  new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });

export default createServer;
