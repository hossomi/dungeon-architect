import _ from 'lodash';

export function centeredSteps(viewSize, gridStep, viewOffset = 0) {
  const half = viewSize / 2 + viewOffset;
  const start = half - Math.ceil(half / gridStep) * gridStep;
  return _.range(start, viewSize, gridStep);
}

export function gridRowPoints(gridStep, viewSize, viewOffset = 0) {
  const middle = viewSize / 2 + viewOffset;
  return _.range(
    middle - Math.ceil(middle / gridStep) * gridStep,
    viewSize,
    gridStep
  )
    .map((start) => {
      const distance = (start - middle) / gridStep + 0.5;
      return {
        view: { start, end: start + gridStep, middle: start + gridStep / 2 },
        grid: { index: Math.sign(distance) * Math.ceil(Math.abs(distance)) }
      };
    });
}

export function gridPoints(
  gridWidth,
  gridHeight,
  viewWidth,
  viewHeight,
  viewOffsetX = 0,
  viewOffsetY = 0
) {
  const middleX = viewWidth / 2 + viewOffsetX;
  const middleY = viewHeight / 2 + viewOffsetY;
  return _.range(
    middleY - Math.ceil(middleY / gridHeight) * gridHeight,
    viewHeight,
    gridHeight
  )
    .flatMap((y) => {
      const distanceY = (y - middleY) / gridHeight + 0.5;
      return _.range(
        middleX - Math.ceil(middleX / gridWidth) * gridWidth,
        viewWidth,
        gridWidth
      )
        .map((x) => {
          const distanceX = (x - middleX) / gridWidth + 0.5;
          return {
            view: {
              left: x,
              right: x + gridWidth,
              top: y,
              bottom: y + gridHeight,
              middle: y + gridHeight / 2,
              center: x + gridWidth / 2
            },
            grid: {
              col: Math.sign(distanceX) * Math.ceil(Math.abs(distanceX)),
              row: Math.sign(distanceY) * Math.ceil(Math.abs(distanceY))
            }
          };
        });
    });
}
