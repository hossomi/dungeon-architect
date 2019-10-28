import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.scss';

function centerCellOffset(size, cell) {
  return size / 2 - Math.floor(size / 2 / cell) * cell;
}

function cells(size, cell) {
  return _.range(centerCellOffset(size, cell), size, cell);
}

function htick(x, value, width, position) {
  let y;
  let shift;

  switch (position) {
    case 'top':
      y = width - 2;
      shift = 'auto';
      break;
    case 'bottom':
      y = 2;
      shift = 'sub';
      break;
  }

  return (
    <g key={x}>
      <line className="ruler-tick" x1={x} x2={x} y1={0} y2={width} />
      <text className="ruler-tick" x={x + 2} y={y} baselineShift={shift}>
        {value}
      </text>
    </g>
  );
}

function vtick(y, value, width, position) {
  let ty;
  let shift;

  switch (position) {
    case 'left':
      ty = y - width + 3;
      shift = 'sub';
      break;
    case 'right':
      ty = y - 2;
      shift = 'auto';
      break;
  }

  return (
    <g key={y}>
      <line className="ruler-tick" x1={0} x2={width} y1={y} y2={y} />
      <text
        className="ruler-tick"
        x={2}
        y={ty}
        transform={`rotate(90, ${0}, ${y})`}
        baselineShift={shift}>
        {value}
      </text>
    </g>
  );
}

export default class Ruler extends React.Component {
  render() {
    const {
      x, y, length, width, step, position
    } = this.props;

    let svgProps;
    let tick;

    switch (position) {
      case 'top':
        svgProps = {
          x,
          y,
          width: length,
          height: width,
          viewBox: `0 0 ${length} ${width}`
        };
        tick = htick;
        break;
      case 'bottom':
        svgProps = {
          x,
          y: y - width,
          width: length,
          height: width,
          viewBox: `0 0 ${length} ${width}`
        };
        tick = htick;
        break;
      case 'left':
        svgProps = {
          x,
          y,
          width,
          height: length,
          viewBox: `0 0 ${width} ${length}`
        };
        tick = vtick;
        break;
      case 'right':
        svgProps = {
          x: x - width,
          y,
          width,
          height: length,
          viewBox: `0 0 ${width} ${length}`
        };
        tick = vtick;
        break;
    }

    return (
      <svg {...svgProps}>
        <rect className="ruler-background" width="100%" height="100%" />
        {cells(length, step)
          .map((i) => tick(i, i - length / 2, width, position))}
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
