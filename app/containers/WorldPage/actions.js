import { ENABLE_SELECTION, CLEAR_SELECTION, SELECT_CELL, CREATE_ROOM } from './constants';

export function toggleSelection(enabled) {
  return {
    type: ENABLE_SELECTION,
    enabled
  };
}

export function clearSelection() {
  return {
    type: CLEAR_SELECTION
  };
}

export function selectCell(row, col) {
  return {
    type: SELECT_CELL,
    row,
    col
  };
}

export function createRoom(cells, name = 'Unknown', color = '#ff0000') {
  return {
    type: CREATE_ROOM,
    cells,
    name,
    color
  };
}
