import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import SidebarAnalysisComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    ...state.fspMaps.analysis
  }),
  actions
)(SidebarAnalysisComponent);
