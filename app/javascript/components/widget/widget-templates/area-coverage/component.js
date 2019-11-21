import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';

const AreaCoverage = ({ widgetData, id }) => {
  if (!widgetData) return null;


  const data = config.parse(widgetData);
  const { chartConfig, chartData } = data;

  return (
    <Fragment>
      <div className="c-widget-template">

        <Chart
          data={chartData}
          config={chartConfig}
        />
      </div>
    </Fragment>
  );
};

AreaCoverage.propTypes = {
  widgetData: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};

export default AreaCoverage;
