import React from 'react';
import groupBy from 'lodash/groupBy';
// import WidgetTooltip from 'components/widget-tooltip';
// import WidgetLegend from 'components/widget-legend';

const widgetData = ({ list }, { scope }) => list.flatMap((d) => {
  const year = new Date(d.date).getFullYear();

  if (!d.con_hotspot_summary_km2) return null;


  const total = Object.values(hotSpotData).reduce((previous, current) => current + previous);

  return (typeof hotSpotData === 'string')
    ? []
    : Object.entries(hotSpotData).map(([catKey, catValue]) => ({
      x: Number(year),
      y: catValue,
      color: 'red',
      label: categoriesData[catKey].label,
      value: catValue,
      percentage: (catValue / total) * 100,
      unit: '%',
      coverage: (catValue).toFixed(2)
    }));
});

const widgetMeta = (data) => {
  return {
    data
  };
}


export const CONFIG = {
  parse: (widgetData) => (console.log(widgetData) || {
    chartData: data,
    metadata: widgetMeta(data),
    chartConfig: {
      type: 'pie',
      layout: 'centric',
      margin: { top: 20, right: 0, left: 0, bottom: 0 },
      xKey: 'percentage',
      yKeys: {
        pies: {
          y: {
            cx: '50%',
            cy: '50%',
            paddingAngle: 3,
            dataKey: 'percentage',
            nameKey: 'label',
            innerRadius: '60%',
            outerRadius: '80%',
            isAnimationActive: false
          }
        }
      },
      // legend: {
      //   align: 'left',
      //   verticalAlign: 'middle',
      //   layout: 'vertical',
      //   content: (properties) => {
      //     const { payload } = properties;
      //     const groups = groupBy(payload, p => p.payload.label);
      //     // return <WidgetLegend groups={groups} unit="km²" />;
      //   }
      // },
      // tooltip: {
      //   cursor: false,
      //   content: (
      //     // <WidgetTooltip
      //     //   style={{
      //     //     flexDirection: 'column',
      //     //     marginTop: '10px',
      //     //     marginLeft: '-50px'
      //     //   }}
      //     //   settings={[
      //     //     { key: 'label' },
      //     //     { label: 'Percentage:', key: 'percentage', format: percentage => `${percentage ? (percentage).toFixed(2) : null} %`, position: '_column' },
      //     //     { label: 'Coverage:', key: 'coverage', format: coverage => `${(coverage)} km²`, position: '_column' }
      //     //   ]}
      //     // />
      //   )
      // }
    }
  })
};

export default CONFIG;
