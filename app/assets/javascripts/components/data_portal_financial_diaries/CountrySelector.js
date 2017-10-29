(function (App) {
  'use strict';

  App.Component.CountryPreview = Backbone.View.extend({

    defaults: {
      onChangeCountry: null
    },

    el: '.c-country-selector',

    events: {
      'change .js-country-selector': '_onChangeCountry'
    },

    initialize: function(settings) {
      this.options = Object.assign({}, this.defaults, settings || {});
    },

    _onChangeCountry: function (e) {
      var country = e.currentTarget.selectedOptions[0].value;

      if(this.options.onChangeCountry) this.options.onChangeCountry(country);
    }

  });

}).call(this, this.App);
