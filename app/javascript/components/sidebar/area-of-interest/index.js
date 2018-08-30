import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import AreaOfInterestComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    analysisActive: state.fspMaps.analysis.active,
    selectedLayers: state.fspMaps.layers.selectedLayers
  }),
  actions
)(AreaOfInterestComponent);
