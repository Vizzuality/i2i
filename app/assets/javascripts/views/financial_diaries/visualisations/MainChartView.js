(function(App) {
  'use strict';

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: '#vis-main-chart',

    options: {
      spec: chartSpec,
      vis: 'ID',
      title: 'Flow of savings'
    }

  });

}).call(this, this.App);
