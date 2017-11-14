(function (App) {
  'use strict';

  App.View.MainChartHouseholdView = App.View.VegaChartView.extend({

    el: '#vis-main-household-detail-chart',

    options: {
      tooltip: {
        showAllFields: false,
        fields: [{
          title: 'Subcategory',
          field: 'subcategory'
        }, {
          title: 'Value',
          field: 'value',
          formatType: 'number',
          format: 's'
        }, {
          title: 'Date',
          field: 'date',
          formatType: 'time',
          format: '%Y-%m'
        }]
      },
      spec: App.Specs.Households.MainChartDetails
    }

  });

}).call(this, this.App);
