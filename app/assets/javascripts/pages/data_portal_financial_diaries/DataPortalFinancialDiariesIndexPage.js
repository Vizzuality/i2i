(function (App) {
  'use strict';

  App.Page.DataPortalFinancialDiariesIndexPage = Backbone.View.extend({

    defaults: {
      filters: {
        // can be households or individuals
        type: 'households'
      }
    },

    initialize: function(options) {
      this.filters = Object.assign({}, this.defaults.filters);
      this.iso = options.iso;
      this.year = options.year;

      this._setVars();
      this._setEventListeners();
    },

    _setVars: function() {
      this.router = App.Router.FinancialDiaries;
      this.categories = document.querySelectorAll('.js-category-option') || [];
    },

    _setEventListeners: function() {
      this.categories.forEach(function(category) {
        category.addEventListener('click', function(e) {
          this._onClickCategory(e);
        }.bind(this));
      }.bind(this));
    },

    _onClickCategory: function (e) {
      var category = e.currentTarget.getAttribute('data-category');
      this._onUpateURLParams({ category: category });
    },

    _onUpateURLParams: function(newParams) {
      var pathname = Backbone.history.location.pathname;
      var currentParams = (Backbone.history.location.search.slice(1).split('=') || [])[1] || '';

      var parsedParams = currentParams !== '' ?
        JSON.parse(window.atob(currentParams)) : {};
      var encodedParams = window.btoa(JSON.stringify(Object.assign({}, parsedParams, newParams)));
      var newURL = pathname + '?p=' + encodedParams;
      this.router.navigate(newURL, { replace: true });

      // We send the request to the server in order to
      // get the filtered data.
      $.ajax(newURL, {});
    }

  });

}).call(this, this.App);
