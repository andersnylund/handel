import React from 'react';
import {
  Form,
  Button,
  Input,
  Label,
  Message,
  TextArea,
  Container,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import { GET_MY_ITEMS } from '../components/MyItemList';

const ADD_ITEM = gql`
  mutation(
    $title: String!
    $description: String!
    $price: Int!
    $image: String!
    $largeImage: String!
  ) {
    addItem(
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

const initialState = {
  title: '',
  description: '',
  price: 0,
  image: '',
  largeImage: '',
  message: null,
};

class AddItem extends React.Component {
  state = {
    ...initialState,
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
      ...initialState,
      message: 'New item added!',
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
      <Container>
        <Mutation
          mutation={ADD_ITEM}
          variables={{
            title,
            description,
            price: Number(price),
            image,
            largeImage,
          }}
          refetchQueries={[{ query: GET_MY_ITEMS }]}
        >
          {(addItem, { loading }) => (
            <>
              <Message>
                <Message.Header>Add new item</Message.Header>
                <p>Item that you don&apos;t longer want or need</p>
              </Message>
              <Form loading={loading || uploadingFile}>
                <Form.Field>
                  <Input
                    name="title"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <TextArea
                    name="description"
                    placeholder="Description"
                    type="text"
                    value={description}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    name="price"
                    labelPosition="right"
                    placeholder="Price"
                    type="number"
                    value={price}
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
                  color="green"
                  onClick={event => this.onSubmit(event, addItem)}
                >
                  Add
                </Button>
              </Form>
            </>
          )}
        </Mutation>
        {message && <Message color="green">{message}</Message>}
      </Container>
    );
  }
}

export default withRouter(AddItem);
