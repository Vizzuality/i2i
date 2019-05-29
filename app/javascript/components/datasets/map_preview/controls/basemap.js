import { connect } from 'react-redux';
import * as actions from 'components/datasets/actions';

// Components
import BasemapControlComponent from 'components/map/controls/basemap/component';

export default connect(
  state => ({ ...state.datasets.map }),
  actions
)(BasemapControlComponent);
