import { connect } from 'react-redux';

import ListComponent from './component';

export default connect(
  state => ({ selectedLayers: state.fspMaps.layers.selectedLayers }),
  {}
)(ListComponent);
