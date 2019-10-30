import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.scss';

import { gridRowPoints } from 'utils/geometry';

const HTICK = {
  top: (width) => ({
    y: width - 2,
    shift: 'auto'
  }),

  bottom: () => ({
    y: 2,
    shift: 'sub'
  })
};

const VTICK = {
  left: (y, width) => ({
    y: y - width + 2 + 1,
    shift: 'sub'
  }),

  right: (y) => ({
    y: y - 2,
    shift: 'auto'
  })
};

function htick(x, value, width, position) {
  const p = HTICK[position](width);

  return (
    <g key={x}>
      <line className="ruler-tick" x1={x} x2={x} y1={0} y2={width} />
      <text className="ruler-tick" x={x + 2} y={p.y} baselineShift={p.shift}>
        {value}
      </text>
    </g>
  );
}

function vtick(y, value, width, position) {
  const p = VTICK[position](y, width);

  return (
    <g key={y}>
      <line className="ruler-tick" x1={0} x2={width} y1={y} y2={y} />
      <text
        className="ruler-tick"
        x={2}
        y={p.y}
        transform={`rotate(90, ${0}, ${y})`}
        baselineShift={p.shift}>
        {value}
      </text>
    </g>
  );
}

const GRID = {
  top: (x, y, length, width) => ({
    svg: {
      x,
      y,
      width: length,
      height: width
    },
    tick: htick
  }),

  bottom: (x, y, length, width) => ({
    svg: {
      x,
      y: y - width,
      width: length,
      height: width
    },
    tick: htick
  }),

  left: (x, y, length, width) => ({
    svg: {
      x,
      y,
      width,
      height: length
    },
    tick: vtick
  }),

  right: (x, y, length, width) => ({
    svg: {
      x: x - width,
      y,
      width,
      height: length
    },
    tick: vtick
  })
};

/* eslint-disable react/prefer-stateless-function */
export default class Ruler extends React.Component {
  render() {
    const {
      x, y, length, width, step, position
    } = this.props;

    const p = GRID[position](x, y, length, width);

    return (
      <svg {...p.svg}>
        <rect className="ruler-background" width="100%" height="100%" />
        {gridRowPoints(step, length)
          // FIXME: include offset somehow in value
          .map((g) => p.tick(g.view.left, g.view.left - length / 2, width, position))}
      </svg>
    );
  }
}

Ruler.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  length: PropTypes.number,
  step: PropTypes.number,
  position: PropTypes.string
};
