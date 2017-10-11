(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal/:iso/:year/financial-diaries': 'index'
    },

    index: function (iso, year) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button because
      // the router will still be listening to the route and when
      // Turbolinks triggers its load event, the DOM won't be
      // loaded yet
      // Backbone.history.stop();
      // Backbone.history.start({ pushState: true });

      new App.Page.DataPortalFinancialDiariesIndexPage({
        iso: iso,
        year: +year
      });
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
