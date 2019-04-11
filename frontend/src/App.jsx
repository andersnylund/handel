import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { shape, func } from 'prop-types';

import NavBar from './components/NavBar';
import TradingPage from './pages/TradingPage';
import MyItemsPage from './pages/MyItemsPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import DealsPage from './pages/DealsPage';
import Auth from './auth/Auth';
import AuthContext from './auth/AuthContext';
import Callback from './auth/Callback';
import PrivateRoute from './auth/PrivateRoute';
import LandingPage from './pages/LandingPage';

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
      <AuthContext.Provider value={auth}>
        <NavBar auth={auth} />
        <Container>
          <Route exact path="/" component={() => <LandingPage auth={auth} />} />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute exact path="/trade" component={TradingPage} />
          <PrivateRoute exact path="/add-item" component={AddItemPage} />
          <PrivateRoute path="/edit-item/:id" component={EditItemPage} />
          <PrivateRoute exact path="/my-items" component={MyItemsPage} />
          <PrivateRoute exact path="/my-deals" component={DealsPage} />
        </Container>
      </AuthContext.Provider>
    );
  }
}

App.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(App);
