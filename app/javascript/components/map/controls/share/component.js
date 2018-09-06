import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Modal from 'components/modal';
import ShareUrl from 'components/map/controls/share/share-url';

import './styles.scss';

class ShareControlComponent extends React.Component {
  static propTypes = {}

  state = { shareModal: false }

  render() {
    return (
      <button
        onClick={() => this.setState({ shareModal: true })}
      >
        <svg className="icon icon-share"><use xlinkHref="#icon-share" /></svg>

        <Modal
          open={this.state.shareModal}
          onClose={() => {
            this.setState({ shareModal: false });
          }}
        >
          <ShareUrl />
        </Modal>
      </button>
    );
  }
}

export default ShareControlComponent;
