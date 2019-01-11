import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import Landing from './pages/Landing';
// import SignUpPage from '../SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import MyItems from './pages/MyItems';
import AddItem from './pages/AddItem';
// import AdminPage from '../Admin';
import withSession from './session/withSession';

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
        <Route
          exact
          path={routes.ACCOUNT}
          component={() => <Account refetch={refetch} />}
        />
        <Route
          exact
          path={routes.ADD_ITEM}
          component={() => <AddItem refetch={refetch} />}
        />
        <Route
          exact
          path={routes.MY_ITEMS}
          component={() => <MyItems refetch={refetch} />}
        />
      </Container>
    </Fragment>
  </Router>
);

export default withSession(App);
