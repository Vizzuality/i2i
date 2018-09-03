export const PIE_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 200,
  config: { range: { category: ['#2f939c', '#97c9ce', '#001d22', '#f9d031', '#f95e31', '#FCAE98', '#633AE8', '#E4D081', '#00D9C6', '#B9A86C', '#7B0051', '#B685C9', '#076270', '#CCCCCC'] } },
  data: [
    {
      name: 'table',
      values: widgetData,
      transform: [
        {
          type: 'window',
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
          groupby: ['category'],
          ops: ['sum'],
          fields: ['value'],
          as: ['value']
        },
        {
          type: 'pie',
          field: 'value',
          startAngle: 0,
          endAngle: 6.29
        }
      ]
    }
  ],
  scales: [
    {
      name: 'c',
      type: 'ordinal',
      range: 'category',
      domain: { data: 'table', field: 'category' }
    }
  ],
  legends: [
    {
      fill: 'c',
      orient: 'left',
      direction: 'vertical',
      symbolType: 'square'
    }
  ],
  marks: [
    {
      type: 'arc',
      from: { data: 'table' },
      encode: {
        enter: {
          fill: { scale: 'c', field: 'category' },
          x: { signal: 'width / 2' },
          y: { signal: 'height / 2' }
        },
        update: {
          opacity: { value: 1 },
          startAngle: { field: 'startAngle' },
          endAngle: { field: 'endAngle' },
          padAngle: { signal: 0.02 },
          innerRadius: { signal: 'width > height ? height / 3 : width / 3' },
          outerRadius: { signal: 'width > height ? height / 2 : width / 2' }
        },
        hover: { opacity: { value: 0.8 } }
      }
    }
  ],
  interaction_config: [
    {
      name: 'tooltip',
      config: {
        fields: [
          {
            column: 'value',
            property: 'value',
            type: 'number',
            format: '.2s'
          },
          {
            column: 'category',
            property: 'category',
            type: 'string'
          }
        ]
      }
    }
  ]
});

export const BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 200,
  padding: 5,

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
      offset: 6
    },
    {
      orient: 'left',
      scale: 'yscale',
      domain: false,
      ticks: false,
      grid: true,
      format: 's',
      tickCount: 6,
      offset: 6
    }
  ],
  marks: [
    {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
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
        hover: { opacity: { value: 0.8 } }
      }
    }
  ]
});

export const STACKED_BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 100,
  padding: 5,

  data: [
    {
      name: 'table',
      values: widgetData,
      transform: [
        {
          type: 'stack',
          groupby: ['unit'],
          field: 'value',
          sort: { field: 'value', order: 'ascending' }
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
      domain: { data: 'table', field: 'label' }
    }
  ],

  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      domain: false,
      ticks: false,
      grid: true,
      format: 's'
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
          y: { scale: 'y', field: 'unit' },
          height: { scale: 'y', band: 1, offset: 0 },
          x: { scale: 'x', field: 'y1' },
          x2: { scale: 'x', field: 'y0' },
          fill: { scale: 'color', field: 'label' }
        },
        update: { fillOpacity: { value: 1 } },
        hover: { fillOpacity: { value: 0.8 } }
      }
    }
  ]
});

export const GROUPED_BAR_SPEC = (widgetData, width) => ({
  $schema: 'https://vega.github.io/schema/vega/v4.json',
  width,
  height: 100,
  padding: 5,
  data: [
    {
      name: 'table',
      values: widgetData,
      transform: [
        {
          type: 'window',
          sort: { field: 'value', order: 'ascending' },
          ops: ['lag'],
          fields: ['value'],
          as: ['sd']
        },
        { type: 'formula', as: 'x', expr: 'datum.sd==null ? 0 : datum.sd' },
        {
          type: 'collect',
          sort: {
            field: 'value',
            order: 'descending'
          }
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
      domain: { data: 'table', field: 'value' }
    },
    {
      name: 'color',
      type: 'ordinal',
      range: 'category',
      domain: { data: 'table', field: 'label' }
    }
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      domain: false,
      ticks: false,
      grid: true,
      format: 's'
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
          y: { scale: 'y', field: 'unit' },
          height: { scale: 'y', band: 1, offset: 0 },
          x: { scale: 'x', field: 'x' },
          x2: { scale: 'x', field: 'value' },
          fill: { scale: 'color', field: 'label' }
        },
        update: { fillOpacity: { value: 1 } },
        hover: { fillOpacity: { value: 0.8 } }
      }
    }
  ]
});
