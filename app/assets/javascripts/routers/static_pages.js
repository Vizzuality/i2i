
App.Router.StaticPages = Backbone.Router.extend({

  routes: {
    about: '_aboutPage'
  },

  _aboutPage: function () {
    new App.Page.AboutPage();
  }

});

new App.Router.StaticPages();
Backbone.history.start({ pushState: true });
