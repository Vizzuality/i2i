import React from 'react';
import { createPortal } from 'react-dom';
import Legend from 'components/widget/legend';

const sortData = data => data.sort((a, b) => a.value - b.value).reverse();

const getData = data => data.map(d => ({
  label: d.label,
  value: d.value,
  color: d.color
}));

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
        layout: 'vertical',
        margin: { top: 0, right: 0, left: 0, bottom: 0 },
        xKey: 'name',
        yKeys: { bars: { value: { itemColor: true } } },
        referenceLines: [{
          y: 0,
          strokeDasharray: 'solid',
          opacity: '1',
          label: null
        }],
        xAxis: {
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
          height: 0,
          top: 0,
          content: () => {
            return createPortal(<Legend data={chartData} />, document.querySelector('#widget-legend-md'));
          }
        }
      }
    };
  }
};

export default CONFIG;

