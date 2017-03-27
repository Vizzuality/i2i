(function (App) {
  'use strict';

var Router = Backbone.Router.extend({

  routes: {
    '': '_homePage',
    'updates/events': '_eventsPage',
    'libraries': '_libraryPage',
    'about': '_aboutPage'
  },

  // *** PAGES ***
  _homePage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button because
    // the router will still be listening to the route and when
    // Turbolinks triggers its load event, the DOM won't be
    // loaded yet
    Backbone.history.stop();

    new App.Page.HomePage();
  },

  _eventsPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.EventsPage();
  },

  _libraryPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.LibraryPage();
  },

  _aboutPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.AboutPage();
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
