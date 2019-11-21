import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const NumberOfServices = ({ widgetData, id }) => {
  if (!widgetData || !id) return null;

  const { chartConfig, chartData, numberOfServices } = config.parse(widgetData, id);

  return (
    <Fragment>
      <div className="c-number-of-services">
        <p>Number of services: {numberOfServices}</p>
        <Chart
          data={[chartData]}
          config={chartConfig}
        />
        <div id={`widget-legend-${id}`} />
      </div>
    </Fragment>
  );
};

NumberOfServices.propTypes = {
  widgetData: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};

export default NumberOfServices;
