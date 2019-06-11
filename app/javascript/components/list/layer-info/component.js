import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class LayerInfo extends PureComponent {
  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string
  };

  static defaultProps = {
    url: null,
    text: null
  };

  render() {
    const { url, text } = this.props;

    return (
      <div className="c-layer-info">
        <div className="info-text">{text}</div>
        <div className="info-url">
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      </div>
    );
  }
}

export default LayerInfo;
