((function (App) {
  'use strict';

  // This is the configuration of all the charts used in the App
  // The format of each of them must be like:
  // {
  //   name: string,
  //   acceptedStatTypes: string[][],
  //   categories?: string[],
  //   ratio?: number,
  //   visible?: boolean
  // }
  //
  // Here is the description of each of the attributes:
  // - name: name of the chart
  // - acceptedStatTypes: refer to Jiminy's documentation
  // - categories: categories of widgets for which the chart can be used, check the
  // list in App.Helper.Indicators.CATEGORIES; if omitted, the chart is available for
  // all the categories
  // - ratio: ratio between the width and the height, if not set, use the
  // default one in App.View.ChartWidgetView
  // - visible: hide the chart from the chart selector; default to true
  App.Helper.ChartConfig = [
    {
      name: 'pie',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ],
      categories: [App.Helper.Indicators.CATEGORIES.COMMON]
    },
    {
      name: 'bar',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ],
      categories: [App.Helper.Indicators.CATEGORIES.COMMON]
    },
    {
      name: 'radial',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ],
      categories: [App.Helper.Indicators.CATEGORIES.ACCESS, App.Helper.Indicators.CATEGORIES.STRANDS],
      ratio: 0.3
    },
    {
      name: 'analysis',
      categories: [App.Helper.Indicators.CATEGORIES.ACCESS, App.Helper.Indicators.CATEGORIES.STRANDS],
      visible: false
    },
    {
      name: 'compare',
      categories: [App.Helper.Indicators.CATEGORIES.ACCESS, App.Helper.Indicators.CATEGORIES.STRANDS],
      visible: false,
      ratio: 0.3
    },
    {
      name: 'table',
      // We don't really care about the types here
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ]
    }
  ];
})(this.App));
