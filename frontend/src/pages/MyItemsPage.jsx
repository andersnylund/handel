import React from 'react';
import { Message, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';

import MyItemList from '../components/MyItemList';

const Container = styled.div`
  text-align: center;
`;

const AddButton = styled(Button)`
  position: -webkit-sticky;
  position: sticky;
  bottom: 1rem;
  float: right;
  right: 1rem;
`;

const onClickAddNew = (event, history) => {
  event.preventDefault();
  history.push('/add-item');
};

const MyItems = ({ history }) => (
  <Container>
    <Message>
      <Message.Header>Items</Message.Header>
      <p>Each of your item. Add more items from the blue plus button</p>
    </Message>
    <MyItemList />
    <AddButton
      circular
      icon="add"
      color="blue"
      size="huge"
      onClick={event => onClickAddNew(event, history)}
    />
  </Container>
);

MyItems.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(MyItems);
