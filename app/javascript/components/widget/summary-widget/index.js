import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import SummaryWidgetComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.common,
    ...state.fspMaps.introAnalysis,
    ...state.fspMaps.sidebar
  }),
  actions
)(SummaryWidgetComponent);
