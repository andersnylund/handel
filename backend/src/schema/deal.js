import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    myDeals(cursor: String, limit: Int): DealConnection!
  }

  type DealConnection {
    edges: [Deal!]!
    pageInfo: PageInfo!
  }

  type Deal {
    myItem: Item!
    otherItem: Item!
    participant: Participant!
  }

  type Participant {
    userId: String!
  }
`;
