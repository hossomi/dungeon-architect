import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { enableSelection, clearSelection, selectCell, createRoom } from './actions';
import reducer from './reducer';
import WorldPage from './WorldPage';

const mapDispatchToProps = (dispatch) => ({
  enableSelection: (enable) => dispatch(enableSelection(enable)),
  clearSelection: () => dispatch(clearSelection()),
  selectCell: (row, col) => dispatch(selectCell(row, col)),
  createRoom: (room) => dispatch(createRoom(room))
});

const mapStateToProps = (state) => ({
  ...state.world,
  isCellSelected: (row, col) => state.world.selection.cells
    .find((c) => c.row === row && c.col === col),
  getCellRoom: (row, col) => state.world.rooms
    .find((r) => r.cells
      .find((c) => c.row === row && c.col === col))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'world', reducer });

export default compose(withReducer, withConnect)(WorldPage);
