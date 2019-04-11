import React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import Auth from '../auth/Auth';

const authorizedMenu = logout => (
  <Dropdown icon="bars" item>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/trade">
        Trade
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/my-items">
        Items
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/my-deals">
        Deals
      </Dropdown.Item>
      <Dropdown.Item as={Button} onClick={logout}>
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const unauthorizedMenu = login => (
  <Menu.Item as={Button} onClick={login}>
    Login
  </Menu.Item>
);

const NavBar = ({ auth: { isAuthenticated, logout, login } }) => (
  <Menu>
    <Menu.Item as={Link} to="/">
      Handel
    </Menu.Item>
    <Menu.Menu position="right">
      {isAuthenticated() ? authorizedMenu(logout) : unauthorizedMenu(login)}
    </Menu.Menu>
  </Menu>
);

NavBar.propTypes = {
  auth: instanceOf(Auth).isRequired,
};

export default NavBar;
