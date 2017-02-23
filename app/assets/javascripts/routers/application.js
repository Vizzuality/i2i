App.Router.StaticPages = Backbone.Router.extend({

  routes: {
    '': '_homePage',
    libraries: '_libraryPage',
    about: '_aboutPage'
  },

  _homePage: function () {
    new App.Page.HomePage();
  },

  _libraryPage: function () {
    new App.Page.LibraryPage();
  },

  _aboutPage: function () {
    new App.Page.AboutPage();
  }

});

new App.Router.StaticPages();

document.addEventListener('turbolinks:load', function () {
  Backbone.history.stop();
  Backbone.history.start({ pushState: true });
  // this only intializes once. CHANGE
  new App.View.MobileMenu();
  new App.View.Footer();
});
