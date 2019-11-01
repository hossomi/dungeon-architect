import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import './style.scss';

import { gridPoints } from 'utils/geometry';

function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r;
  let g;
  let b;
  const h = step / numOfSteps;
  const i = ~~(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
  }
  const c = `#${`00${(~~(r * 255)).toString(16)}`.slice(-2)}${`00${(~~(
    g * 255
  )).toString(16)}`.slice(-2)}${`00${(~~(b * 255)).toString(16)}`.slice(-2)}`;
  return c;
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  is = (row, col) => this.row === row && this.col == col;
}

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        active: false,
        cells: []
      },
      groups: []
    };
  }

  toggleSelection = (active) => {
    this.setState((state) => update(state, {
      selection: {
        active: { $set: active }
      }
    }));
  };

  clearSelection = () => {
    this.setState((state) => update(state, {
      selection: {
        cells: { $set: [] }
      }
    }));
  };

  selectCell = (row, col) => {
    if (!this.isCellSelected(row, col)) {
      this.setState((state) => update(state, {
        selection: {
          cells: { $push: [new Cell(row, col)] }
        }
      }));
    }
  };

  groupCells = (cells) => {
    this.setState((state) => update(state, {
      groups: { $push: [{ cells, color: rainbow(20, state.groups.length) }] }
    }));
  };

  isCellSelected = (row, col) => {
    const { selection } = this.state;
    return selection.cells.some((cell) => cell.is(row, col));
  };

  isCellGrouped = (row, col) => {
    const { groups } = this.state;
    return groups.some((g) => g.cells.some((cell) => cell.is(row, col)));
  };

  getCellGroup = (row, col) => {
    const { groups } = this.state;
    return groups.filter((g) => g.cells.some((cell) => cell.is(row, col)));
  };

  onCellMouseDown = (row, col) => {
    this.selectCell(row, col);
    this.toggleSelection(true);
  };

  onCellMouseUp = () => {
    const { selection } = this.state;
    this.toggleSelection(false);
    this.groupCells(selection.cells);
    this.clearSelection();
  };

  onCellHover = (row, col) => {
    const { selection } = this.state;
    if (selection.active) {
      this.selectCell(row, col);
    }
  };

  cellClassName = (row, col) => {
    const cn = this.isCellGrouped(row, col) ? 'grid-group' : 'grid-cell';
    return this.isCellSelected(row, col) ? `${cn} grid-selected` : cn;
  };

  renderCell = (row, col, x, y, fill) => {
    const { cellWidth, cellHeight } = this.props;
    console.log(fill);
    return (
      <rect
        className={this.cellClassName(row, col)}
        key={`${row},${col}`}
        x={x}
        y={y}
        width={cellWidth}
        height={cellHeight}
        fill={fill || ''}
        onMouseDown={() => this.onCellMouseDown(row, col)}
        onMouseUp={() => this.onCellMouseUp()}
        onMouseEnter={() => this.onCellHover(row, col)} />
    );
  };

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg x={x} y={y} width={width} height={height}>
        {gridPoints(cellWidth, cellHeight, width, height)
          .filter((p) => this.isCellGrouped(p.grid.row, p.grid.col))
          .map((p) => this.renderCell(
            p.grid.row,
            p.grid.col,
            p.view.left,
            p.view.top,
            this.getCellGroup(p.grid.row, p.grid.col)[0].color
          ))}
        {gridPoints(cellWidth, cellHeight, width, height)
          .filter((p) => !this.isCellGrouped(p.grid.row, p.grid.col))
          .map((p) => this.renderCell(p.grid.row, p.grid.col, p.view.left, p.view.top))}
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
