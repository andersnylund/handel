import React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const authorizedMenu = logout => (
  <Dropdown icon="bars" item>
    <Dropdown.Menu>
      <Dropdown.Item>
        <Link to="/my-items">Items</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link to="/my-deals">Deals</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Button onClick={logout}>Logout</Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const unauthorizedMenu = () => (
  <Menu.Item>
    <Link to="/login">Login</Link>
  </Menu.Item>
);

const NavBar = ({ auth: { isAuthenticated, login, logout } }) => (
  <Menu>
    <Menu.Item>
      <Link to="/">Handel</Link>
    </Menu.Item>
    <Menu.Menu position="right">
      {isAuthenticated() ? authorizedMenu(logout) : unauthorizedMenu()}
    </Menu.Menu>
  </Menu>
);

export default NavBar;
