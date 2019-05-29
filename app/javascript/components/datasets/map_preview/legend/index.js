import { connect } from 'react-redux';
import * as actions from 'components/datasets/actions';
import * as reducers from 'components/datasets/reducers';
import initialState from 'components/datasets/initial-state';

// Selectors
import { getActiveLayerGroups } from 'components/datasets/map_preview/selectors';

// Components
import LegendComponent from 'components/map/legend/component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.datasets.legend,
    ...state.datasets.layers,
    activeLayerGroups: getActiveLayerGroups(state),
    selectedLayers: state.datasets.layers.selectedLayers
  }),
  actions
)(LegendComponent);
