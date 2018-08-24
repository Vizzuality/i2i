import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getWidgets } from 'components/sidebar/sidebar-analysis/selectors';

import NearbyComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis,
    ...state.fspMaps.common,
    widgets: (getWidgets(state))
  }),
  actions
)(NearbyComponent);
