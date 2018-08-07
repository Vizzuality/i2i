import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

// Styles
import styles from './styles.scss';

class LegendLayersTooltip extends React.Component {
  static propTypes = {
    // Layers
    // layers: PropTypes.array.isRequired,
    // activeLayer: PropTypes.object.isRequired,
    // Callback to call when the layer changes with
    // the ID of the dataset and the ID of the layer
    // onChangeLayer: PropTypes.func.isRequired
  };

  render() {
    const { title, list, layerId } = this.props;

    return (
      <div className="c-legend-item-button-layers-tooltip">
        {title}

        <ul className="layers-list">
          {list.map(l => (
            <li
              key={l.value}
              className={classnames({
                'layers-list-item': true,
                '-active': false
              })}
              onClick={() => this.props.onChangeLayer(layerId, l.value)}
            >
              {l.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSSModules(LegendLayersTooltip, styles, { allowMultiple: true });
