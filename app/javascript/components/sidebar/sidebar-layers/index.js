import { connect } from 'react-redux';
import * as actions from 'components/sidebar/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({ ...state.sidebar }),
  actions
)(SidebarLayersComponent);
