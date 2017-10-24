(function (App) {
  'use strict';

  App.View.GroupedBarView = App.View.VegaChartView.extend({

    el: '#vis-grouped-bar-chart',

    options: {
      spec: App.Specs.GropuedBarChart,
      vis: 'ID',
      title: 'Saving by type'
    }
  });

}).call(this, this.App);
