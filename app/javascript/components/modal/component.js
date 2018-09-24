import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';

// styles
import './styles.scss';

export class CustomModal extends PureComponent {
  static propTypes = {
    // http://reactcommunity.org/react-modal/accessibility/#app-element
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = { className: null };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    const {
      className,
      open,
      onClose,
      children,
      ...modalProps
    } = this.props;

    const classNames = classnames({
      'c-modal': true,
      [className]: !!className
    });

    return (
      <Modal
        {...modalProps}
        bodyOpenClassName="-no-scroll"
        className={classNames}
        isOpen={open}
        onRequestClose={e => e.stopPropagation() || onClose()}
      >
        <div className="modal-container">
          <header className="modal-header">
            <button onClick={e => e.stopPropagation() || onClose()}>
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
