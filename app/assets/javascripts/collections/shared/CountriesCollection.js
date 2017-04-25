(function (App) {
  'use strict';

    App.Collection.CountriesCollection = Backbone.Collection.extend({
      comparator: 'name',
      url: API_URL + '/country?lastyear=true',
      parse: function (data) {
        return data.map(function (country) {
          return {
            iso: country.iso,
            name: country.name,
            latestYear: country.year[0].year
          };
        }).filter(function (country) {
          // Kenya is temporarly hidden
          // https://basecamp.com/1756858/projects/12871501/todos/305471773
          return country.iso !== 'KEN';
        });
      }
    });

}).call(this, this.App);
