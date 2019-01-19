import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
  Image,
  Segment,
  Card,
  Icon,
  Modal,
  Button,
  Label,
} from 'semantic-ui-react';
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

const REMOVE_ITEM = gql`
  mutation($id: ID!) {
    removeItem(id: $id)
  }
`;

class MyItemList extends React.Component {
  state = {
    isModalOpen: false,
  };

  onRemoveItem = async (event, mutation) => {
    event.preventDefault();
    await mutation();
    this.handleClose();
  };

  handleOpen = () => this.setState({ isModalOpen: true });

  handleClose = () => this.setState({ isModalOpen: false });

  render() {
    const { isModalOpen } = this.state;

    return (
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

            const removeButton = (
              <Label color="red" onClick={this.handleOpen}>
                <Icon name="remove" />
                Remove
              </Label>
            );

            return (
              <Card.Group stackable doubling itemsPerRow={3}>
                {data.myItems.edges.map(item => (
                  <Mutation
                    key={item.id}
                    mutation={REMOVE_ITEM}
                    variables={{ id: item.id }}
                    refetchQueries={[{ query: GET_MY_ITEMS }]}
                  >
                    {removeItemMutation => (
                      <Card>
                        <Image src={item.image} />
                        <Card.Content>
                          <Card.Header>{item.title}</Card.Header>
                          <Card.Meta>{`${item.price} €`}</Card.Meta>
                          <Card.Description>
                            {item.description}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Label.Group>
                            <Label color="blue">
                              <Icon name="edit" />
                              <Link to={`/edit-item/${item.id}`}>Edit</Link>
                            </Label>
                            <Modal
                              size="mini"
                              trigger={removeButton}
                              open={isModalOpen}
                              onClose={this.handleClose}
                            >
                              <Modal.Header>Remove item?</Modal.Header>
                              <Modal.Actions>
                                <Button
                                  color="red"
                                  inverted
                                  onClick={event =>
                                    this.onRemoveItem(event, removeItemMutation)
                                  }
                                >
                                  <Icon name="remove" />
                                  Remove
                                </Button>
                                <Button onClick={this.handleClose}>
                                  Cancel
                                </Button>
                              </Modal.Actions>
                            </Modal>
                          </Label.Group>
                        </Card.Content>
                      </Card>
                    )}
                  </Mutation>
                ))}
              </Card.Group>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
export default MyItemList;
