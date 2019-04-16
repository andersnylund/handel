import React, { useState } from 'react';
import { Header, Loader, Message, Container } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import posed from 'react-pose';
import styled from 'styled-components';

import Item from '../components/Item';
import SelectMyItem from '../components/SelectMyItem';

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

const Posed = posed.div({
  before: { opacity: 0 },
  after: { opacity: 1 },
});

const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TradingPage = () => {
  const [itemId, setItemId] = useState(null);
  return (
    <StyledContainer>
      <Message>
        <Message.Header>Trade</Message.Header>
        <p>
          Select an item to trade with. Other items to trade against will pop up
          and you can either accept or reject them
        </p>
      </Message>
      <SelectMyItem onChangeItem={(e, { value }) => setItemId(value)} />
      {itemId && (
        <>
          <Query query={NEXT_ITEM} variables={{ myItemId: itemId }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <Loader active>Loading</Loader>;
              }
              if (error) {
                return <Message color="red">Something went wrong!</Message>;
              }
              if (!data.nextItem) {
                return (
                  <Message color="yellow">
                    No more items to trade against :(
                  </Message>
                );
              }
              return (
                <>
                  <Header as="h3">Against</Header>
                  <Posed pose="after" initialPose="before">
                    <Item item={data.nextItem} myItemId={itemId} />
                  </Posed>
                </>
              );
            }}
          </Query>
        </>
      )}
    </StyledContainer>
  );
};

export default TradingPage;
