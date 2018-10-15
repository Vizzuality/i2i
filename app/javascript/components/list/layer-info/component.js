import React from 'react';

import './styles.scss';

class LayerInfo extends React.Component {
  render() {
    const { url, text } = this.props;

    return (
      <div className="c-layer-info">
        <div className="info-text">{text}</div>
        <div className="info-url">
          <a href={url} target="_blank">{url}</a>
        </div>
      </div>
    );
  }
}

export default LayerInfo;
