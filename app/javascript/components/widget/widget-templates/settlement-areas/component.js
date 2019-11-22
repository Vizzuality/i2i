import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const SettlementAreas = ({ widgetData, id }) => {
  if (!widgetData) return null;
  const { chartConfig, chartData } = config.parse(widgetData, id);
  return (
    <Fragment>
      <div className="c-number-of-services">
        <Chart
          data={[chartData]}
          config={chartConfig}
        />
        <div id={`widget-legend-${id}`} />
      </div>
    </Fragment>
  );
};

SettlementAreas.propTypes = {
  widgetData: PropTypes.array.isRequired,
  id: PropTypes.array.isRequired
};

export default SettlementAreas;
