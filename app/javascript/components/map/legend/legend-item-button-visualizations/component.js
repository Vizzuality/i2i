import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'wri-api-components/dist/icon';
import Tooltip from 'wri-api-components/dist/tooltip';

// components
import LegendItemButtonVisualizationsTooltip from './legend-item-button-visualizations-tooltip';

// styles
import './styles.scss';

class LegendLayersComponent extends React.Component {
  static propTypes = {
    layerId: PropTypes.string.isRequired,
    layersSettings: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { layerId, layersSettings, onClick } = this.props;

    const layerVisualizations = [
      { label: 'Normal', value: 'normal' },
      { label: 'Heatmap', value: 'heatmap' },
      { label: 'Voronoid', value: 'voronoid' }
    ];

    return (
      <div className="c-legend-item-button-visualizations">
        <Tooltip
          overlay="Visualizations"
          overlayClassName="c-rc-tooltip -default"
          overlayStyle={{ color: '#fff' }}
          placement="top"
          trigger={['hover']}
          mouseLeaveDelay={0}
          destroyTooltipOnHide
        >
          <Tooltip
            overlay={
              <LegendItemButtonVisualizationsTooltip
                title="Visualizations"
                layerId={layerId}
                list={layerVisualizations}
                onChangeLayer={onClick}
                layersSettings={layersSettings}
              />
            }
            overlayClassName="c-rc-tooltip -default"
            overlayStyle={{ color: '#fff' }}
            placement="top"
            trigger={['click']}
            mouseLeaveDelay={0}
            destroyTooltipOnHide
          >
            <button
              type="button"
              className="wri_api__c-legend-button"
            >
              <Icon name="icon-layers" className="-small" style={{ fill: '#717171' }} />
            </button>
          </Tooltip>
        </Tooltip>
      </div>
    );
  }
}

export default LegendLayersComponent;
