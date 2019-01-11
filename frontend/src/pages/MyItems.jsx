import React, { Fragment } from 'react';
import { Header, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const AddButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

const onClickAddNew = (event, history) => {
  event.preventDefault();
  history.push(routes.ADD_ITEM);
};

const MyItems = ({ history }) => (
  <Fragment>
    <Header as="h2">My Items</Header>
    <AddButton
      circular
      icon="add"
      color="blue"
      onClick={event => onClickAddNew(event, history)}
    />
  </Fragment>
);

export default withRouter(MyItems);
