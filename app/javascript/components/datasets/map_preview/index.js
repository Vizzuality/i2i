import { connect } from 'react-redux';
import * as actions from 'components/datasets/actions';
import * as reducers from 'components/datasets/reducers';
import initialState from 'components/datasets/initial-state';

// Components
import MapComponent from './component';

// Selectors
import { getActiveLayers } from './selectors';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.datasets.sidebar,
    ...state.datasets.common,
    ...state.datasets.map,
    nearby: state.datasets.analysis.nearby,
    areaOfInterest: state.datasets.analysis.areaOfInterest,
    jurisdiction: state.datasets.analysis.jurisdiction,
    activeLayers: getActiveLayers(state),
    currentLayer: state.datasets.currentLayer,
  }),
  actions
)(MapComponent);
