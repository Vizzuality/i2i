(function (App) {
  'use strict';

  App.View.GroupedBarView = App.View.VegaChartView.extend({

    el: '#vis-grouped-bar-chart',

    options: {
      spec: App.Specs.GroupedBarChart
    }
  });

}).call(this, this.App);
