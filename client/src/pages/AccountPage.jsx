import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';

import withAuthorization from '../session/withAuthorization';

const Account = () => (
  <Fragment>
    <Header as="h2">Account</Header>
  </Fragment>
);

export default withAuthorization(session => session && session.me)(Account);
