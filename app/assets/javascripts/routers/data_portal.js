App.Router.DataPortal = Backbone.Router.extend({

  routes: {
    'data-portal': 'index',
    'data-portal/:iso/:year': 'country',
  },

  index: function () {
    new App.Page.DataPortalIndexPage();
  },

  country: function (iso, year) {
    new App.Page.DataPortalCountryPage({
      iso: iso,
      year: +year
    });
  }

});

new App.Router.DataPortal();

document.addEventListener('turbolinks:load', function () {
  Backbone.history.stop();
  Backbone.history.start({ pushState: true });
});
