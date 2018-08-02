import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

import SidebarAnalysisComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({ ...state.sidebar }),
  actions
)(SidebarAnalysisComponent);
