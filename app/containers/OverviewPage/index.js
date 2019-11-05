import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { enableSelection, selectCell, createRoom } from './actions';
import reducer from './reducer';
import OverviewPage from './OverviewPage';

const mapDispatchToProps = (dispatch) => ({
  onEnableSelection: (enable) => dispatch(enableSelection(enable)),
  onSelectCell: (cell) => dispatch(selectCell(cell)),
  onCreateRoom: (room) => dispatch(createRoom(room))
});

const mapStateToProps = (state) => state.overview;

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'overview', reducer });

export default compose(withReducer, withConnect)(OverviewPage);
