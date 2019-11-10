import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';
//import NoData from 'components/widget/no-data';

import config from './config';

const NumberOfServices = ({ widgetData, widget, title, ...props }) => {

  return (
    <Fragment>
      <div className="c-widget-template">

{      console.log(widgetData, widget, title, props)}
        {/* <Chart /> */}
      </div>
    </Fragment>
  );
};



export default NumberOfServices;
