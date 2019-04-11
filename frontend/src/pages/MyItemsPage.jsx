import React, { Fragment } from 'react';
import { Header, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';

import MyItemList from '../components/MyItemList';

const AddButton = styled(Button)`
  position: -webkit-sticky;
  position: sticky;
  bottom: 1rem;
  float: right;
`;

const onClickAddNew = (event, history) => {
  event.preventDefault();
  history.push('/add-item');
};

const MyItems = ({ history }) => (
  <Fragment>
    <Header as="h2">My Items</Header>
    <MyItemList />
    <AddButton
      circular
      icon="add"
      color="blue"
      size="huge"
      onClick={event => onClickAddNew(event, history)}
    />
  </Fragment>
);

MyItems.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(MyItems);
