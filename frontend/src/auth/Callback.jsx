import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { shape, string, func } from 'prop-types';

class Callback extends Component {
  componentDidMount = () => {
    const { location, auth } = this.props;
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL.');
    }
  };

  render() {
    return <Loader active>Loading...</Loader>;
  }
}

Callback.propTypes = {
  location: shape({
    hash: string.isRequired,
  }).isRequired,
  auth: shape({
    handleAuthentication: func.isRequired,
  }).isRequired,
};

export default Callback;
