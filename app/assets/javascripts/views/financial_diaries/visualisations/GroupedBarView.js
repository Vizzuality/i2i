(function (App) {
  'use strict';

  App.View.GroupedBarView = App.View.VegaChartView.extend({

    options: {
      spec: App.Specs.GroupedBarChart
    }

  });

}).call(this, this.App);
