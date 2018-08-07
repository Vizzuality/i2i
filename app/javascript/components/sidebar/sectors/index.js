import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// selectors
import { getSectors, getLayersBySector } from './selectors';

import SectorsComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    sectors: getSectors(state),
    layersBySector: getLayersBySector(state),
    selectedSector: state.fspMaps.sectorLayers.selectedSector,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    layersSettings: state.fspMaps.legend.layersSetting
  }),
  actions
)(SectorsComponent);
