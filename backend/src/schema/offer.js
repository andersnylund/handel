import { gql } from 'apollo-server-express';

export default gql`
  # extend type Query {}

  extend type Mutation {
    makeOffer(myItemId: ID!, otherItemId: ID!, type: OfferType!): Offer!
  }

  enum OfferType {
    ACCEPT
    REJECT
    SKIP
  }

  type Offer {
    id: ID!
    myItem: Item!
    otherItem: Item!
    type: OfferType!
  }
`;
