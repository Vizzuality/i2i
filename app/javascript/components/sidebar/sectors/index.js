import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// Actions
import { setlayersSettings } from 'components/fsp-maps/actions';

import SectorsComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.sectorLayers.list,
    selectedSector: state.sectorLayers.selectedSector,
    selectedLayers: state.sectorLayers.selectedLayers,
    layersSettings: state.fspMaps.legend.layersSetting
  }),
  { ...actions, setlayersSettings }
)(SectorsComponent);
