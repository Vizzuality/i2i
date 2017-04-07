(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal': 'index',
      'data-portal/:iso/:year': 'country',
      'data-portal/indicator': 'indicator',
      'data-portal/report': 'report'
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
    },

    indicator: function (p) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button
      Backbone.history.stop();

      var state = p && p.slice(2, p.length + 1);

      new App.Page.DataPortalIndicatorPage({
        encodedState: state
      });
    },

    report: function (params) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button
      Backbone.history.stop();
      var indicators = [],
        serializedIndicators;

      if (params) {
        var indicatorsb64 = params.split('=')[1] ? params.split('=')[1] : null;
        if (indicatorsb64) {
          // decodes b64 string to object
          indicators = JSON.parse(App.Helper.URL.decode(indicatorsb64).indicators);

          // deserializes incoming indicators
          serializedIndicators = indicators.map(function(ind) {
            return App.Helper.Indicators.deserialize(ind);
          });
        }
      }

      // redirect to data-portal if there is no indicators to display
      if (!indicators.length) {
        Turbolinks.visit("/data-portal", { action: "replace" });
        return;
      }

      new App.Page.DataPortalReportPage({
        indicators: serializedIndicators
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
