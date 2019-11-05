import update from 'immutability-helper';
import { ENABLE_SELECTION, SELECT_CELL, CREATE_ROOM } from './constants';

const initialState = {
  selection: {
    enabled: false,
    cells: []
  },
  rooms: []
};

function overviewReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case ENABLE_SELECTION:
      return update(state, {
        selection: {
          enabled: { $set: action.enabled }
        }
      });
    case SELECT_CELL:
      return update(state, {
        selection: {
          cells: { $push: [action.cell] }
        }
      });
    case CREATE_ROOM:
      return update(state, {
        rooms: { $push: [action.room] }
      });
    default:
      return state;
  }
}

export default overviewReducer;
