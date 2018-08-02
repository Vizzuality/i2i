import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// Components
import SidebarComponent from './component';

// Selectors
import { getActiveLayers } from './selectors';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    ...state.fspMaps.common,
    activeLayers: getActiveLayers(state)
  }),
  actions
)(SidebarComponent);
