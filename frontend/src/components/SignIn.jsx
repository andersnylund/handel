import React, { Fragment } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

class SignIn extends React.Component {
  state = {
    login: 'andersnylund',
    password: 'verysecretpassword',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (event, signIn) => {
    event.preventDefault();
    const { data } = await signIn();
    localStorage.setItem('token', data.signIn.token);
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
          <Mutation mutation={SIGN_IN} variables={{ login, password }}>
            {signIn => (
              <Button
                type="submit"
                onClick={event => this.onSubmit(event, signIn)}
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

export default SignIn;
