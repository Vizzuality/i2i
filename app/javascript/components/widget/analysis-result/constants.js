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
    }
    // legend: {
    //   align: 'left',
    //   verticalAlign: 'middle',
    //   layout: 'vertical',
    //   content: (properties) => {
    //     const { payload } = properties;
    //     const groups = groupBy(payload.map(item => ({
    //       ...item,
    //       payload: {
    //         ...item.payload,
    //         y: (item.payload.y / 1000).toFixed(2)
    //       }
    //     })), p => p.payload.label);
    //     return <WidgetLegend groups={groups} unit="km" />;
    //   }
    // },
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


export const BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 200,
  autosize: {
    type: 'fit',
    contains: 'padding'
  },
  padding: 5,
  config: { range: { category: ['#2f939c', '#97c9ce', '#001d22', '#f9d031', '#f95e31', '#FCAE98', '#633AE8', '#E4D081', '#00D9C6', '#B9A86C', '#7B0051', '#B685C9', '#076270', '#CCC'] } },
  data: [
    {
      name: 'table',
      values: widgetData
    }
  ],
  signals: [
    {
      name: 'tooltip',
      value: {},
      on: [
        {
          events: 'rect:mouseover',
          update: 'datum'
        },
        {
          events: 'rect:mouseout',
          update: '{}'
        }
      ]
    }
  ],
  scales: [
    {
      name: 'xscale',
      type: 'band',
      domain: {
        data: 'table',
        field: 'label'
      },
      range: 'width',
      padding: 0.05,
      nice: true,
      round: true
    },
    {
      name: 'yscale',
      domain: {
        data: 'table',
        field: 'value'
      },
      nice: true,
      range: 'height'
    }
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'xscale',
      domain: false,
      labelAngle: -90,
      labelBaseline: 'middle',
      labelAlign: 'right',
      bandPosition: 0.5,
      ticks: false,
      offset: 6,
      title: 'Year'
    },
    {
      orient: 'left',
      scale: 'yscale',
      domain: false,
      ticks: false,
      grid: true,
      format: 's',
      tickCount: 6,
      offset: 6,
      title: 'Total transaction value ($)'
    }
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
          tooltip: { signal: '{ Category: datum.category, Value: datum.value + datum.unit }' },
          x: {
            scale: 'xscale',
            field: 'label'
          },
          width: {
            scale: 'xscale',
            band: 1
          },
          y: {
            scale: 'yscale',
            field: 'value'
          },
          y2: {
            scale: 'yscale',
            value: 0
          }
        },
        update: {
          fill: { value: '#2f939c' },
          opacity: { value: 1 }
        },
        hover: { opacity: { value: 0.75 } }
      }
    }
  ]
});

export const STACKED_BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 60,
  padding: 5,
  config: { range: { category: ['#2f939c', '#97c9ce', '#001d22', '#f9d031', '#f95e31', '#FCAE98', '#633AE8', '#E4D081', '#00D9C6', '#B9A86C', '#7B0051', '#B685C9', '#076270', '#CCC'] } },
  signals: [
    {
      name: 'titleName',
      description: 'A date value that updates in response to mousemove.',
      update: "data('title')[0].unit"
    }
  ],

  data: [
    {
      name: 'input',
      values: widgetData
    },
    {
      name: 'table',
      source: 'input',
      transform: [
        {
          type: 'window',
          sort: { field: 'value', order: 'descending' },
          ops: ['row_number'],
          as: ['rank']
        },
        {
          type: 'formula',
          as: 'category',
          expr: "datum.rank < 14 ? datum.label : 'Others'"
        },
        {
          type: 'aggregate',
          groupby: ['category', 'unit'],
          ops: ['sum'],
          fields: ['value'],
          as: ['value']
        },
        {
          type: 'stack',
          groupby: ['unit'],
          field: 'value',
          sort: { field: 'value', order: 'ascending' }
        },
        {
          type: 'collect',
          sort: {
            field: 'value',
            order: 'descending'
          }
        }
      ]
    },
    {
      name: 'title',
      source: 'input',
      transform: [
        {
          type: 'aggregate',
          groupby: ['unit']
        }
      ]
    }
  ],

  scales: [
    {
      name: 'y',
      type: 'band',
      range: 'height',
      domain: { data: 'table', field: 'unit' },
      padding: 0.2
    },
    {
      name: 'x',
      type: 'linear',
      range: 'width',
      nice: true,
      zero: true,
      domain: { data: 'table', field: 'y1' }
    },
    {
      name: 'color',
      type: 'ordinal',
      range: 'category',
      domain: { data: 'table', field: 'category' }
    }
  ],

  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      domain: false,
      ticks: false,
      grid: true,
      format: 's',
      title: { signal: 'titleName' }
    },
    {
      orient: 'left',
      scale: 'y',
      domain: false,
      ticks: false,
      labels: false
    }
  ],

  legends: [
    {
      fill: 'color',
      orient: 'bottom',
      direction: 'vertical',
      symbolType: 'square'
    }
  ],

  marks: [
    {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
          tooltip: { signal: '{ Category: datum.category, Value: datum.value }' },
          y: { scale: 'y', field: 'unit' },
          height: { scale: 'y', band: 1, offset: 0 },
          x: { scale: 'x', field: 'y1' },
          x2: { scale: 'x', field: 'y0' },
          fill: { scale: 'color', field: 'category' }
        },
        update: { fillOpacity: { value: 1 } },
        hover: { fillOpacity: { value: 0.75 } }
      }
    }
  ]
});

