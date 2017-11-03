(function (App) {
  'use strict';

  App.View.MainChartHouseholdView = App.View.VegaChartView.extend({

    el: '#vis-main-household-detail-chart',

    options: {
      customTooltip: true,
      customTooltipOptions: {
        fields: [
          {
            title: 'Value',
            value: 'value',
            formatType: 'number',
            format: "s"
          },
          {
            title: 'Date',
            field: 'date',
            formatType: 'time',
            format: '%Y-%m'
          }
        ]
      },
      spec: App.Specs.MainChartHousehold
    }

  });

}).call(this, this.App);
