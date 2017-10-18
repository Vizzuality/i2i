(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal/:iso/financial-diaries': 'visualisations',
      'data-portal/:iso/:year/financial-diaries': 'index'
    },

    index: function (iso, year, p) {
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

      new App.Page.DataPortalFinancialDiariesIndexPage({
        iso: iso,
        year: +year,
        filters: params.p ? JSON.parse(window.atob(params.p)) : {}
      });
    },

    visualisations: function() {
      // TODO: change params with correct one
      new App.View.MainChartView({ params: { c: 3 } });
    }
  });

  var init = function () {
    App.Router.FinancialDiaries = new Router();

    // Don't touch these two lines without testing if the
    // browser's back and forward buttons aren't broken
    Backbone.history.stop();
    Backbone.history.start({ pushState: true });

    new App.View.MobileMenu();
    new App.View.Newsletter();
  };

  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
