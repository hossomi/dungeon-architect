import { ENABLE_SELECTION, SELECT_CELL, CREATE_ROOM } from './constants';

export function enableSelection(enabled) {
  return {
    type: ENABLE_SELECTION,
    enabled
  };
}

export function selectCell(cell) {
  return {
    type: SELECT_CELL,
    cell
  };
}

export function createRoom(room) {
  return {
    type: CREATE_ROOM,
    room
  };
}
