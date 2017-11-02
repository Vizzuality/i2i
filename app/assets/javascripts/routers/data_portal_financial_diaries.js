(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal/:iso': 'index',
      'data-portal/:iso/financial-diaries': 'show'
    },

    index: function() {
      new App.Page.CountryPreview();
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

    // Go to previous scroll if turbolinks is enbaled in the same page
    if (window.currentLocation === window.location.pathname) {
      $('html, body').scrollTop(window.prevPageYOffset);
    } else {
      $('html, body').scrollTop(0);
    }

    new App.View.MobileMenu();
    new App.View.Newsletter();
    new App.Component.FixedNav();
  };

  var getPreviousScroll = function() {
    window.currentLocation = window.location.pathname;
    window.prevPageYOffset = window.pageYOffset;
    window.prevPageXOffset = window.pageXOffset;
  };

  document.addEventListener('turbolinks:request-start', getPreviousScroll);
  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
