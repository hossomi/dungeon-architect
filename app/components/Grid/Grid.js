import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { getViewCells } from 'utils/geometry';

function isCell(cell) {
  return (c) => c.row === cell.row && c.col === cell.col;
}

export default class Grid extends React.Component {
  isCellSelected = (cell) => {
    const { selectedCells } = this.props;
    return selectedCells.some(isCell(cell));
  };

  getCellGroup = (cell) => {
    const { groupedCells } = this.props;
    const filter = isCell(cell);
    return groupedCells.find((group) => group.cells.find(filter));
  };

  getCellClass = (cell) => {
    const cn = this.getCellGroup(cell) ? 'grid-group' : 'grid-cell';
    return this.isCellSelected(cell) ? `${cn} grid-selected` : cn;
  };

  renderCell = (cell, fill) => {
    const {
      onCellMouseDown,
      onCellMouseUp,
      onCellMouseOver
    } = this.props;

    const group = this.getCellGroup(cell);
    const event = { cell, group };

    return (
      <rect
        className={this.getCellClass(cell)}
        key={`${cell.row},${cell.col}`}
        x={cell.view.x}
        y={cell.view.y}
        width={cell.view.width}
        height={cell.view.height}
        fill={fill || ''}
        onMouseDown={() => onCellMouseDown(event)}
        onMouseUp={() => onCellMouseUp(event)}
        onMouseEnter={() => onCellMouseOver(event)} />
    );
  };

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg x={x} y={y} width={width} height={height}>
        {getViewCells(cellWidth, cellHeight, width, height)
          .filter((cell) => this.getCellGroup(cell))
          .map((cell) => this.renderCell(cell, this.getCellGroup(cell).color))}
        {getViewCells(cellWidth, cellHeight, width, height)
          .filter((cell) => !this.getCellGroup(cell))
          .map((cell) => this.renderCell(cell))}
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
  cellHeight: PropTypes.number,
  selectedCells: PropTypes.array,
  groupedCells: PropTypes.array,
  onCellMouseDown: PropTypes.func,
  onCellMouseUp: PropTypes.func,
  onCellMouseOver: PropTypes.func
};

Grid.defaultProps = {
  selectedCells: [],
  groupedCells: [],
  onCellMouseDown: () => { },
  onCellMouseUp: () => { },
  onCellMouseOver: () => { }
};
