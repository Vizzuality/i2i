import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

import SectorsComponent from './component';

// Actions
import { setlayersSettings } from 'components/map/legend/actions';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    list: state.sectorLayers.list,
    sectorTitles: state.sectorLayers.sectorTitles,
    selectedSector: state.sectorLayers.selectedSector,
    selectedLayers: state.sectorLayers.selectedLayers,
    layersSettings: state.legend.layersSetting
  }),
  { ...actions, setlayersSettings }
)(SectorsComponent);
