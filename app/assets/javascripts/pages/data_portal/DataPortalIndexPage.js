(function (App) {
  'use strict';

  var Collection = Backbone.Collection.extend({
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

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: '.js-countries',

    template: JST['templates/data_portal/index-page'],

    initialize: function () {
      this.collection = new Collection();
      this._fetchData();
    },

    /**
     * Fetch the Collection
     */
    _fetchData: function () {
      // The first time we render to have the placeholder flags
      this.render();

      this.collection.fetch()
        .done(function () {
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    render: function () {
      if (this._loadingError) {
        new App.View.RetryMessageView({
          el: this.el,
          label: 'Unable to load the countries',
          callback: this._fetchData.bind(this)
        });
        return;
      }

      this.el.innerHTML = this.template({
        countries: this.collection.toJSON()
      });
    }

  });

}).call(this, this.App);
