(function (App) {
  'use strict';

  var Collection = Backbone.Collection.extend({
    url: API_URL + '/country?lastyear=true',
    parse: function (data) {
      return data.map(function (country) {
        return {
          iso: country.iso,
          name: country.name,
          latestYear: country.year[0].year
        };
      });
    }
  });

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: '.js-countries',

    template: JST['templates/data_portal/index-page'],

    events: {
      'click .js-retry': '_fetchData'
    },

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
      this.el.innerHTML = this.template({
        error: this._loadingError,
        countries: this.collection.toJSON()
      });

      this.setElement(this.el);
    }

  });

}).call(this, this.App);
