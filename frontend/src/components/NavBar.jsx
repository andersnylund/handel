import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOut from '../pages/SignOut';

const NavBar = ({ session }) => (
  <Menu>
    <Menu.Item>
      <Link to={routes.LANDING}>Handel</Link>
    </Menu.Item>
    <Menu.Menu position="right">
      {session && session.me ? (
        <Fragment>
          <Menu.Item>
            <Link to={routes.MY_ITEMS}>My Items</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={routes.ACCOUNT}>Account</Link>
          </Menu.Item>
          <Menu.Item>
            <SignOut />
          </Menu.Item>
        </Fragment>
      ) : (
        <Menu.Item>
          <Link to={routes.SIGN_IN}>Sign In</Link>
        </Menu.Item>
      )}
    </Menu.Menu>
  </Menu>
);

export default NavBar;
