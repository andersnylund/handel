import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import TradingPage from './pages/TradingPage';
import LoginPage from './pages/LoginPage';
import MyItemsPage from './pages/MyItemsPage';
import AddItemPage from './pages/AddItemPage';

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
      <>
        <NavBar auth={auth} />
        <Container>
          <Route exact path="/" component={() => <TradingPage />} />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <Route
            exact
            path="/login"
            component={() => <LoginPage auth={auth} />}
          />
          <Route exact path="/add-item" component={() => <AddItemPage />} />
          <Route path="/edit-item/:id" component={() => <EditItemPage />} />
          <Route exact path="/my-items" component={() => <MyItemsPage />} />
          <Route exact path="/my-deals" component={() => <DealsPage />} />
        </Container>
      </>
    );
  }
}

export default withRouter(App);
