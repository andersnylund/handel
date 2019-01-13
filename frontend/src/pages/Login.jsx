import React, { Fragment } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const LOGIN = gql`
  mutation($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

class Login extends React.Component {
  state = {
    login: 'andersnylund',
    password: 'verysecretpassword',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (event, loginMutation) => {
    const { history, refetch } = this.props;

    event.preventDefault();
    const { data } = await loginMutation();
    await localStorage.setItem('token', data.login.token);
    await refetch();
    history.push(routes.LANDING);
  };

  render() {
    const { login, password } = this.state;
    return (
      <Fragment>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field>
            <input
              name="login"
              placeholder="Username or email"
              id="login"
              value={login}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="password"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Mutation mutation={LOGIN} variables={{ login, password }}>
            {loginMutation => (
              <Button
                type="submit"
                onClick={event => this.onSubmit(event, loginMutation)}
              >
                Login
              </Button>
            )}
          </Mutation>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(Login);
