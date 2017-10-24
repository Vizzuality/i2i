(function (App) {
  'use strict';

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: '#vis-main-chart',

    options: {
      vis: 'ID',
      title: 'Flow of savings'
    },

    setListeners: function() {
      this.constructor.__super__.setListeners.call(this, {});

      this.chart.addSignalListener('clickHousehold', function(name, value) {
        console.log(name, value);
        if(this.options.onClick) this.options.onClick(value);
      }.bind(this))
    }
  });

}).call(this, this.App);
