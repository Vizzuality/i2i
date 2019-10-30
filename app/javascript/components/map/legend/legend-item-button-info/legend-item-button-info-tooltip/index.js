import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Styles
import './styles.scss';

const LegendItemButtonInfoTooltip = ({ info }) => {
  console.log(info)
  return (
    <div className="c-legend-item-button-info-tooltip">

    </div>
  );
};


LegendItemButtonInfoTooltip.propTypes = { info: PropTypes.shape({}).isRequired };

export default LegendItemButtonInfoTooltip;
