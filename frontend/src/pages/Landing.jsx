import React from 'react';
import { Header } from 'semantic-ui-react';

import withAuthorization from '../session/withAuthorization';

const Landing = ({ session }) => <Header as="h2">Landing Page</Header>;

export default withAuthorization(session => session && session.me)(Landing);
