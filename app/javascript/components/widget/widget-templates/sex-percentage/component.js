import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';

const SexPercentage = ({ widgetData }) => {
  if (!widgetData) return null;
console.log(widgetData)
  const data = config.parse(widgetData);
  const { chartConfig } = data;

  return (
    <Fragment>
      <div className="c-widget-template">

        <Chart
          data={widgetData}
          config={chartConfig}
        />
      </div>
    </Fragment>
  );
};

SexPercentage.propTypes = { widgetData: PropTypes.array.isRequired };

export default SexPercentage;
