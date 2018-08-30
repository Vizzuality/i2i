import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Selectors
import { getJurisdictionsSelectOptions } from './selectors';

import JurisdictionComponent from './component';

export default connect(
  state => ({
    options: getJurisdictionsSelectOptions(state),
    selectedOption: state.fspMaps.analysis.jurisdiction.selectedJurisdiction
  }),
  actions
)(JurisdictionComponent);
