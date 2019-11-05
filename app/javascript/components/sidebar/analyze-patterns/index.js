import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import AnalyzePatterns from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    analysisActive: state.fspMaps.analysis.active,
    selectedLayers: state.fspMaps.layers.selectedLayers,
    layersSettings: state.fspMaps.layers.layersSettings
  }),
  actions
)(AnalyzePatterns);
