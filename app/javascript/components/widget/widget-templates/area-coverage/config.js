
const getPies = (data) => {
  const {label } = data.label
  return

}

export const CONFIG = {
  parse: (data) => ({
    chartData: data,
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
      }
    }
  })
};


export default CONFIG;
