import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Button } from 'semantic-ui-react';

import * as routes from '../constants/routes';
import history from '../constants/history';

export const logout = client => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push(routes.LOGIN);
};

const LogoutButton = () => (
  <ApolloConsumer>
    {client => (
      <Button type="button" onClick={() => logout(client)}>
        Logout
      </Button>
    )}
  </ApolloConsumer>
);

export default LogoutButton;
