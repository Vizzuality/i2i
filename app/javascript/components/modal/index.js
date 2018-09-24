import { connect } from 'react-redux';

import { closeModal } from 'components/fsp-maps/actions';
import Modal from './component';

export default connect(
  state => ({ modal: state.fspMaps.modal }),
  { closeModal }
)(Modal);
