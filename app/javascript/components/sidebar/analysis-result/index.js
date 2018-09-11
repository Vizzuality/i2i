import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import AnalysisResultComponent from './component';

// Selectors
import { getWidgets } from './selectors';

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    ...state.fspMaps.common,
    analysisActive: state.fspMaps.analysis.active,
    widgets: getWidgets(state)
  }),
  actions
)(AnalysisResultComponent);
