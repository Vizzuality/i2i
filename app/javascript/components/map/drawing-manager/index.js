import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

import DrawingManagerComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.analysis.areaOfInterest,
    ...state.fspMaps.sidebar
  }),
  actions
)(DrawingManagerComponent);
