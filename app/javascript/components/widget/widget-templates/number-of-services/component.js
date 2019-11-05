import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';
//import NoData from 'components/widget/no-data';

import config from './config';

const NumberOfServices = ({ widgetData, widget, title }) => {

  return (
    <Fragment>
      <div className="c-widget-template">
        <h1>{title}</h1>
      </div>
        <Chart />
    </Fragment>
  );
};



export default NumberOfServices;
