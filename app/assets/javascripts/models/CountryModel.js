(function (App) {
  'use strict';

  App.Model.CountryModel = Backbone.Model.extend({

    initialize: function (iso, year) {
      this.year = year;
      this.iso = iso;
    },

    url: function() {
      return API_URL + '/country/' + this.iso;
    },

    parse: function (data) {
      var population = null;
      if (data && data.length && data[0].years.length) {
        var year = data[0].years.find(function (y) {
          return y.year === this.year;
        }, this);
        population = year && year.total;
      }

      return {
        population: population,
        url: data && data.length && data[0].mapUrl || null,
        downloadable: !!(year || {}).dataUrl
      };
    }

  });

}).call(this, this.App);
