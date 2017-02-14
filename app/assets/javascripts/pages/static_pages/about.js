
(function (App) {

  'use strict';

  App.Page.AboutPage = Backbone.View.extend({

    initialize: function () {
      this._setEventListeners();
    },

    onClick: function (e) {
      var slug = e.currentTarget.getAttribute('data-slug');

      new App.Component.ModalTeam({
        slug: slug
      });
    },

    _setEventListeners: function() {
      Array.prototype.slice.call(document.querySelectorAll('.c-profile')).forEach(function (elem) {
        elem.addEventListener('click', this.onClick);
      }.bind(this));
    }

  });

}).call(this, this.App);
