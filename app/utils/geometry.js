import _ from 'lodash';

const ROUNDER = {
  overflow: Math.ceil,
  underflow: Math.floor
};

export function centeredSteps(total, step, fill = 'overflow') {
  const halfLength = total / 2;
  const start = halfLength - ROUNDER[fill](halfLength / step) * step;
  return _.range(start, total, step);
}