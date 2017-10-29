(function (App) {
  'use strict';

  App.Page.CountryPreview = Backbone.View.extend({

    initialize: function() {
      new App.Component.CountryPreview({
        onChangeCountry: function(country) {
          Turbolinks.visit('/data-portal/' + country);
        }
      });
    }

  });

}).call(this, this.App);
