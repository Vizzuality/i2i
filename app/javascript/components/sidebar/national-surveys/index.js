import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';

import NationalSurveysComponent from './component';

// Mandatory
export { actions, reducers };

export default connect(
  state => ({ ...state.fspMaps.common }),
  actions
)(NationalSurveysComponent);
