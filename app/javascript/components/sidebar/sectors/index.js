import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

import SectorsComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    sectorsData: state.sectors.sectorsData,
    sectorTitles: state.sectors.sectorTitles,
    selectedSector: state.sectors.selectedSector,
    selectedTypes: state.sectors.selectedTypes
  }),
  actions
)(SectorsComponent);
