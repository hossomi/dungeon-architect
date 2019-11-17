import update from 'immutability-helper';
import { ENABLE_SELECTION, CLEAR_SELECTION, SELECT_CELL, CREATE_ROOM } from './constants';

const initialState = {
  selection: {
    enabled: false,
    cells: []
  },
  rooms: []
};

function isCellSelected(state, row, col) {
  return state.selection.cells
    .find((c) => c.row === row && c.col === col);
}

function getCellRoom(state, row, col) {
  return state.rooms
    .find((r) => r.cells
      .find((c) => c.row === row && c.col === col));
}

function overviewReducer(state = initialState, action) {
  switch (action.type) {
    case ENABLE_SELECTION:
      return update(state, {
        selection: {
          enabled: { $set: action.enabled }
        }
      });
    case CLEAR_SELECTION:
      return update(state, {
        selection: {
          cells: { $set: [] }
        }
      });
    case SELECT_CELL:
      if (isCellSelected(state, action.row, action.col)
        || getCellRoom(state, action.row, action.col)) {
        return state;
      }
      return update(state, {
        selection: {
          cells: {
            $push: [{
              row: action.row,
              col: action.col
            }]
          }
        }
      });
    case CREATE_ROOM:
      if (action.cells.length === 0) {
        return state;
      }
      return update(state, {
        rooms: {
          $push: [{
            cells: action.cells,
            name: action.name,
            color: action.color
          }]
        }
      });
    default:
      return state;
  }
}

export default overviewReducer;
