
import WidgetLegend from 'components/widget/legend';

export const PIE_SPEC = widgetData => ({
  chartData: widgetData,
  chartConfig: {
    type: 'pie',
    layout: 'centric',
    height: 250,
    margin: { top: 20, right: 0, left: 0, bottom: 0 },
    xKey: 'percentage',
    yKeys: {
      pies: {
        coverage: {
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
    legend: {
      align: 'left',
      verticalAlign: 'middle',
      layout: 'vertical',
      content: (properties) => {
        const { payload } = properties;
        const groups = groupBy(payload.map(item => ({
          ...item,
          payload: {
            ...item.payload,
            y: (item.payload.y / 1000).toFixed(2)
          }
        })), p => p.payload.label);
        return <WidgetLegend groups={groups} unit="km" />;
      }
    },
    // tooltip: {
    //   cursor: false,
    //   content: (
    //     <WidgetTooltip
    //       style={{

    //         flexDirection: 'column',
    //         justifyContent: 'space-around',
    //         marginLeft: '10px',
    //       }}
    //       settings={[
    //         { key: 'label' },
    //         { label: 'Percentage:', key: 'percentage', format: percentage => `${percentage ? percentage.toFixed(2) : null} %`, position: '_column' },
    //         { label: 'Coverage:', key: 'coverage', format: coverage => `${(numberFormat(coverage))} km`, position: '_column' }

    //       ]}
    //     />
    //   )
    // }
  }
});


export const BAR_SPEC = () => {

};

export const GROUPED_BAR_SPEC = () => {

};

export const STACKED_BAR_SPEC = () => {

};
