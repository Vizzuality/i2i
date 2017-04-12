(function (App) {

  App.View.MobileMenu = Backbone.View.extend({

    el: '.c-mobile-menu',

    events: {
      'click .js-close-menu' : '_toggleMenu',
      'touchstart .js-close-menu' : '_toggleMenu'
    },

    initialize: function () {
      this._setVars();
      this._setEventListeners();
    },

    _setVars: function() {
      this.body = document.querySelector('body');
    },

    _setEventListeners: function () {
      var button = document.querySelector('.js-btn-mobile-menu');
      if (button) {
        button.addEventListener('click', this._toggleMenu.bind(this));
      }
    },

    _toggleMenu: function (e) {
      e.preventDefault();
      this.el.classList.toggle('-open');

      this.body.classList.toggle('_no-scroll', this.el.classList.contains('-open'));


    }

  });
}).call(this, this.App);
