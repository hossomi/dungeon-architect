import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import {
  toggleSelection,
  clearSelection,
  selectCell,
  createRoom
} from './actions';
import {
  makeSelectSelectionEnabled,
  makeSelectSelectedCells,
  makeSelectRooms
} from './selectors';
import reducer from './reducer';
import WorldPage from './WorldPage';

const mapDispatchToProps = (dispatch) => ({
  toggleSelection: (enable) => dispatch(toggleSelection(enable)),
  clearSelection: () => dispatch(clearSelection()),
  selectCell: (row, col) => dispatch(selectCell(row, col)),
  createRoom: (room) => dispatch(createRoom(room))
});

const mapStateToProps = createStructuredSelector({
  selectionEnabled: makeSelectSelectionEnabled(),
  selectedCells: makeSelectSelectedCells(),
  rooms: makeSelectRooms()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'world', reducer });

export default compose(withReducer, withConnect)(WorldPage);
