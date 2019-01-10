import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import Login from './components/Login';

const App = () => (
  <React.Fragment>
    <Menu>
      <Menu.Item>Handel</Menu.Item>
    </Menu>
    <Container>
      <Login />
    </Container>
  </React.Fragment>
);

export default App;
