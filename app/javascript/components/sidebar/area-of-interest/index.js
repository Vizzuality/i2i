import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getWidgets } from 'components/sidebar/sidebar-analysis/selectors';

import AreaOfInterestComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    widgets: (getWidgets(state))
  }),
  actions
)(AreaOfInterestComponent);
