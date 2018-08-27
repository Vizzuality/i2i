import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// Components
import LegendItemButtonVisualizations from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  null,
  actions
)(LegendItemButtonVisualizations);
