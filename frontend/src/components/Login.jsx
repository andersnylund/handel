import React, { Fragment } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';

const Login = () => (
  <Fragment>
    <Header as="h2">Login</Header>
    <Form>
      <Form.Field>
        <label htmlFor="username">
          Username
          <input placeholder="Username" id="username" />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">
          Password
          <input placeholder="Password" id="password" type="password" />
        </label>
      </Form.Field>
      <Button type="submit">Login</Button>
    </Form>
  </Fragment>
);

export default Login;
