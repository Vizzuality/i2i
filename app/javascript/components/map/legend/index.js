import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// Selectors
import { getActiveLayerGroups } from 'components/map/selectors';

// Components
import LegendComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.legend,
    activeLayerGroups: getActiveLayerGroups(state)
  }),
  actions
)(LegendComponent);
