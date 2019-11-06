import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getLocationsSelectOptions } from './selectors';

import AnalyzePatterns from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    analysisActive: state.fspMaps.analysis.active,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    layersSettings: state.fspMaps.layers.layersSettings,
    options: getLocationsSelectOptions(state),
    selectedOption: state.fspMaps.analysis.location.selectedLocation,
    area: state.fspMaps.analysis.location.area
  }),
  actions
)(AnalyzePatterns);
