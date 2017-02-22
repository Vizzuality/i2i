(function (App) {
  'use strict';

  var Collection = Backbone.Collection.extend({
    // TODO
    parse: function (data) {
      return data;
    }
  });

  // TODO: remove once API
  var mockupData = [
    {
      iso: 'TZA',
      name: 'Tanzania',
      latestYear: 2016
    },
    {
      iso: 'KEN',
      name: 'Kenya',
      latestYear: 2015
    },
    {
      iso: 'IND',
      name: 'India',
      latestYear: 2016
    },
    {
      iso: 'BGD',
      name: 'Bangladesh',
      latestYear: 2014
    },
    {
      iso: 'NGA',
      name: 'Nigeria',
      latestYear: 2015
    },
    {
      iso: 'UGA',
      name: 'Uganda',
      latestYear: 2016
    }
  ];

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: '.js-countries',

    template: JST['templates/data_portal/index-page'],

    initialize: function () {
      this.collection = new Collection(mockupData);
      this.fetchData()
        .done(this.render.bind(this))
        .fail(this.renderError.bind(this));
    },

    /**
     * Fetch the Collection
     * @returns {object} $.Deferred
     */
    fetchData: function () {
      // TODO: remove this code once the API is available
      var deferred = $.Deferred();
      deferred.resolve({ toBe: 'removed' });
      return deferred;

      // return this.collection.fetch();
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
