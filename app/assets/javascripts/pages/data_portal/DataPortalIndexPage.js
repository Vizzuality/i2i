(function (App) {
  'use strict';

  var Collection = Backbone.Collection.extend({
    url: API_URL + '/country',
    parse: function (data) {
      return data.map(function (country) {
        return {
          iso: country.iso,
          name: country.name,
          latestYear: country.year.year
        };
      });
    }
  });

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: '.js-countries',

    template: JST['templates/data_portal/index-page'],

    initialize: function () {
      this.collection = new Collection();
      this.fetchData()
        .done(this.render.bind(this))
        .fail(this.renderError.bind(this));
    },

    /**
     * Fetch the Collection
     * @returns {object} $.Deferred
     */
    fetchData: function () {
      return this.collection.fetch();
    },

    render: function () {
      this.el.innerHTML = this.template({ countries: this.collection.toJSON() });
    },

    renderError: function () {
      // TODO
      console.error('Error loading country list');
    }

  });

}).call(this, this.App);
