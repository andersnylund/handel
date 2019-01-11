import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import Landing from './components/Landing';
// import SignUpPage from '../SignUp';
import SignIn from './components/SignIn';
// import AccountPage from '../Account';
// import AdminPage from '../Admin';
import withSession from './components/session/withSession';

import * as routes from './constants/routes';
import history from './constants/history';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <Fragment>
      <NavBar session={session} />
      <Container>
        <Route exact path={routes.LANDING} component={() => <Landing />} />
        <Route
          exact
          path={routes.SIGN_IN}
          component={() => <SignIn refetch={refetch} />}
        />
      </Container>
    </Fragment>
  </Router>
);

export default withSession(App);
