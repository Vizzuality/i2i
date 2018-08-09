import { connect } from 'react-redux';
import * as actions from 'components/fsp-maps/actions';
import * as reducers from 'components/fsp-maps/reducers';
import initialState from 'components/fsp-maps/initial-state';

// Selectors
import { getInteraction } from './selectors';

// Components
import PopupComponent from './component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({interaction: getInteraction(state)}),
  actions
)(PopupComponent);
