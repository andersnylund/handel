import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_DEALS = gql`
  {
    myDeals {
      edges {
        myItem {
          title
          description
          price
          image
        }
        otherItem {
          title
          description
          price
          image
        }
        participant {
          username
          email
        }
      }
    }
  }
`;

const DealsList = () => (
  <Query query={GET_DEALS}>{({ data, loading, error }) => <Fragment />}</Query>
);

export default DealsList;
