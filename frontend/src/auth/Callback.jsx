import React, { Component } from 'react';

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
    return <h1>Loading...</h1>;
  }
}

export default Callback;
