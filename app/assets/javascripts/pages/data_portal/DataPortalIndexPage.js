(function (App) {
  'use strict';

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor'
    },

    // template: JST['templates/data_portal/index-page'],

    // initialize: function () {
    //   this.collection = new App.Collection.CountriesCollection();
    //   this._fetchData();
    // },

    /**
     * Fetch the Collection
     */
    // _fetchData: function () {
    //   // The first time we render to have the placeholder flags
    //   this.render();

    //   this.collection.fetch()
    //     .done(function () {
    //       this._loadingError = false;
    //     }.bind(this))
    //     .fail(function () {
    //       this._loadingError = true;
    //     }.bind(this))
    //     .always(this.render.bind(this));
    // },

    _onClickAnchor: function (e) {
      e.preventDefault();
      var target = e.currentTarget.getAttribute('href');

      $('html, body').animate({
        scrollTop: $(target).offset().top
      });
    }

    // render: function () {
    //   if (this._loadingError) {
    //     new App.View.RetryMessageView({
    //       el: this.$el.find('.js-countries'),
    //       label: 'Unable to load the countries',
    //       callback: this._fetchData.bind(this)
    //     });
    //     return;
    //   }


    //   this.$el.find('.js-countries').html(this.template({
    //     countries: this.collection.toJSON()
    //   }));
    // }

  });

}).call(this, this.App);
