import React from 'react';

import Icon from 'wri-api-components/dist/icon';


// styles
import './styles.scss';

const LegendItemInfo = () => (
  <div className="c-legend-item-info">
    <button
      type="button"
      className="wri_api__c-legend-button"
    >
      <Icon name="icon-info" className="-small" />
    </button>
  </div>
);

export default LegendItemInfo;
