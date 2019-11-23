import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWorld = (state) => state.world || initialState;

const makeSelectSelectionEnabled = () => createSelector(
  selectWorld,
  (world) => world.selection.enabled
);

const makeSelectSelectedCells = () => createSelector(
  selectWorld,
  (world) => world.selection.cells
);

const makeSelectRooms = () => createSelector(
  selectWorld,
  (world) => world.rooms
);

export {
  selectWorld,
  makeSelectSelectionEnabled,
  makeSelectSelectedCells,
  makeSelectRooms
};
