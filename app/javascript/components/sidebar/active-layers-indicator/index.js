import { connect } from 'react-redux';

// component
import ActiveLayersIndicator from './component';

export default connect(
  state => ({ activeLayers: state.fspMaps.layers.selectedLayers })
)(ActiveLayersIndicator);
