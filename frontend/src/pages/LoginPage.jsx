import React, { Fragment } from 'react';
import { Header, Button, Message } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const Login = ({ auth: { isAuthenticated, login } }) => (
  <Fragment>
    <Header as="h2">Welcome to handel</Header>
    <Message color="red">
      This is a testing version of the early version of the service. I take no
      responsibility or liability of anything you do with the service. I may
      delete all data at any point.
    </Message>
    {isAuthenticated() ? (
      <Link to="/profile">View profile</Link>
    ) : (
      <Button onClick={login}>Log In</Button>
    )}
  </Fragment>
);

export default withRouter(Login);
