import React from 'react';
import WidgetLegend from 'components/widget/legend';

const sortData = data => data.sort((a, b) => a.value - b.value).reverse();

const getData = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [d.label]: d.value,
    name: d.unit
  };
}, {});


const getBars = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [d.label]: {
      stackId: 1,
      fill: d.color,
      stroke: d.color,
      isAnimationActive: false
    }
  };
}, {});

const getServices = data => data.map(
  d => d.value
).reduce((previous, current) => current + previous);

export const CONFIG = {
  parse: (data) => {
    const dataSorted = sortData(data);
    const chartData = getData(dataSorted);
    const services = getServices(dataSorted);

    return {
      numberOfServices: services,
      chartData,
      chartConfig: {
        height: 200,
        cartesianGrid: {
          vertical: true,
          horizontal: false,
          strokeDasharray: '5 20'
        },
        layout: 'vertical',
        margin: { top: 0, right: 0, left: 0, bottom: 0 },
        xKey: 'name',
        yKeys: { bars: getBars(data) },
        referenceLines: [{
          y: 0,
          stroke: 'red',
          strokeDasharray: 'solid',
          fill: 'red',
          opacity: '1',
          label: null
        }],
        xAxis: {
          type: 'number',
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          },
          domain: [0, services]

        },
        yAxis: {
          type: 'category',
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          },
          interval: 2
        },
        legend: {
          position: 'relative',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          height: 80,
          top: 0,
          content: (properties) => {
            const { payload } = properties;
            return <WidgetLegend data={payload} />;
          }
        }
      }
    };
  }
};

export default CONFIG;

