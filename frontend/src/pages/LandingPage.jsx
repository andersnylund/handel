import React from 'react';
import { Header, Message } from 'semantic-ui-react';

const LandingPage = () => (
  <>
    <Header as="h2">Handel</Header>
    <Message color="red">
      DO NOT USE A REAL EMAIL OR PASSWORD!
      <br />
      This is a testing version of the early version of the service. I take no
      responsibility or liability of anything you do with the service. I may
      delete all data at any point.
    </Message>
  </>
);

export default LandingPage;
