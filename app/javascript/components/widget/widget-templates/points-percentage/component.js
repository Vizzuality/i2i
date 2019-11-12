import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';
//import NoData from 'components/widget/no-data';

import config from './config';

const AccessPointsPercentage = ({ widgetData, widget, title, ...props }) => {


  debugger;
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

export default AccessPointsPercentage;
