(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal/:iso/financial-diaries/embed/:chart_type': 'index'
    },

    index: function(iso, chartType, p) {
      Backbone.history.stop();

      var params = (p || '')
        .split('&')
        .map(function (param) {
          return {
            name: param.split('=')[0],
            value: param.split('=')[1]
          };
        })
        .reduce(function (res, param) {
          res[param.name] = param.value;
          return res;
        }, {});

      new App.Page.FinancialDiariesEmbedPage({
        iso: iso,
        chartType: chartType,
        params: params.p ? JSON.parse(window.atob(params.p)) : {},
        print: params.print ? true : false
      });
    }

  });

  var init = function () {
    App.Router.FinancialDiariesEmbed = new Router();

    // Don't touch these two lines without testing if the
    // browser's back and forward buttons aren't broken
    Backbone.history.stop();
    Backbone.history.start({ pushState: true });
  };

  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
