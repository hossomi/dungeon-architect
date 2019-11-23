import update from 'immutability-helper';
import { ENABLE_SELECTION, CLEAR_SELECTION, SELECT_CELL, CREATE_ROOM } from './constants';

export const initialState = {
  selection: {
    enabled: false,
    cells: []
  },
  rooms: []
};

export default (state = initialState, action) => {
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
      return update(state, {
        rooms: {
          $push: [{
            id: state.rooms.length,
            cells: action.cells,
            name: action.name,
            color: action.color
          }]
        }
      });
    default:
      return state;
  }
};
