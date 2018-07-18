import { connect } from 'react-redux';

import ListComponent from './component';

export default connect(
  state => ({ ...state.list }),
  {}
)(ListComponent);
