import React, { Fragment } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { NEXT_ITEM } from '../pages/TradingPage';

const MAKE_OFFER = gql`
  mutation makeOffer($myItemId: ID!, $otherItemId: ID!, $type: OfferType!) {
    makeOffer(myItemId: $myItemId, otherItemId: $otherItemId, type: $type) {
      id
    }
  }
`;

const Item = ({ item, myItemId }) => (
  <Card>
    <Image src={item.image} />
    <Card.Content>
      <Card.Header>{item.title}</Card.Header>
      <Card.Meta>{`${item.price} €`}</Card.Meta>
      <Card.Description>{item.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Fragment>
        <Mutation
          mutation={MAKE_OFFER}
          variables={{ myItemId, otherItemId: item.id, type: 'ACCEPT' }}
          refetchQueries={[{ query: NEXT_ITEM, variables: { myItemId } }]}
        >
          {makeOfferMutation => (
            <Button basic color="green" onClick={makeOfferMutation}>
              Deal
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={MAKE_OFFER}
          variables={{ myItemId, otherItemId: item.id, type: 'REJECT' }}
          refetchQueries={[{ query: NEXT_ITEM, variables: { myItemId } }]}
        >
          {makeOfferMutation => (
            <Button basic color="red" onClick={makeOfferMutation}>
              No deal
            </Button>
          )}
        </Mutation>
      </Fragment>
    </Card.Content>
  </Card>
);

export default Item;
