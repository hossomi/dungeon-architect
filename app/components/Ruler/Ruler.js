import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { getViewCells } from 'utils/geometry';

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

function htick(cell, width, position) {
  const p = HTICK[position](width);

  return (
    <g key={cell.col}>
      <line
        className="ruler-tick"
        x1={cell.view.x}
        x2={cell.view.x}
        y1={0}
        y2={cell.view.width} />
      <text
        className="ruler-tick"
        x={cell.view.x + 2}
        y={p.y}
        baselineShift={p.shift}>
        {cell.col}
      </text>
    </g>
  );
}

function vtick(cell, width, position) {
  const p = VTICK[position](cell.view.x, width);

  return (
    <g key={cell.col}>
      <line
        className="ruler-tick"
        x1={0}
        x2={cell.view.width}
        y1={cell.view.x}
        y2={cell.view.x} />
      <text
        className="ruler-tick"
        x={2}
        y={p.y}
        transform={`rotate(90, ${0}, ${cell.view.x})`}
        baselineShift={p.shift}>
        {cell.col}
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
        {getViewCells(step, length)
          // FIXME: include offset somehow in value
          .map((cell) => p.tick(cell, width, position))}
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
