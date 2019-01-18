import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    myItems(cursor: String, limit: Int): ItemConnection!
    getMyItem(id: ID!): Item!
    nextItem(myItemId: ID!): Item
  }

  extend type Mutation {
    addItem(
      title: String!
      description: String!
      price: Int!
      image: String!
      largeImage: String!
    ): Item!
    editItem(
      id: ID!
      title: String
      description: String
      price: Int
      image: String
      largeImage: String
    ): Item!
    removeItem(id: ID!): Boolean!
  }

  type ItemConnection {
    edges: [Item!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  type Item {
    id: ID!
    title: String!
    description: String!
    price: Int!
    image: String!
    largeImage: String!
  }
`;
