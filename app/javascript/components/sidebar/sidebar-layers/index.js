import { connect } from 'react-redux';
import { setOpenSidebar, setSelected, setMenuItem } from 'components/fsp-maps/actions';

import SidebarLayersComponent from './component';

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    layersSettings: state.fspMaps.layers.layersSettings,
    selectedLayers: state.fspMaps.layers.selectedLayers
  }),
  { setOpenSidebar, setSelected, setMenuItem }
)(SidebarLayersComponent);
