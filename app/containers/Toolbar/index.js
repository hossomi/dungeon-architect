import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectRooms
} from '../WorldPage/selectors';
import reducer from './reducer';
import Toolbar from './Toolbar';

const mapDispatchToProps = () => ({
});

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'toolbar', reducer });

export default compose(withReducer, withConnect)(Toolbar);
