(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal/:iso/financial-diaries': 'show'
    },

    show: function (iso, p) {

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

      new App.Page.DataPortalFinancialDiariesIndexPage({
        iso: iso,
        filters: params.p ? JSON.parse(window.atob(params.p)) : {}
      });
    }
  });

  var init = function () {
    App.Router.FinancialDiaries = new Router();

    // Don't touch these two lines without testing if the
    // browser's back and forward buttons aren't broken
    Backbone.history.stop();
    Backbone.history.start({ pushState: true });

    window.scrollTo(window.prevPageXOffset, window.prevPageYOffset);

    new App.View.MobileMenu();
    new App.View.Newsletter();
  };

  var getPreviousScroll = function() {
    window.prevPageYOffset = window.pageYOffset;
    window.prevPageXOffset = window.pageXOffset;
  };

  document.addEventListener('turbolinks:request-start', getPreviousScroll);
  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
