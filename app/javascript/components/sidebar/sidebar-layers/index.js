import { connect } from 'react-redux';
import { setOpen, setSelected, setMenuItem } from 'components/sidebar/actions';
import { fetchSectors } from 'components/sidebar/sectors/actions';
import { fetchContextualLayers } from 'components/sidebar/contextual-layers/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({ ...state.sidebar }),
  { setOpen, setSelected, setMenuItem, fetchSectors, fetchContextualLayers }
)(SidebarLayersComponent);
