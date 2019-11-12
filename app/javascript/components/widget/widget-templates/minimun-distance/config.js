
const getPies = (data) => {
  const {label } = data.label
  return

}

const getBars = (data) => {


};

export const CONFIG = {
  parse: (data) => {
    {

      return {

        chartConfig: {
          height: 360,
          cartesianGrid: {
            vertical: false,
            horizontal: true,
            strokeDasharray: '5 20'
          },
          margin: { top: 20, right: 0, left: 0, bottom: 20 },
          xKey: 'year',
          yKeys: {
            bars:
            {
              '0–50':
              {
                stackId: 'bar',
                fill: '#EAF19D',
                stroke: '#EAF19D',
                isAnimationActive: false
              },
              '50–100':
              {
                stackId: 'bar',
                fill: '#B8E98E',
                stroke: '#B8E98E',
                isAnimationActive: false
              },
              '100–150':
              {
                stackId: 'bar',
                fill: '#1B97C1',
                stroke: '#1B97C1',
                isAnimationActive: false
              },
              '150–200':
              {
                stackId: 'bar',
                fill: '#1C52A3',
                stroke: '#1C52A3',
                isAnimationActive: false
              },
              '200–250':
              {
                stackId: 'bar',
                fill: '#13267F',
                stroke: '#13267F',
                isAnimationActive: false
              }
            }
          },
          referenceLines: [{
            y: 0,
            stroke: 'black',
            strokeDasharray: 'solid',
            fill: 'black',
            opacity: '1',
            label: null
          }],
          xAxis: {
            tick: {
              fontSize: 12,
              fill: 'rgba(0,0,0,0.54)'
            },
            domain: [0, 100],
            interval: 0
          },
          yAxis: {
            tick: {
              fontSize: 12,
              fill: 'rgba(0,0,0,0.54)'
            },
            width: 40,
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
        },
      };
    }
  }
};

export default CONFIG;
