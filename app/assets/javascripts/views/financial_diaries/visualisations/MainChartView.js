(function (App) {
  'use strict';

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: '#vis-main-chart',

    options: {
      renderer: 'canvas',
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
            value: 'date',
            formatType: 'string'
          }
        ]
      },
      spec: App.Specs.Households.MainChart
    },

    setListeners: function() {
      this.constructor.__super__.setListeners.call(this, {});

      this.chart.addSignalListener('clickHousehold', function(name, value) {
        if (this.options.onClick) this.options.onClick(value);
      }.bind(this))

      // this.chart.addSignalListener('overHousehold', function(name, data) {
      //   if(!data) return;

      //   var currentItem = _.findWhere(data.item.values, function(d) {
      //     return moment(data.date).isSame(d.date, 'day');
      //   });
      // }.bind(this))
    }

  });

}).call(this, this.App);
