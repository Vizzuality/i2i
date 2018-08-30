import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getJurisdictionsSelectOptions } from './selectors';

import JurisdictionComponent from './component';

export default connect(
  state => ({
    options: getJurisdictionsSelectOptions(state),
    selectedOption: state.fspMaps.analysis.jurisdiction.selectedJurisdiction,
    area: state.fspMaps.analysis.jurisdiction.area,
    analysisActive: state.fspMaps.analysis.active,
    selectedLayers: state.fspMaps.layers.selectedLayers
  }),
  actions
)(JurisdictionComponent);
