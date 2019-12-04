import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import IconButton from 'components/IconButton';

const Sidebar = ({ rooms }) => (
  <footer>
    <h1>Dungeon Architect</h1>
    <div className="sidebar-content">
      <div className="sidebar-toolbar">
        <IconButton icon="plus-square" enabled={false} />
        <IconButton icon="plus-square" active />
        <IconButton icon="plus-square" />
      </div>
      <div className="sidebar-settings">

      </div>
    </div>
  </footer>
);


Sidebar.propTypes = {
  rooms: PropTypes.array
};

export default Sidebar;
