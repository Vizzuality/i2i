(function (App) {
  'use strict';

  App.Page.FinancialDiariesEmbedPage = Backbone.View.extend({

    el: '.js-widget',

    initialize: function(settings) {
      this.options = Object.assign({}, this.defaults, settings || {});
      this.iso = this.options.iso;
      this._renderChart();
    },

    _renderChart: function() {
      var capitalize = App.Helper.Utils.capitalize;
      var commonParams = {
        project_name: gon.project_name,
        api: FD_API_URL
      };
      var isPrintable = this.options.print;

      var chartProperty = this.options.chartType.split('-').map(function(word) {
        return capitalize(word)
      }).join('');

      var datasetProperty = capitalize(this.options.dataset);

      var params = Object.assign(
        {},
        { params: Object.assign(
            {},
            commonParams,
            this.options.params,
            { household: this.options.params.household || '' },
            { title: this.options.params.title || '' }
          )},
        { el: this.el },
        { spec: App.Specs[datasetProperty][chartProperty] },
        { showToolbar: false }
      );

      switch (this.options.chartType) {
        case 'main-chart':
          new App.View.MainChartView(params);
          break;
        case 'main-chart-details':
          new App.View.MainChartDetails(params);
          break;
        case 'grouped-bar-chart':
          new App.View.GroupedBarView(params);
        default:
          break;
      }

      // temporary patch...
      if(this.options.print) setTimeout(this._onPrint, 2500);
    },

    _onPrint: function () {
      window.print();
    }
  });

}).call(this, this.App);
