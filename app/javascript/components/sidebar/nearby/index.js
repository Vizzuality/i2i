import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import NearbyComponent from './component';

export default connect(
  state => ({ ...state.analysis }),
  actions
)(NearbyComponent);
