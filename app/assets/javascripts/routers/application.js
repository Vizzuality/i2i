(function (App) {
  'use strict';

var Router = Backbone.Router.extend({

  routes: {
    '': '_homePage',
    'news/:id(/)': '_newsPage',
    'updates(/)': '_updatesPage',
    'updates/events(/)': '_eventsPage',
    'resources(/)(:category)': '_libraryPage',
    'about(/)': '_aboutPage',
    'terms-of-use(/)': '_termsOfUsePage'
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

  _newsPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.NewsPage();
  },

  _updatesPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.UpdatesPage();
  },

  _eventsPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.EventsPage();
  },

  _libraryPage: function (category) {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.LibraryPage({
      categories: gon.categories.categories,
      selectedCategory: category
    });
  },

  _aboutPage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();

    new App.Page.AboutPage();
  },

  _termsOfUsePage: function () {
    // Don't forget to stop the router on each route
    // otherwise you'll break the browser's back button
    Backbone.history.stop();
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
  new App.View.Newsletter();
  new App.View.Cards();
};

document.addEventListener('turbolinks:load', init);

}).call(this, this.App);
