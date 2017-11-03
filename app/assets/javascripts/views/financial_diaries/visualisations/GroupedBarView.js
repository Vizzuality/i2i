(function (App) {
  'use strict';

  App.View.GroupedBarView = App.View.VegaChartView.extend({

    options: {
      spec: App.Specs.GroupedBarChart,
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
      }
    }

  });

}).call(this, this.App);
