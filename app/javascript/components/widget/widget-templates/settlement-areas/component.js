import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const SettlementAreas = ({ widgetData }) => {
  if (!widgetData) return null;
  const { chartConfig, chartData } = config.parse(widgetData);
  return (
    <Fragment>
      <div className="c-number-of-services">
        <Chart
          data={[chartData]}
          config={chartConfig}
        />

        <div id="widget-legend-sa" />
      </div>
    </Fragment>
  );
};

SettlementAreas.propTypes = { widgetData: propTypes.array.isRequired };

export default SettlementAreas;
