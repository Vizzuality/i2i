import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const MinimunDistance = ({ widgetData, title }) => {
  if (!widgetData) return null;
  const legendId = title.replace(/ +/g, '');
  const data = config.parse(widgetData, legendId);
  const { chartConfig, chartData } = data;

  return (
    <Fragment>
      <div className="c-widget-template">
        <Chart
          data={chartData}
          config={chartConfig}
        />

        <div id={`widget-legend-${legendId}`} />
      </div>
    </Fragment>
  );
};

MinimunDistance.propTypes = {
  widgetData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default MinimunDistance;
