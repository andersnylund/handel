import React, { Fragment } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { shape, string, number } from 'prop-types';

import { NEXT_ITEM } from '../pages/TradingPage';

const DEAL = gql`
  mutation deal($myItemId: ID!, $otherItemId: ID!, $approval: DealApproval!) {
    deal(myItemId: $myItemId, otherItemId: $otherItemId, approval: $approval) {
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
          mutation={DEAL}
          variables={{ myItemId, otherItemId: item.id, approval: 'ACCEPT' }}
          refetchQueries={[{ query: NEXT_ITEM, variables: { myItemId } }]}
        >
          {makeDealMutation => (
            <Button basic color="green" onClick={makeDealMutation}>
              Deal&nbsp;
              <span role="img" aria-label="hand-shake">
                🤝
              </span>
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={DEAL}
          variables={{ myItemId, otherItemId: item.id, approval: 'REJECT' }}
          refetchQueries={[{ query: NEXT_ITEM, variables: { myItemId } }]}
        >
          {makeDealMutation => (
            <Button basic color="red" onClick={makeDealMutation}>
              No deal&nbsp;
              <span role="img" aria-label="stop-hand">
                ✋
              </span>
            </Button>
          )}
        </Mutation>
      </Fragment>
    </Card.Content>
  </Card>
);

Item.propTypes = {
  item: shape({
    id: string.isRequired,
    description: string.isRequired,
    image: string.isRequired,
    largeImage: string.isRequired,
    price: number.isRequired,
    title: string.isRequired,
  }).isRequired,
  myItemId: string.isRequired,
};

export default Item;
