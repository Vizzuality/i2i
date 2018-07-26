import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

import ContextualLayersComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.contextualLayers.list,
    selectedLayers: state.contextualLayers.selectedLayers
  }),
  actions
)(ContextualLayersComponent);
