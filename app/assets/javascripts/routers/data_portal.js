(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal': 'index',
      'data-portal/:iso/:year': 'country',
    },

    index: function () {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button because
      // the router will still be listening to the route and when
      // Turbolinks triggers its load event, the DOM won't be
      // loaded yet
      Backbone.history.stop();

      new App.Page.DataPortalIndexPage();
    },

    country: function (iso, year) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button
      Backbone.history.stop();

      new App.Page.DataPortalCountryPage({
        iso: iso,
        year: +year
      });
    }

  });

  var init = function () {
    var router = new Router();

    // Don't touch these two lines without testing if the
    // browser's back and forward buttons aren't broken
    Backbone.history.stop();
    Backbone.history.start({ pushState: true });

    new App.View.MobileMenu();
    new App.View.Footer();
  };

  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
