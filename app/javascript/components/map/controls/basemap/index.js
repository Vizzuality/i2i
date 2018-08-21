import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';

// Components
import BasemapControlComponent from './component';

export default connect(
  state => ({ ...state.fspMaps.map }),
  actions
)(BasemapControlComponent);
