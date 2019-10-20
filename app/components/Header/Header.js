import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <h1>Dungeon Architect</h1>
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Overview
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
