import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import Tooltip from 'wri-api-components/dist/tooltip';

// components
import LegendButtonInfoTooltip from './legend-item-button-info-tooltip';

// styles
import './styles.scss';

const LegendButtonInfo = ({ info }) => (

  <div className="c-legend-item-button-info">
    <Tooltip
      overlay="Layer info"
      overlayClassName="c-rc-tooltip -default"
      overlayStyle={{ color: '#fff' }}
      placement="top"
      trigger={['hover']}
      mouseLeaveDelay={0}
      destroyTooltipOnHide
    >
      <Tooltip
        overlay={
          <LegendButtonInfoTooltip
            title="Info"
            info={info}
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
          className="wri_api__c-legend-button legend-info"
        >
          <Icon name="info" className="-small" />
        </button>
      </Tooltip>
    </Tooltip>
  </div>
);

LegendButtonInfo.propTypes = { info: PropTypes.shape({}).isRequired };

export default LegendButtonInfo;
