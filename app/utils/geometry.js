import _ from 'lodash';
import Cell from 'models/Cell';

function gridSteps(grid, view, offset) {
  const middle = view / 2 + offset;
  return _.range(middle - Math.ceil(middle / grid) * grid, view, grid);
}

function gridDistance(x, grid, view, offset) {
  const middle = view / 2 + offset;
  const distance = (x - middle) / grid + 0.5;
  return Math.sign(distance) * Math.ceil(Math.abs(distance));
}

export function gridRowPoints(grid, view, offset = 0) {
  return gridSteps(grid, view, offset)
    .map((left) => ({
      view: {
        left,
        right: left + grid,
        get center() {
          return (this.left + this.right) / 2;
        },
        get width() {
          return this.right - this.left;
        }
      },
      grid: { row: gridDistance(left, grid, view, offset) }
    }));
}

export function gridPoints(
  gridWidth,
  gridHeight,
  viewWidth,
  viewHeight,
  viewOffsetX = 0,
  viewOffsetY = 0
) {
  return gridSteps(gridHeight, viewHeight, viewOffsetY)
    .flatMap((y) => gridSteps(gridWidth, viewWidth, viewOffsetX)
      .map((x) => ({
        view: {
          left: x,
          right: x + gridWidth,
          top: y,
          bottom: y + gridHeight,
          get middle() {
            return (this.top + this.bottom) / 2;
          },
          get center() {
            return (this.left + this.right) / 2;
          },
          get width() {
            return this.right - this.left;
          },
          get height() {
            return this.bottom - this.top;
          }
        },
        grid: {
          col: gridDistance(x, gridWidth, viewWidth, viewOffsetX),
          row: gridDistance(y, gridHeight, viewHeight, viewOffsetY)
        }
      })));
}

export function getViewCellsProps(
  cellWidth, cellHeight,
  viewWidth, viewHeight,
  offsetX = 0, offsetY = 0
) {
  return {
    cols: Math.ceil(viewWidth / cellWidth) + 1,
    rows: Math.ceil(viewHeight / cellHeight) + 1,
    minCol: Math.ceil((-viewWidth / 2 + offsetX) / cellWidth),
    minRow: Math.ceil((-viewHeight / 2 + offsetY) / cellHeight)
  };
}

function getViewCellsFit(cell, view, offset) {
  const viewRatio = Math.ceil(view / cell);
  const offsetRatio = Math.floor(offset / (cell / 2));
  return viewRatio + ((viewRatio + offsetRatio + 1) % 2);
}

function getViewCellsMin(cell, view, offset) {
  const viewRatio = Math.max(view, cell) / cell;
  const offsetRatio = offset / cell;
  const min = Math.ceil(viewRatio / 2 - offsetRatio - 0.5);
  return min === 0 ? 0 : -min;
}

function roundZero(x) {
  return x === 0 ? 0 : x;
}

function getViewCellsRangeSingle(cell, view, offset) {
  // -CEILING(($A2/2 - $A$38/2 - G2)/$A$38)
  // CEILING(($A2/2 - $A$38/2 + G2)/$A$38) - J2 + 1
  const viewRatio = Math.max(1, view) / cell;
  const offsetRatio = offset / cell;
  const min = roundZero(-Math.ceil(viewRatio / 2 - offsetRatio - 0.5));
  const max = Math.ceil(viewRatio / 2 + offsetRatio - 0.5);
  return { min, max, count: max - min + 1 };
}

export function getViewCellsRange(
  cellWidth, cellHeight,
  viewWidth, viewHeight,
  offsetX = 0, offsetY = 0
) {
  return {
    cols: getViewCellsRangeSingle(cellWidth, viewWidth, offsetX),
    rows: getViewCellsRangeSingle(cellHeight, viewHeight, offsetY)
  };
}

export function getViewCells(
  cellWidth, cellHeight,
  viewWidth, viewHeight,
  offsetX = 0, offsetY = 0
) {
  const cols = getViewCellsFit(cellWidth, viewWidth, offsetX);
  const rows = getViewCellsFit(cellHeight, viewHeight, offsetY);
  const minCol = getViewCellsMin(cellWidth, viewWidth, offsetX);
  const minRow = getViewCellsMin(cellHeight, viewHeight, offsetY);
  return _.range(minRow, minRow + rows, 1)
    .flatMap((row) => _.range(minCol, minCol + cols, 1)
      .map((col) => new Cell(row, col)
        .inView(cellWidth, cellHeight, viewWidth, viewHeight, offsetX, offsetY)));
}
