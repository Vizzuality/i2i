import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import NearbyComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis,
    ...state.fspMaps.interactions,
    ...state.fspMaps.common,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    latLng: state.fspMaps.map.latLng
  }),
  actions
)(NearbyComponent);
