import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Image, Segment, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const GET_MY_ITEMS = gql`
  {
    myItems {
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

const MyItemList = () => (
  <Fragment>
    <Query query={GET_MY_ITEMS}>
      {({ data, loading }) => {
        if (loading) {
          return (
            <Segment loading>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          );
        }

        return (
          <Card.Group stackable doubling itemsPerRow={3}>
            {data.myItems.edges.map(item => (
              <Card key={item.id}>
                <Image src={item.image} />
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Meta>{`${item.price} €`}</Card.Meta>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to={`/edit-item/${item.id}`}>
                    <Icon name="edit" />
                    Edit
                  </Link>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        );
      }}
    </Query>
  </Fragment>
);

export default MyItemList;