export const GROUPED_BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 60,
  padding: 5,

  config: { range: { category: ['#2f939c', '#97c9ce', '#001d22', '#f9d031', '#f95e31', '#FCAE98', '#633AE8', '#E4D081', '#00D9C6', '#B9A86C', '#7B0051', '#B685C9', '#076270', '#CCC'] } },

  data: [
    {
      name: 'input',
      values: widgetData
    },
    {
      name: 'table',
      source: 'input',
      transform: [
        {
          type: 'window',
          sort: { field: 'value', order: 'descending' },
          ops: ['row_number'],
          as: ['rank']
        },
        {
          type: 'formula',
          as: 'category',
          expr: "datum.rank < 14 ? datum.label : 'Others'"
        },
        {
          type: 'aggregate',
          groupby: ['category', 'unit'],
          ops: ['sum'],
          fields: ['value'],
          as: ['value']
        },
        {
          type: 'window',
          sort: { field: 'value', order: 'ascending' },
          ops: ['lag'],
          fields: ['value'],
          as: ['sd']
        },
        {
          type: 'formula',
          as: 'x',
          expr: 'datum.sd==null ? 0 : datum.sd'
        },
        {
          type: 'collect',
          sort: {
            field: 'value',
            order: 'descending'
          }
        }
      ]
    },
    {
      name: 'title',
      source: 'input',
      transform: [
        {
          type: 'aggregate',
          groupby: ['title']
        }
      ]
    }
  ],

  signals: [
    {
      name: 'titleName',
      update: "data('title')[0].title"
    }
  ],

  scales: [
    {
      name: 'y',
      type: 'band',
      range: 'height',
      domain: { data: 'table', field: 'unit' },
      padding: 0.2
    },
    {
      name: 'x',
      type: 'linear',
      range: 'width',
      nice: true,
      zero: true,
      domain: { data: 'table', field: 'value' }
    },
    {
      name: 'color',
      type: 'ordinal',
      range: 'category',
      domain: { data: 'table', field: 'category' }
    }
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      domain: false,
      ticks: false,
      grid: true,
      format: 's',
      title: { signal: 'titleName' }
    },
    {
      orient: 'left',
      scale: 'y',
      domain: false,
      ticks: false,
      labels: false
    }
  ],
  legends: [
    {
      fill: 'color',
      orient: 'bottom',
      direction: 'vertical',
      symbolType: 'square'
    }
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
          tooltip: { signal: '{ Category: datum.category, Value: datum.value }' },
          y: { scale: 'y', field: 'unit' },
          height: { scale: 'y', band: 1, offset: 0 },
          x: { scale: 'x', field: 'x' },
          x2: { scale: 'x', field: 'value' },
          fill: { scale: 'color', field: 'category' }
        },
        update: { fillOpacity: { value: 1 } },
        hover: { fillOpacity: { value: 0.75 } }
      }
    }
  ]
});
