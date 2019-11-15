import React from 'react';
import WidgetLegend from 'components/widget/legend';

const sortData = data => data.sort((a, b) => a.value - b.value).reverse();

const getData = data => data.map(d => ({
  value: d.value * 100,
  label: d.label,
  name: d.label,
  color: d.color
}));


const getBars = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [d.label]: {
      barSize: d.value * 100,
      fill: d.color,
      name: d.label,
      color: d.color,
      isAnimationActive: false
    }
  };
}, {});

export const CONFIG = {
  parse: (data) => {
    const dataSorted = sortData(data);
    const chartData = getData(dataSorted);

    return {
      chartData,
      chartConfig: {
        height: 200,
        cartesianGrid: {
          vertical: true,
          horizontal: false,
          strokeDasharray: '5 20'
        },
        layout: 'horizontal',
        margin: { top: 0, right: 0, left: 0, bottom: 0 },
        xKey: 'name',
        yKeys: { bars: getBars(dataSorted) },
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
          domain: [0, 400]

        },
        yAxis: {
          type: 'category',
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          }
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

