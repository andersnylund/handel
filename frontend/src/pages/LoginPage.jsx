import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import Auth from '../auth/Auth';

const Login = ({ auth: { isAuthenticated, login } }) => (
  <Fragment>
    {isAuthenticated() ? (
      <Link to="/profile">View profile</Link>
    ) : (
      <Button onClick={login}>Log In</Button>
    )}
  </Fragment>
);

Login.propTypes = {
  auth: instanceOf(Auth).isRequired,
};

export default withRouter(Login);
