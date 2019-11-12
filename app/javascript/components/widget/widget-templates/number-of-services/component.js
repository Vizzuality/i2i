import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import Chart from 'components/recharts';
import config from './config';

const NumberOfServices = ({ widgetData }) => {
  if (!widgetData) return null;
  const { chartConfig, chartData } = config.parse(widgetData);

  return (
    <Fragment>
      <div className="c-widget-template">
        <Chart
          data={[chartData]}
          config={chartConfig}
        />
      </div>
    </Fragment>
  );
};

NumberOfServices.propTypes = { widgetData: propTypes.array.isRequired };

export default NumberOfServices;
