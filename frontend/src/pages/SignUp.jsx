import React, { Fragment } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

class Login extends React.Component {
  state = {
    username: 'andersnylund',
    email: 'anders.nylund.an@gmail.com',
    password: 'verysecretpassword',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (event, signUpMutation) => {
    const { history, refetch } = this.props;

    event.preventDefault();
    const { data } = await signUpMutation();
    await localStorage.setItem('token', data.signUp.token);
    await refetch();
    history.push(routes.ITEMS);
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <Fragment>
        <Header as="h2">Sign up</Header>
        <Form>
          <Form.Field>
            <input
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Mutation
            mutation={SIGN_UP}
            variables={{ username, email, password }}
          >
            {loginMutation => (
              <Button
                type="submit"
                onClick={event => this.onSubmit(event, loginMutation)}
              >
                Sign up
              </Button>
            )}
          </Mutation>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(Login);
