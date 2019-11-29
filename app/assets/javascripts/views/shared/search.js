(function (App) {

  App.View.Search = Backbone.View.extend({

    el: '#search-form',

    events: {
      'click .js-close-menu' : '_toggleMenu',
      'touchstart .js-close-menu' : '_toggleMenu'
    },

    initialize: function () {
      this._setVars();
      this._setEventListeners();
    },

    _setVars: function() {
      this.$search = document.querySelector('#search-form');
    },

    _setEventListeners: function () {
      this.$search.addEventListener('click', this._navigateToSearch.bind(this));
    },

    _navigateToSearch: function (e) {
      e.preventDefault();
      Turbolinks.visit('/search/');
    }

  });
}).call(this, this.App);
