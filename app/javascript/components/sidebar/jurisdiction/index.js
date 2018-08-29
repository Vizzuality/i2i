import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getWidgets } from 'components/sidebar/sidebar-analysis/selectors';
import { getJurisdictionsSelectOptions } from './selectors';

import JurisdictionComponent from './component';

export default connect(
  state => ({
    options: getJurisdictionsSelectOptions(state),
    selectedOption: state.fspMaps.analysis.jurisdiction.selectedJurisdiction,
    widgets: (getWidgets(state))
  }),
  actions
)(JurisdictionComponent);
