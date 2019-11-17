import _ from 'lodash';
import Cell from 'models/Cell';

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

function getViewCells1D(cell, view, offset = 0) {
  const range = getViewCellsRange(cell, view, offset);
  return _.range(range.min, range.max + 1, 1)
    .map((col) => new Cell(col)
      .inView(cell, view, offset));
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

export function getViewCells(...args) {
  return args.length <= 3
    ? getViewCells1D(...args)
    : getViewCells2D(...args);
}
