import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Button } from 'semantic-ui-react';

import * as routes from '../constants/routes';
import history from '../constants/history';

export const signOut = client => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push(routes.SIGN_IN);
};

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <Button type="button" onClick={() => signOut(client)}>
        Sign Out
      </Button>
    )}
  </ApolloConsumer>
);

export default SignOutButton;
