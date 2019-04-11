import React, { Fragment } from 'react';
import {
  Form,
  Button,
  Input,
  Header,
  Label,
  Message,
  TextArea,
} from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';

import { GET_MY_ITEMS } from '../components/MyItemList';

const GET_MY_ITEM = gql`
  query($id: ID!) {
    getMyItem(id: $id) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const EDIT_ITEM = gql`
  mutation(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String
  ) {
    editItem(
      id: $id
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

class EditItemPage extends React.Component {
  state = {
    uploadingFile: false,
  };

  uploadFile = async event => {
    this.setState({
      uploadingFile: true,
    });

    const { files } = event.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'handel'); // preset selected in cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/andersnylund/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await response.json();
    await this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      uploadingFile: false,
    });
  };

  onSubmit = async (event, mutation) => {
    event.preventDefault();
    await mutation();
    this.setState({
      message: 'Item edited!',
    });
    setTimeout(() => {
      this.setState(prev => ({
        ...prev,
        message: null,
      }));
    }, 3000);
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { match } = this.props;
    const { id } = match.params;

    const {
      title,
      description,
      price,
      image,
      largeImage,
      message,
      uploadingFile,
    } = this.state;

    return (
      <Fragment>
        <Query query={GET_MY_ITEM} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <div>Loading...</div>;
            }

            if (!data || !data.getMyItem) {
              return <div>No item found for this ID</div>;
            }

            return (
              <Mutation
                mutation={EDIT_ITEM}
                variables={{
                  id,
                  title,
                  description,
                  price: price ? Number(price) : undefined,
                  image,
                  largeImage,
                }}
                refetchQueries={[{ query: GET_MY_ITEMS }]}
              >
                {(editItemMutation, { loading: isLoading }) => (
                  <Fragment>
                    <Header as="h2">Edit item</Header>
                    <Form loading={isLoading || uploadingFile}>
                      <Form.Field>
                        <Input
                          name="title"
                          placeholder="Title"
                          type="text"
                          defaultValue={data.getMyItem.title}
                          onChange={this.onChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <TextArea
                          name="description"
                          placeholder="Description"
                          type="text"
                          defaultValue={data.getMyItem.description}
                          onChange={this.onChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Input
                          name="price"
                          labelPosition="right"
                          placeholder="Price"
                          type="number"
                          defaultValue={data.getMyItem.price}
                          onChange={this.onChange}
                        >
                          <input />
                          <Label basic>€</Label>
                        </Input>
                      </Form.Field>
                      <Form.Field>
                        <Input
                          name="file"
                          placeholder="Upload an image"
                          type="file"
                          onChange={this.uploadFile}
                        />
                      </Form.Field>
                      <Button
                        type="submit"
                        onClick={event =>
                          this.onSubmit(event, editItemMutation)
                        }
                      >
                        Edit
                      </Button>
                    </Form>
                  </Fragment>
                )}
              </Mutation>
            );
          }}
        </Query>
        {message && <Message color="green">{message}</Message>}
      </Fragment>
    );
  }
}

EditItemPage.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(EditItemPage);
