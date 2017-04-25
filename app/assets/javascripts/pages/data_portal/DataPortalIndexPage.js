(function (App) {
  'use strict';

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: '.js-countries',

    template: JST['templates/data_portal/index-page'],

    initialize: function () {
      this.collection = new App.Collection.CountriesCollection();
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
