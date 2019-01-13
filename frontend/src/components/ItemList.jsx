import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Image, Segment, Card } from 'semantic-ui-react';

const GET_MY_ITEMS = gql`
  {
    myItems {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const ItemList = () => (
  <Fragment>
    <Query query={GET_MY_ITEMS}>
      {({ data, loading, error }) => {
        if (loading) {
          return (
            <Segment loading>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          );
        }

        return (
          <Card.Group stackable doubling itemsPerRow={3}>
            {data.myItems.map(item => (
              <Card key={item.id}>
                <Image src={item.image} />
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Meta>{`${item.price} €`}</Card.Meta>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        );
      }}
    </Query>
  </Fragment>
);

export default ItemList;
