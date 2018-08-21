import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class ActiveLayersIndicator extends PureComponent {
  static propTypes = { activeLayers: PropTypes.array.isRequired }

  render() {
    const { activeLayers } = this.props;
    const totalActiveLayers = activeLayers.length;

    if (!totalActiveLayers) return null;

    return (
      <div className="c-active-layers-indicator">
        Active layers
        <span className="active-layers-number">{totalActiveLayers}</span>
      </div>
    );
  }
}

export default ActiveLayersIndicator;
