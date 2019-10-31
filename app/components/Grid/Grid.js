import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import './style.scss';

import { gridPoints } from 'utils/geometry';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        active: false,
        cells: []
      }
    };
  }

  toggleSelection = (active) => {
    this.setState((state) => update(state, {
      selection: {
        active: { $set: active }
      }
    }));
  };

  selectCell = (row, col) => {
    if (!this.isCellSelected(row, col)) {
      this.setState((state) => update(state, {
        selection: {
          cells: { $push: [[row, col]] }
        }
      }));
    }
  };

  isCellSelected = (row, col) => {
    const { selection } = this.state;
    return selection.cells.some((cell) => cell[0] === row && cell[1] === col);
  };

  onCellMouseDown = (row, col) => {
    this.selectCell(row, col);
    this.toggleSelection(true);
  };

  onCellMouseUp = () => {
    this.toggleSelection(false);
  };

  onCellHover = (row, col) => {
    const { selection } = this.state;
    if (selection.active) {
      this.selectCell(row, col);
    }
  };

  makeCell = (p) => (
    <rect
      className={
        this.isCellSelected(p.grid.row, p.grid.col)
          ? 'grid-cell grid-cell-selected'
          : 'grid-cell'
      }
      key={`${p.grid.row},${p.grid.col}`}
      x={p.view.left}
      y={p.view.top}
      width={p.view.width}
      height={p.view.height}
      onMouseDown={() => this.onCellMouseDown(p.grid.row, p.grid.col)}
      onMouseUp={() => this.onCellMouseUp()}
      onMouseEnter={() => this.onCellHover(p.grid.row, p.grid.col)} />
  );

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg x={x} y={y} width={width} height={height}>
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
