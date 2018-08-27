import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Styles
import './styles.scss';

class LegendItemButtonVisualizationsTooltip extends React.Component {
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
      <div className="c-legend-item-button-visualizations-tooltip">
        {title}

        <div className="visualization-list">
          {list.map((l) => {
            const current = (layersSettings[layerId] && typeof layersSettings[layerId].visualizationType !== 'undefined') ? layersSettings[layerId].visualizationType : 'normal';

            return (
              <div
                role="button"
                tabIndex="-1"
                key={l.value}
                className={classnames({
                  'visualization-list-item': true,
                  '-active': l.value === current
                })}
                onClick={() => this.props.onChangeLayer(layerId, l.value)}
              >
                {l.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LegendItemButtonVisualizationsTooltip;
