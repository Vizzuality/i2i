import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// Components
import MapComponent from './component';

// Selectors
import { getActiveLayers } from './selectors';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.fspMaps.sidebar,
    ...state.fspMaps.common,
    ...state.fspMaps.map,
    nearby: state.fspMaps.analysis.nearby,
    areaOfInterest: state.fspMaps.analysis.areaOfInterest,
    activeLayers: getActiveLayers(state)
  }),
  actions
)(MapComponent);
