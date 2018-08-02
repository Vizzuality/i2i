import { connect } from 'react-redux';
import { setOpen, setSelected, setMenuItem, fetchSectors, fetchContextualLayers, fetchLayers } from 'components/fsp-maps/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({ ...state.fspMaps.sidebar }),
  { setOpen, setSelected, setMenuItem, fetchSectors, fetchContextualLayers, fetchLayers }
)(SidebarLayersComponent);
