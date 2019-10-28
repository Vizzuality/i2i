import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';


import './styles.scss';

function Widget({
  key,
  widgetData,
  children,
  ...props
  // location = 'Bangladesh',
  // title,
  // // // filename - download btn

  // widgetsList,
  // analysisType,
  // ...props

}) {
  console.log(props, 'props before function')
console.log(children.props, 'widgetsList before function')
const { title } = children.props;
console.log(widgetData, 'widgetData before function')
  return (
    <div className="c-widgets-template">
      <div className="widget-header">
        <h2>{location}</h2>
        <div className="header-buttons">
          <Icon name="info" />
          <Icon name="share" />
        </div>
      </div>
      <h1 className="widget-title">{title}</h1>
      <div className="widget-content">
      {/* {({ widgetData }) => (
                  <Fragment>
                    {/* Template */}
                    {/* {((loaded && !loading && !isEmpty(data.template) && !!Templates[slug]) || (!loaded && !loading && !!Templates[slug])) &&
                      React.createElement(Templates[slug], {
                        ...data.template,
                        collapsed: c,
                        loading,
                        color
                      })
                    }

                    {/* Chart */}
                    {/* {!loading && !!data.chart.length && !c && (
                      <Chart
                        data={data.chart}
                        config={config}
                      />
                    )} */}

                    {/* No data */}
                    {/* {!loading && loaded && !!config && ((isEmpty(data.template) && !data.chart.length)) && (
                      <div className="widget--template -no-data">
                        No data available
                      </div>
                    )}
                  </Fragment>
           //     )} */}



        {children({ ...props, widgetData })}
      </div>
    </div>
  );
}

Widget.propTypes = {
  location: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node

};

Widget.defaultProps = {
  location: null,
  title: null,
  children: null
};

export default Widget;
