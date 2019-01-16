import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuthorization from '../session/withAuthorization';
import TradeItems from '../components/TradeItems';

const GET_ITEMS = gql`
  {
    items {
      edges {
        id
        title
        description
        price
        image
        largeImage
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Items = () => (
  <Fragment>
    <Header as="h2">Items</Header>
    <Query query={GET_ITEMS}>
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        return <TradeItems items={data.items.edges} />;
      }}
    </Query>
  </Fragment>
);

export default withAuthorization(session => session && session.me)(Items);
