(function (App) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'data-portal': 'index',
      'data-portal/:iso/:year': 'country',
      'data-portal/region/:iso/:year': 'region',
      'data-portal/region/:iso': 'region',
      'data-portal/indicator': 'indicator',
      'data-portal/indicator/embed/:iso/:year': 'indicatorEmbed',
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

      new App.Component.CountryPreview({
        onChangeCountry: function (country) {
          var iso = country.split('-')[0];
          // It's a kind of magic
          var latesYear = year === 'fsp-maps' ? 'fsp-maps' : country.split('-')[1];
          Turbolinks.visit('/data-portal/' + iso + '/' + latesYear);
        }
      });
    },

    region: function (iso, year) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button
      Backbone.history.stop();

      new App.Page.DataPortalRegionPage({
        iso: iso,
        year: +year
      });

      new App.Component.CountryPreview({
        onChangeCountry: function (country) {
          var iso = country.split('-')[0];
          // It's a kind of magic
          var latesYear = year === 'fsp-maps' ? 'fsp-maps' : country.split('-')[1];
          Turbolinks.visit('/data-portal/region/' + iso + '/' + latesYear);
        }
      });
    },

    indicator: function (p) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button
      Backbone.history.stop();

      var params = p
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

      new App.Page.DataPortalIndicatorPage({
        encodedState: params.p || null,
        print: params.print || false
      });
    },

    indicatorEmbed: function(iso, year, queryParams) {
      var params = queryParams
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
      new App.Page.DataPortalCountryIndicatorPage({ i: iso, y: year, q: params });
    },

    report: function (params) {
      // Don't forget to stop the router on each route
      // otherwise you'll break the browser's back button

      var indicators = [],
        deserializedIndicators;

      if (params) {
        var indicatorsb64 = params.split('=')[1] ? params.split('=')[1] : null;
        if (indicatorsb64) {
          // decodes b64 object to object
          indicators = App.Helper.URL.decode(indicatorsb64).indicators;

          // deserializes incoming indicators
          deserializedIndicators = indicators.map(function(ind) {
            return App.Helper.Indicators.deserialize(ind);
          });
        }
      }

      // redirect to data-portal if there is no indicators to display
      if (!indicators.length) {
        Turbolinks.visit('/data-portal', { action: 'replace' });
        return;
      }

      new App.Page.DataPortalReportPage({
        indicators: deserializedIndicators
      });
    }

  });

  var init = function () {
    var router = new Router();

    // Don't touch these two lines without testing if the
    // browser's back and forward buttons aren't broken
    Backbone.history.stop();
    Backbone.history.start({ pushState: true });

    new App.View.Cards();
    new App.View.MobileMenu();
    new App.View.Newsletter();
    new App.Component.FixedNav();

    // Go to previous scroll if turbolinks is enbaled in the same page
    if (window.currentLocation === window.location.pathname) {
      $('html, body').scrollTop(window.prevPageYOffset);
    } else {
      $('html, body').scrollTop(0);
    }
  };

  var getPreviousScroll = function() {
    window.currentLocation = window.location.pathname;
    window.prevPageYOffset = window.pageYOffset;
    window.prevPageXOffset = window.pageXOffset;
  };

  document.addEventListener('turbolinks:request-start', getPreviousScroll);
  document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
