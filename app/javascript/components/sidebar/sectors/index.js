import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// selectors
import { getActiveLayers } from 'components/map/selectors';
import { getSectors, getLayersBySector } from './selectors';

import SectorsComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    sectors: getSectors(state),
    layersBySector: getLayersBySector(state),
    selectedSector: state.fspMaps.layers.selectedSector,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    layersSettings: state.fspMaps.layers.layersSettings,
    activeLayers: getActiveLayers(state)
  }),
  actions
)(SectorsComponent);
