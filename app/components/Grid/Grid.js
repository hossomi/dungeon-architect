import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { centeredSteps } from 'utils/geometry';

export default class Grid extends React.Component {
  makeCell(x, y, width, height) {
    return (
      <rect
        className="grid-cell"
        key={`${x},${y}`}
        x={x}
        y={y}
        width={width}
        height={height}
        onClick={() => console.log('Clicked!', x, y)} />
    );
  }

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    const svg = (
      <svg
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}>
        {centeredSteps(width, cellWidth)
          .map((cx) => centeredSteps(height, cellHeight)
            .map((cy) => this.makeCell(cx, cy, cellWidth, cellHeight)))}
      </svg>
    );

    // svg.addEventListener('mousedown', (x) => console.log('down'));
    return svg;
  }
}

Grid.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number
};
