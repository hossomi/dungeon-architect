import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Toolbar = ({ rooms }) => (
  <footer>
    <svg width="60" height="80" viewBox="0 0 14 18" transform="scale(1.5)">
      <g>
        <path d="M 1 1 H 13 V 12 H 12 V 2 H 2 V 16 H 8 V 17 H 1 Z" />
        <path d="M 10 12 H 11 V 14 H 13 V 15 H 11 V 17 H 10 V 15 H 8 V 14 H 10 Z" />
      </g>
    </svg>
  </footer>
);


Toolbar.propTypes = {
  rooms: PropTypes.array
};

export default Toolbar;
