import React from 'react';
import { Container } from 'semantic-ui-react';

import SignIn from './components/SignIn';
import NavBar from './components/NavBar';

const App = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <SignIn />
    </Container>
  </React.Fragment>
);

export default App;
