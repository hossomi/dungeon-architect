import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectRooms
} from '../WorldPage/selectors';
import reducer from './reducer';
import Sidebar from './Sidebar';

const mapDispatchToProps = () => ({
});

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'Sidebar', reducer });

export default compose(withReducer, withConnect)(Sidebar);
