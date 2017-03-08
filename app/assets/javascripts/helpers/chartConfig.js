((function (App) {
  'use strict';

  App.Helper.ChartConfig = [
    {
      name: 'pie',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ]
    },
    {
      name: 'bar',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ]
    },
    {
      name: 'radial',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ],
      // The following attribute is not part of the Jiminy requirements
      // It's used to bypass it to have custom rules
      // strandOnly charts are the only charts a strand indicator can be rendered
      // into
      // Indicators which category is different from strand can't be rendered using
      // a strandOnly chart
      strandOnly: true,
      // The following attribute is not part of the Jiminy requirements
      // Ratio between the width and the height
      // If not set, use the default one in App.View.ChartWidgetView
      ratio: 0.3
    },
  ];
})(this.App));
