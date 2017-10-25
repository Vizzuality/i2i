(function (App) {
  'use strict';

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: '#vis-main-chart',

    options: {
      vis: 'ID',
      title: 'Flow of savings',
      customTooltip: true,
      tooltip: {
        fields: [{
          field: "date",
          title: "Date",
          formatType: "string"
        },
        {
          field: "value",
          title: "Value",
          formatType: "number"
        }]
      }
    },

    setListeners: function() {
      this.constructor.__super__.setListeners.call(this, {});


      if(!this.options.params.household) {
        this.chart.addSignalListener('clickHousehold', function(name, value) {
          if (this.options.onClick) this.options.onClick(value);
        }.bind(this))

        // WIP
        this.chart.addSignalListener('overHousehold', function(name, data) {
          if(!data) return;
          var currentDate = data.date;

          var currentItem = (data.item || []).find(function(i) {
            return currentDate.toString === new Date(i.date).toString;
          });

        }.bind(this))
      }
    }
  });

}).call(this, this.App);
