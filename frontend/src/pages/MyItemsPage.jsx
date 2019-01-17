import React, { Fragment } from 'react';
import { Header, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import MyItemList from '../components/MyItemList';
import withAuthorization from '../session/withAuthorization';

const AddButton = styled(Button)`
  position: -webkit-sticky;
  position: sticky;
  bottom: 1rem;
  float: right;
`;

const onClickAddNew = (event, history) => {
  event.preventDefault();
  history.push(routes.ADD_ITEM);
};

const MyItems = ({ history }) => (
  <Fragment>
    <Header as="h2">My Items</Header>
    <MyItemList />
    <AddButton
      circular
      icon="add"
      color="blue"
      onClick={event => onClickAddNew(event, history)}
    />
  </Fragment>
);

export default withAuthorization(session => session && session.me)(
  withRouter(MyItems)
);
