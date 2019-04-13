import React, { useState } from 'react';
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

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [message, setMessage] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const onSubmit = async (event, mutation) => {
    event.preventDefault();
    await mutation();
    setMessage('Item created!');
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const uploadFile = async event => {
    setIsUploadingFile(true);
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
    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
    setIsUploadingFile(false);
  };

  const formIsValid =
    title !== '' &&
    description !== '' &&
    price !== '' &&
    image !== '' &&
    largeImage !== '';

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
            <Form loading={loading || isUploadingFile}>
              <Form.Field>
                <Input
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <TextArea
                  name="description"
                  placeholder="Description"
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <Input
                  name="price"
                  labelPosition="right"
                  placeholder="Price"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
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
                  onChange={uploadFile}
                />
              </Form.Field>
              <Button
                type="submit"
                color="green"
                onClick={event => onSubmit(event, addItem)}
                disabled={!formIsValid}
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
};

export default withRouter(AddItem);
