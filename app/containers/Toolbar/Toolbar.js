import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Toolbar = ({ rooms }) => (
  <footer>
    There are {rooms.length} rooms.
  </footer>
);


Toolbar.propTypes = {
  rooms: PropTypes.array
};

export default Toolbar;
