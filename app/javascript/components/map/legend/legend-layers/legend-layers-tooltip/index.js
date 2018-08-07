import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

// Styles
import styles from './styles.scss';

class LegendLayersTooltip extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    layerId: PropTypes.string.isRequired,
    onChangeLayer: PropTypes.func.isRequired,
    layersSettings: PropTypes.object.isRequired
  };

  render() {
    const { title, list, layerId, layersSettings } = this.props;

    return (
      <div className="c-legend-item-button-layers-tooltip">
        {title}

        <ul className="layers-list">
          {list.map((l) => {
            let isActive = false;

            if (layersSettings.hasOwnProperty(layerId)) {
              isActive = layersSettings[layerId].visualizationType === l.value;
            } else {
              isActive = l.value === 'normal';
            }

            return (
              <li
                key={l.value}
                className={classnames({
                  'layers-list-item': true,
                  '-active': isActive
                })}
                onClick={() => this.props.onChangeLayer(layerId, l.value)}
              >
                {l.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CSSModules(LegendLayersTooltip, styles, { allowMultiple: true });
