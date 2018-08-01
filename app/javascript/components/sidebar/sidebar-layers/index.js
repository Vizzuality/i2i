import { connect } from 'react-redux';
import { setOpen, setSelected, setMenuItem, fetchSectors, fetchContextualLayers } from 'components/fsp-maps/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({ ...state.fspMaps.sidebar }),
  { setOpen, setSelected, setMenuItem, fetchSectors, fetchContextualLayers }
)(SidebarLayersComponent);
