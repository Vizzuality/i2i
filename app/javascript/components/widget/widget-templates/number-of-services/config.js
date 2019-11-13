import camelCase from 'lodash/camelCase';
import WidgetLegend from 'components/widget/legend';

const getData = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [camelCase(d.label)]: d.value,
    name: d.unit
  };
}, {});


const getBars = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [camelCase(d.label)]: {
      stackId: 1,
      fill: d.color,
      stroke: d.color,
      isAnimationActive: false
    }
  };
}, {});

const getBarLength = data => data.map(
  d => d.value
).reduce((previous, current) => current + previous);

export const CONFIG = {
  parse: (data) => {
    const chartData = getData(data);

    return {
      chartData,
      chartConfig: {
        height: 360,
        cartesianGrid: {
          vertical: true,
          horizontal: false,
          strokeDasharray: '5 20'
        },
        layout: 'horizontal',
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
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          }

        },
        yAxis: {
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          },
          interval: 2
        }
        // legend: {
        //   position: 'relative',
        //   verticalAlign: 'top',
        //   layout: 'horizontal',
        //   height: 80,
        //   top: 0,
        //   content: (properties) => {
        //     const { payload } = properties;
        //     const groups = groupBy(payload, p => p.payload);
        //     return <WidgetLegend type="height" groups={groups} />;
        //   }
        // }
      }
    };
  }
};

export default CONFIG;

