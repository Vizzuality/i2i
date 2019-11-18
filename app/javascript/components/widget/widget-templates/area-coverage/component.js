import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';

const AreaCoverage = ({ widgetData }) => {
  if (!widgetData) return null;

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

AreaCoverage.propTypes = { widgetData: PropTypes.array.isRequired };

export default AreaCoverage;
