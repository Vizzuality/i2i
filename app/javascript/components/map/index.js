import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// Components
import SidebarComponent from './component';

// Selectors
import { getActiveLayers } from './selectors';


// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.sidebar,
    ...state.common,
    activeLayers: getActiveLayers(state)
  }),
  actions
)(SidebarComponent);
