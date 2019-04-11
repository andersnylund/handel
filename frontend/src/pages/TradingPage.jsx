import React, { useState } from 'react';
import { Header, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Item from '../components/Item';
import SelectMyItem from '../components/SelectMyItem';
import posed from 'react-pose';

export const NEXT_ITEM = gql`
  query($myItemId: ID!) {
    nextItem(myItemId: $myItemId) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const TradingPage = () => {
  const [itemId, setItemId] = useState(null);
  return (
    <>
      {itemId && <Header as="h3">Trading with</Header>}
      <SelectMyItem onChangeItem={(e, { value }) => setItemId(value)} />
      {itemId && (
        <>
          <Header as="h3">Against</Header>
          <Query query={NEXT_ITEM} variables={{ myItemId: itemId }}>
            {({ data, loading }) => {
              if (loading) {
                return <Loader active>Loading</Loader>;
              }
              if (!data.nextItem) {
                return <div>No more items to trade against :( </div>;
              }
              return <Item item={data.nextItem} myItemId={itemId} />;
            }}
          </Query>
        </>
      )}
    </>
  );
};

export default TradingPage;
