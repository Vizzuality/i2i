(function (App) {
  'use strict';

  App.Page.CountryPreview = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor'
    },

    initialize: function () {
      new App.Component.CountryPreview({
        onChangeCountry: function (country) {
          Turbolinks.visit('/data-portal/' + country);
        }
      });
    },

    _onClickAnchor: function (e) {
      e.preventDefault();

      var href = e.currentTarget.getAttribute('href').split('#');
      var target = '#' + href[1];

      $('html, body').animate({
        scrollTop: $(target).offset().top - 50
      });
    }

  });

}).call(this, this.App);
