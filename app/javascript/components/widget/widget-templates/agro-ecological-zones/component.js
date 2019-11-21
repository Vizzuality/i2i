import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';

const AgroEcological = ({ widgetData }) => {
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
      <div id="widget-legend-ae" />
    </Fragment>
  );
};

AgroEcological.propTypes = { widgetData: PropTypes.array.isRequired };

export default AgroEcological;
