
import WidgetLegend from 'components/widget/legend';

const getData = data => {

  const array = data.reduce((acc, d) => {
    return {
      ...acc,
      [d.label]: d.value
    }
  }, {})

  console.log(array)
}


const getBars = data => data.reduce((acc, d) => {
  return {
    ...acc,
    [d.value]: {
      stackId: 'bar',
      fill: '#EAF19D',
      stroke: '#EAF19D',
      isAnimationActive: false
    }
  };
}, {});

const getBarLength = data => data.map(
  d => d.value
).reduce((previous, current) => current + previous);


export const CONFIG = {
  parse: (data) => {
    return {
      widgetData: getData(data),
      chartConfig: {
        height: 360,
        cartesianGrid: {
          vertical: false,
          horizontal: true,
          strokeDasharray: '5 20'
        },
        margin: { top: 0, right: 0, left: 0, bottom: 0 },
        xKey: getBarLength(data),
        yKeys: { bars: getBars(data) },
        // referenceLines: [{
        //   y: 0,
        //   stroke: 'black',
        //   strokeDasharray: 'solid',
        //   fill: 'black',
        //   opacity: '1',
        //   label: null
        // }],
        xAxis: {
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          },
          interval: 0
        },
        yAxis: {
          tick: {
            fontSize: 12,
            fill: 'rgba(0,0,0,0.54)'
          },
          domain: [0, 100],
          interval: 0,
          orientation: 'right',
          label: {
            value: '%',
            position: 'top',
            offset: 25
          },
          type: 'number'
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

