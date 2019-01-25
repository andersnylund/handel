import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';

import DealsList from '../components/DealsList';

const MyItems = () => (
  <Fragment>
    <Header as="h2">Deals</Header>
    <DealsList />
  </Fragment>
);

export default MyItems;
