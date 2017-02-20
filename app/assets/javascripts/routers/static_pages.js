
App.Router.StaticPages = Backbone.Router.extend({

  routes: {
    about: '_aboutPage'
  },

  _aboutPage: function () {
    new App.Page.AboutPage();
  }

});

new App.Router.StaticPages();

document.addEventListener('DOMContentLoaded', function () {
  Backbone.history.start({ pushState: true });
  new App.View.MobileMenu();
  new App.View.Footer();
});
