import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const authorizedMenu = () => (
  <Dropdown icon="bars" item>
    <Dropdown.Menu>
      <Dropdown.Item>
        <Link to={routes.MY_ITEMS}>Items</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link to={routes.MY_DEALS}>Deals</Link>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const unauthorizedMenu = () => (
  <Menu.Item>
    <Link to={routes.LOGIN}>Login</Link>
  </Menu.Item>
);

const NavBar = ({ auth: { isAuthenticated, login, logout } }) => (
  <Menu>
    <Menu.Item>
      <Link to={routes.ITEMS}>Handel</Link>
    </Menu.Item>
    <Menu.Menu position="right">
      {isAuthenticated() ? authorizedMenu() : unauthorizedMenu()}
    </Menu.Menu>
  </Menu>
);

export default NavBar;
