import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { enableSelection, clearSelection, selectCell, createRoom } from './actions';
import reducer from './reducer';
import OverviewPage from './OverviewPage';

const mapDispatchToProps = (dispatch) => ({
  enableSelection: (enable) => dispatch(enableSelection(enable)),
  clearSelection: () => dispatch(clearSelection()),
  selectCell: (row, col) => dispatch(selectCell(row, col)),
  createRoom: (room) => dispatch(createRoom(room))
});

const mapStateToProps = (state) => ({
  ...state.overview,
  isCellSelected: (row, col) => state.overview.selection.cells
    .find((c) => c.row === row && c.col === col),
  getCellRoom: (row, col) => state.overview.rooms
    .find((r) => r.cells
      .find((c) => c.row === row && c.col === col))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'overview', reducer });

export default compose(withReducer, withConnect)(OverviewPage);
