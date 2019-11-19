import { createSelector } from 'reselect';

const selectWorld = (state) => state.world;

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
