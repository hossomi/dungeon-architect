import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* eslint-disable react/prefer-stateless-function */
export default class Button extends React.Component {
  className = () => {
    const { className, enabled, active } = this.props;
    const baseClassName = className
      ? `icon-button ${className}`
      : 'icon-button';
    if (!enabled) return `${baseClassName} disabled`;
    if (active) return `${baseClassName} active`;
    return baseClassName;
  }

  onClick = (e) => {
    const { enabled, onClick } = this.props;
    if (enabled) onClick(e);
  }

  render() {
    const { icon } = this.props;

    return (
      <button
        type="button"
        className={this.className()}
        onClick={this.onClick}>
        <svg viewBox="0 0 100 100">
          <FontAwesomeIcon icon={icon} />
        </svg>
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  enabled: PropTypes.bool,
  active: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: '',
  enabled: true,
  active: false,
  onClick: () => { }
};
