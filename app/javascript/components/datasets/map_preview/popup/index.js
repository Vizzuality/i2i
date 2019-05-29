import { connect } from 'react-redux';
import * as actions from 'components/datasets/actions';
import * as reducers from 'components/datasets/reducers';
import initialState from 'components/datasets/initial-state';

// Selectors
import { getInteraction } from './selectors';

// Components
import PopupComponent from 'components/map/popup/component';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({ interaction: getInteraction(state) }),
  actions
)(PopupComponent);
