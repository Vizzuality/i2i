import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import camelCase from 'lodash/camelCase';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const NumberOfServices = ({ widgetData, id }) => {
  if (!widgetData) return null;

  const { chartConfig, chartData, numberOfServices } = config.parse(widgetData);

  return (
    <Fragment>
      <div className="c-number-of-services">
        <p>Number of services: {numberOfServices}</p>
        <Chart
          data={[chartData]}
          config={chartConfig}
        />

        <div id="widget-legend-nos" />
      </div>
    </Fragment>
  );
};

NumberOfServices.propTypes = {
  widgetData: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};

export default NumberOfServices;
