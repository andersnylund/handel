import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            // 1. Redirect to login if not logged in.
            if (!auth.isAuthenticated()) {
              return auth.login();
            }

            // 2. Render component
            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
