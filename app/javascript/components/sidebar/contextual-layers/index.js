import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// Actions
import { setlayersSettings } from 'components/fsp-maps/actions';

import ContextualLayersComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.contextualLayers.list,
    selectedLayers: state.contextualLayers.selectedLayers,
    layersSettings: state.fspMaps.legend.layersSetting
  }),
  { ...actions, setlayersSettings }
)(ContextualLayersComponent);
