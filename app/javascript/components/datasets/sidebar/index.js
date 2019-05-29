import { connect } from 'react-redux';
import * as actions from 'components/datasets/actions';
import initialState from 'components/datasets/initial-state';

import SidebarComponent from './component';

// Mandatory
export { actions, initialState };

export default connect(
  state => ({ currentLayer: state.datasets.currentLayer }),
  actions
)(SidebarComponent);
