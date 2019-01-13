import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import Logout from '../pages/Logout';

const authorizedMenu = () => (
  <Dropdown icon="bars" item>
    <Dropdown.Menu>
      <Dropdown.Item>
        <Link to={routes.ACCOUNT}>Account</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link to={routes.MY_ITEMS}>My Items</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Logout />
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const unauthorizedMenu = () => (
  <Menu.Item>
    <Link to={routes.LOGIN}>Login</Link>
  </Menu.Item>
);

const NavBar = ({ session }) => (
  <Menu>
    <Menu.Item>
      <Link to={routes.LANDING}>Handel</Link>
    </Menu.Item>
    <Menu.Menu position="right">
      {session && session.me ? authorizedMenu() : unauthorizedMenu()}
    </Menu.Menu>
  </Menu>
);

export default NavBar;
