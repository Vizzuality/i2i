import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

import SectorsComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.fspMaps.sectorLayers.list,
    selectedSector: state.fspMaps.sectorLayers.selectedSector,
    selectedLayers: state.fspMaps.sectorLayers.selectedLayers,
    layersSettings: state.fspMaps.legend.layersSetting
  }),
  actions
)(SectorsComponent);
