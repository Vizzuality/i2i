import { connect } from 'react-redux';
import { setOpenSidebar, setSelected, setMenuItem, fetchLayers } from 'components/fsp-maps/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    layersSettings: state.fspMaps.legend.layersSettings
  }),
  { setOpenSidebar, setSelected, setMenuItem, fetchLayers }
)(SidebarLayersComponent);
