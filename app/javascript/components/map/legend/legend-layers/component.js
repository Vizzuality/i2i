import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Tooltip } from 'wri-api-components';

// styles
import './styles.scss';

class LegendLayersComponent extends React.Component {
  static propTypes = {
    // activeLayers: PropTypes.array.isRequired
  }

  render() {
    const { layerId } = this.props;

    // const classNames = classnames({
    //   'c-map': true,
    //   '-open': !!open
    // });

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
          <button
            onClick={() => this.props.onClick(layerId, 'heatmap')}
          >
            <Icon name="icon-layers" className="-small" />
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default LegendLayersComponent;
