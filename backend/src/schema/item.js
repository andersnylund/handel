import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    myItems: [Item!]!
  }

  extend type Mutation {
    addItem(title: String!, description: String!, price: Int!): Item!
  }

  type Item {
    id: ID!
    title: String!
    description: String!
    price: Int!
  }
`;
