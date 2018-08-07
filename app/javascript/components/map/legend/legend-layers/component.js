import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Tooltip } from 'wri-api-components';

// components
import LegendLayersTooltip from './legend-layers-tooltip';

// styles
import './styles.scss';

class LegendLayersComponent extends React.Component {
  static propTypes = {
    // activeLayers: PropTypes.array.isRequired
  }

  render() {
    const { layerId, layersSettings } = this.props;

    const layerVisualizations = [
      { label: 'Normal', value: 'normal' },
      { label: 'Heatmap', value: 'heatmap' },
      { label: 'Voronoid', value: 'voronoid' }
    ];

    return (
      <div className="c-legend-layers">
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
              <LegendLayersTooltip
                title="Visualizations"
                layerId={layerId}
                list={layerVisualizations}
                onChangeLayer={this.props.onClick}
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
            <button>
              <Icon name="icon-layers" className="-small" />
            </button>
          </Tooltip>
        </Tooltip>
      </div>
    );
  }
}

export default LegendLayersComponent;
