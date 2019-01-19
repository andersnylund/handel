import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import TradingPage from './pages/TradingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import MyItemsPage from './pages/MyItemsPage';
import AddItemPage from './pages/AddItemPage';
import withSession from './session/withSession';

import * as routes from './constants/routes';
import history from './constants/history';
import EditItemPage from './pages/EditItemPage';
import DealsPage from './pages/DealsPage';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <Fragment>
      <NavBar session={session} />
      <Container>
        <Route exact path={routes.ITEMS} component={() => <TradingPage />} />
        <Route
          exact
          path={routes.LOGIN}
          component={() => <LoginPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.SIGN_UP}
          component={() => <SignUpPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.ACCOUNT}
          component={() => <AccountPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.ADD_ITEM}
          component={() => <AddItemPage refetch={refetch} />}
        />
        <Route
          path={routes.EDIT_ITEM}
          component={() => <EditItemPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.MY_ITEMS}
          component={() => <MyItemsPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.MY_DEALS}
          component={() => <DealsPage refetch={refetch} />}
        />
      </Container>
    </Fragment>
  </Router>
);

export default withSession(App);
