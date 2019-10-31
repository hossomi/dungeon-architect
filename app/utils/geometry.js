import _ from 'lodash';

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
