import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.scss';

const LegendButtonInfoTooltip = ({ info }) => (
  <div className="c-legend-item-button-info-tooltip">
    {info}

    <div>
      {info}
    </div>
  </div>
);

LegendButtonInfoTooltip.propTypes = { info: PropTypes.array.isRequired };


export default LegendButtonInfoTooltip;
