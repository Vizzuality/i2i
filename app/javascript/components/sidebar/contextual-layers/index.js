import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

import ContextualLayersComponent from './component';

// Actions
import { setlayersSettings } from 'components/map/legend/actions';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.contextualLayers.list,
    selectedLayers: state.contextualLayers.selectedLayers,
    layersSettings: state.legend.layersSetting
  }),
  { ...actions, setlayersSettings }
)(ContextualLayersComponent);
