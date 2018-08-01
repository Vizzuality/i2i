import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

import ContextualLayersComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.fspMaps.contextualLayers.list,
    selectedLayers: state.fspMaps.contextualLayers.selectedLayers,
    layersSettings: state.fspMaps.legend.layersSetting
  }),
  actions
)(ContextualLayersComponent);
