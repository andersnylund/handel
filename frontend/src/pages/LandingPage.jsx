import React from 'react';
import { Message } from 'semantic-ui-react';
import posed from 'react-pose';

const Posed = posed.div({
  after: { y: 0, opacity: 1 },
  before: { y: 50, opacity: 0 },
});

const LandingPage = () => (
  <Posed pose="after" initialPose="before">
    <Message color="red">
      DO NOT USE A REAL EMAIL OR PASSWORD!
      <br />
      <br />
      This is a testing version of the early version of the service. I take no
      responsibility or liability of anything you do with the service. I may
      delete all data at any point.
    </Message>
  </Posed>
);

export default LandingPage;
