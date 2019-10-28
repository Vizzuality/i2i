import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';
//import NoData from 'components/widget/no-data';

import config from './config';

const NumberOfServices = ({ chart, chartData, noData = null, ...props}) => {
  console.log(props, 'number of services')

console.log('number of services')
  const data = config.parse(chartData);
  debugger;
  // if (noData) {
  //   return null
  //   //  <NoData />


  // }
  return (
    <Fragment>
      {/* <div className="c-widget-template">
        <h1>{title}</h1>
      </div>



      {/* Chart */}
      {/* {console.log(chart, data, 'chart')} */}
      {!!chart.length && (
        <Chart
          data={chart}
          config={config}
        />
      )}
    </Fragment>
  );
};


// NumberOfServices.propTypes = {
//   title: PropTypes.string.isRequired,
//   chart: PropTypes.array.isRequired,
//   config: PropTypes.shape({}).isRequired,
//   noData: PropTypes.bool.isRequired
// };

export default NumberOfServices;
