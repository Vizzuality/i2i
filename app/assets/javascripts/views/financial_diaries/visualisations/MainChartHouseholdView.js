(function (App) {
  'use strict';

  App.View.MainChartHouseholdView = App.View.VegaChartView.extend({

    el: '#vis-main-household-detail-chart',

    options: {
      customTooltip: true,
      customTooltipOptions: {
        fields: [
          {
            name: 'Date',
            value: 'date'
          },
          {
            name: 'Value',
            value: 'value',
            format: "s"
          }
        ]
      },
      spec: App.Specs.MainChartHousehold
    }

  });

}).call(this, this.App);
