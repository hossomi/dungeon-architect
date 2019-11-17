import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import Cell from 'models/Cell';
import CellGroup from 'models/CellGroup';
import { getViewCells } from 'utils/geometry';

export default class Grid extends React.Component {
  isCellSelected = (row, col) => {
    const { selectedCells } = this.props;
    return selectedCells.some((cell) => cell.is(row, col));
  };

  getCellGroup = (row, col) => {
    const { cellGroups } = this.props;
    return cellGroups.find((group) => group.contains(row, col));
  };

  getCellClass = (row, col) => {
    const cn = this.getCellGroup(row, col) ? 'grid-group' : 'grid-cell';
    return this.isCellSelected(row, col) ? `${cn} grid-selected` : cn;
  };

  renderCell = (cell, fill) => {
    const {
      onCellMouseDown, onCellMouseUp, onCellMouseHover
    } = this.props;

    const group = this.getCellGroup(cell.row, cell.col);
    const event = { cell, group };

    return (
      <rect
        className={this.getCellClass(cell.row, cell.col)}
        key={`${cell.row},${cell.col}`}
        x={cell.view.x}
        y={cell.view.y}
        width={cell.view.width}
        height={cell.view.height}
        fill={fill || ''}
        onMouseDown={() => onCellMouseDown(event)}
        onMouseUp={() => onCellMouseUp(event)}
        onMouseEnter={() => onCellMouseHover(event)} />
    );
  };

  render() {
    const {
      x, y, width, height, cellWidth, cellHeight
    } = this.props;

    return (
      <svg x={x} y={y} width={width} height={height}>
        {getViewCells(cellWidth, cellHeight, width, height)
          .filter((cell) => this.getCellGroup(cell.row, cell.col))
          .map((cell) => this.renderCell(cell, this.getCellGroup(cell.row, cell.col).color))}
        {getViewCells(cellWidth, cellHeight, width, height)
          .filter((cell) => !this.getCellGroup(cell.row, cell.col))
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
  cellGroups: PropTypes.array,
  onCellMouseDown: PropTypes.func,
  onCellMouseUp: PropTypes.func,
  onCellMouseHover: PropTypes.func
};

Grid.defaultProps = {
  selectedCells: [],
  cellGroups: [
    new CellGroup([new Cell(1, 1), new Cell(1, 2)], '#ff00ff'),
    new CellGroup([new Cell(2, 2), new Cell(3, 2)], '#ffff00')],
  onCellMouseDown: () => { },
  onCellMouseUp: () => { },
  onCellMouseHover: () => { }
};
