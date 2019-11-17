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

function roundZero(x) {
  return x === 0 ? 0 : x;
}

function getViewCellsRange1D(cell, view, offset = 0) {
  const viewRatio = Math.max(1, view) / cell;
  const offsetRatio = offset / cell;
  const min = roundZero(-Math.ceil(viewRatio / 2 - offsetRatio - 0.5));
  const max = roundZero(Math.ceil(viewRatio / 2 + offsetRatio - 0.5));
  return { min, max, count: max - min + 1 };
}

function getViewCellsRange2D(
  cellWidth, cellHeight,
  viewWidth, viewHeight,
  offsetX = 0, offsetY = 0
) {
  return {
    cols: getViewCellsRange1D(cellWidth, viewWidth, offsetX),
    rows: getViewCellsRange1D(cellHeight, viewHeight, offsetY)
  };
}

export function getViewCellsRange(...args) {
  return args.length <= 3
    ? getViewCellsRange1D(...args)
    : getViewCellsRange2D(...args);
}

function getViewCells2D(
  cellWidth, cellHeight,
  viewWidth, viewHeight,
  offsetX = 0, offsetY = 0
) {
  const range = getViewCellsRange(cellWidth, cellHeight, viewWidth, viewHeight, offsetX, offsetY);
  return _.range(range.rows.min, range.rows.max + 1, 1)
    .flatMap((row) => _.range(range.cols.min, range.cols.max + 1, 1)
      .map((col) => new Cell(row, col)
        .inView(cellWidth, cellHeight, viewWidth, viewHeight, offsetX, offsetY)));
}

function getViewCells1D(cell, view, offset = 0) {
  const range = getViewCellsRange(cell, view, offset);
  return _.range(range.min, range.max + 1, 1)
    .map((col) => new Cell(col)
      .inView(cell, view, offset));
}

export function getViewCells(...args) {
  return args.length <= 3
    ? getViewCells1D(...args)
    : getViewCells2D(...args);
}
