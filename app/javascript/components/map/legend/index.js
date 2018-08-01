import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// Selectors
import { getActiveLayerGroups } from 'components/map/selectors';

// Components
import LegendComponent from './component';

// Actions
import { setSelectedLayers as setSelectedSectorLayers } from 'components/fsp-maps/actions';
import { setSelectedLayers as setSelectedContextualLayers } from 'components/fsp-maps/actions';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.legend,
    activeLayerGroups: getActiveLayerGroups(state),
    selectedSectorLayers: state.fspMaps.sectorLayers.selectedLayers,
    selectedContextualLayers: state.fspMaps.contextualLayers.selectedLayers
  }),
  { ...actions, setSelectedSectorLayers, setSelectedContextualLayers }
)(LegendComponent);
