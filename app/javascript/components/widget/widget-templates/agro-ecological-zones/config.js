import React from 'react';
import { createPortal } from 'react-dom';
import { format } from 'd3-format';

import Legend from 'components/widget/legend';
import Tooltip from 'components/widget/tooltip';

const sortData = data => data.sort((a, b) => a.value - b.value).reverse();

const getTotal = data => data.map(
  d => d.value
).reduce((previous, current) => current + previous);

const getData = (data, total) => data.map((d, i) => {
  const colors = ['#2F939C', '#B2E600', '#E5007E', '#FFB191', '#00CBE3', '#00CD7A', '#AC005D', '#AC005D', '#CCCDCF'];
  return {
    y: 1,
    x: d.value,
    value: d.value,
    label: d.label,
    name: d.label,
    color: colors[i],
    unit: d.unit,
    coverage: d.value,
    percentage: (d.value / total) * 100
  };
});


export const CONFIG = {
  parse: (data) => {
    const dataSorted = sortData(data);
    const total = getTotal(data);

    return {
      chartData: getData(dataSorted, total),
      chartConfig: {
        type: 'pie',
        layout: 'centric',
        height: 200,
        margin: { top: 20, right: 0, left: 0, bottom: 0 },
        xKey: 'percentage',
        yKeys: {
          pies: {
            y: {
              cx: '50%',
              cy: '50%',
              paddingAngle: 2,
              dataKey: 'percentage',
              nameKey: 'label',
              innerRadius: '60%',
              outerRadius: '80%',
              isAnimationActive: false
            }
          }
        },
        legend: {
          align: 'left',
          verticalAlign: 'middle',
          layout: 'vertical',
          content: (properties) => {
            const { payload } = properties;
            return createPortal(<Legend data={payload} />, document.querySelector('#widget-legend-ae'));
          }
        },
        tooltip: {
          cursor: false,
          content: (
            <Tooltip
              style={{
                flexDirection: 'column',
                marginTop: '10px',
                marginLeft: '-50px'
              }}
              settings={[
                { label: 'Zones:', key: 'label' },
                { label: 'Value:', key: 'value', format: v => format('.2%')(v / 100), color: 'color' }
              ]}
            />
          )
        }
      }
    };
  }
};

export default CONFIG;
