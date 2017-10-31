(function (App) {
  'use strict';

  var isTabletOrHigher = window.innerWidth >= 768;

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: isTabletOrHigher ? '#vis-main-chart' : '#vis-main-chart-mobile',

    options: {
      renderer: 'canvas',
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
      spec: isTabletOrHigher ? App.Specs.MainChart : App.Specs.MainChartMobile
    },

    setListeners: function() {
      this.constructor.__super__.setListeners.call(this, {});

      this.chart.addSignalListener('clickHousehold', function(name, value) {
        if (this.options.onClick) this.options.onClick(value);
      }.bind(this))

      this.chart.addSignalListener('overHousehold', function(name, data) {
        if(!data) return;
        var currentDate = data.date;

        var currentItem = (data.item || []).find(function(i) {
          return currentDate.toString === new Date(i.date).toString;
        });

      }.bind(this))
    }
  });

}).call(this, this.App);
