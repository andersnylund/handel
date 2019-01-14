import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuthorization from '../session/withAuthorization';
import Item from '../components/Item';

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

const Items = ({ session }) => (
  <Fragment>
    <Header as="h2">Items</Header>
    <Query query={GET_ITEMS}>
      {({ data, loading, error }) => {
        return <Item />;
      }}
    </Query>
  </Fragment>
);

export default withAuthorization(session => session && session.me)(Items);
