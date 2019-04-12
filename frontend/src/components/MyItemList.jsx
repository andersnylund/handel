import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
  Image,
  Card,
  Icon,
  Modal,
  Button,
  Label,
  Loader,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const GET_MY_ITEMS = gql`
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

const REMOVE_ITEM = gql`
  mutation($id: ID!) {
    removeItem(id: $id)
  }
`;

class MyItemList extends React.Component {
  state = {
    isModalOpen: false,
    mutation: null,
  };

  handleRemoveItem = async (event, mutation) => {
    event.preventDefault();
    await mutation();
    this.handleClose();
  };

  handleOpen = mutation => {
    this.setState({ isModalOpen: true, mutation });
  };

  handleClose = () =>
    this.setState({
      isModalOpen: false,
      mutation: null,
    });

  render() {
    const { isModalOpen, mutation } = this.state;

    return (
      <Fragment>
        <Query query={GET_MY_ITEMS}>
          {({ data, loading }) => {
            if (loading) {
              return <Loader active>Loading</Loader>;
            }

            return (
              <Card.Group stackable centered itemsPerRow={3}>
                {data.myItems.map(item => (
                  <Mutation
                    key={item.id}
                    mutation={REMOVE_ITEM}
                    variables={{ id: item.id }}
                    refetchQueries={[{ query: GET_MY_ITEMS }]}
                  >
                    {removeItemMutation => (
                      <Card>
                        <Image centered src={item.image} />
                        <Card.Content>
                          <Card.Header>{item.title}</Card.Header>
                          <Card.Meta>{`${item.price} €`}</Card.Meta>
                          <Card.Description>
                            {item.description}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Label.Group>
                            <Label
                              color="blue"
                              as={Link}
                              to={`/edit-item/${item.id}`}
                            >
                              <Icon name="edit" />
                              Edit
                            </Label>
                            <Label
                              as={Button}
                              color="red"
                              onClick={() =>
                                this.handleOpen(removeItemMutation)
                              }
                            >
                              <Icon name="remove" />
                              Remove
                            </Label>
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
        <Modal size="mini" open={isModalOpen} onClose={this.handleClose}>
          <Modal.Header>Remove item?</Modal.Header>
          <Modal.Actions>
            <Button
              color="red"
              inverted
              onClick={event => this.handleRemoveItem(event, mutation)}
            >
              <Icon name="remove" />
              Remove
            </Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}
export default MyItemList;
