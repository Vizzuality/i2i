import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import AnalyzePatterns from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    analysisActive: state.fspMaps.analysis.active,
    time: state.fspMaps.analysis.nearby.time,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    layersSettings: state.fspMaps.layers.layersSettings,
    selectedOption: state.fspMaps.analysis.location.selectedLocation,
    area: state.fspMaps.analysis.location.area,
    pattern: state.fspMaps.analysis.pattern,
    pin: state.fspMaps.analysis.pattern.pin
  }),
  actions
)(AnalyzePatterns);
