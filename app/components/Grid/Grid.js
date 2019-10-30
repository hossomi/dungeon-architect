import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { gridPoints } from 'utils/geometry';

export default class Grid extends React.Component {
  makeCell(p) {
    return (
      <rect
        className="grid-cell"
        key={`${p.grid.row},${p.grid.col}`}
        x={p.view.left}
        y={p.view.top}
        width={p.view.right - p.view.left}
        height={p.view.bottom - p.view.top}
        onClick={() => console.log('Clicked!', p.grid.row, p.grid.col)} />
    );
  }

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}>
        {gridPoints(cellWidth, cellHeight, width, height)
          .map(this.makeCell)}
      </svg>
    );
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
