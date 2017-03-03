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
      // Complex charts will only be used for the complex indicators
      // Complex indicators also won't use non-complex charts
      complex: true,
      // The following attribute is not part of the Jiminy requirements
      // Ratio between the width and the height
      // If not set, use the default one in App.View.ChartWidgetView
      ratio: 0.3
    },
  ];
})(this.App));
