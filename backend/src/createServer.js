import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';

// Create the GraphQL Yoga server

const createServer = () =>
  new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req }),
  });

export default createServer;
