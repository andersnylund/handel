import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import TradingPage from './pages/TradingPage';
import LoginPage from './pages/LoginPage';
import MyItemsPage from './pages/MyItemsPage';
import AddItemPage from './pages/AddItemPage';

import * as routes from './constants/routes';
import EditItemPage from './pages/EditItemPage';
import DealsPage from './pages/DealsPage';
import Auth from './auth/Auth';
import Callback from './auth/Callback';

class App extends Component {
  constructor(props) {
    super(props);
    const { history } = this.props;
    this.state = {
      auth: new Auth(history),
    };
  }

  render() {
    const { auth } = this.state;
    return (
      <Fragment>
        <NavBar auth={auth} />
        <Container>
          <Route exact path={routes.ITEMS} component={() => <TradingPage />} />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <Route
            exact
            path={routes.LOGIN}
            component={() => <LoginPage auth={auth} />}
          />
          <Route
            exact
            path={routes.ADD_ITEM}
            component={() => <AddItemPage />}
          />
          <Route path={routes.EDIT_ITEM} component={() => <EditItemPage />} />
          <Route
            exact
            path={routes.MY_ITEMS}
            component={() => <MyItemsPage />}
          />
          <Route exact path={routes.MY_DEALS} component={() => <DealsPage />} />
        </Container>
      </Fragment>
    );
  }
}

export default App;
