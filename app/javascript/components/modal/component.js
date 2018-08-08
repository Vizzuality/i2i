import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';

// styles
import './styles.scss';

export class CustomModal extends PureComponent {
  static propTypes = {
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    appElement: PropTypes.string.isRequired,
    modal: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    customClass: PropTypes.string,
    closeModal: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: null,
    customClass: null
  };

  componentDidMount() {
    Modal.setAppElement(this.props.appElement);
  }

  render() {
    const {
      className,
      customClass,
      modal,
      closeModal,
      children,
      appElement,
      ...modalProps
    } = this.props;
    const componentClass = classnames('c-modal', { [className]: !!className });

    return (
      <Modal
        {...modalProps}
        isOpen={modal.open}
        onRequestClose={() => closeModal}
        className={componentClass}
      >
        <div className="modal-container">
          <header className="modal-header">
            <button onClick={closeModal}>
              <svg className="icon modal-close-icon"><use xlinkHref="#icon-cross" /></svg>
            </button>
          </header>
          <div className="modal-content">
            <div className="overflow-container">
              {children}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CustomModal;
