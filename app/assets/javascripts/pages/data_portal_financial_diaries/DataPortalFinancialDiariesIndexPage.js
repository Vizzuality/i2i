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
      this.filters = Object.assign({}, this.defaults.filters, options.filters);
      this.iso = options.iso;
      this.year = options.year;

      this._setVars();
      this._setEventListeners();

      // set URL params
      this._onUpateURLParams();
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
      var categoryOption = e.currentTarget;
      var parentCategory = categoryOption.getAttribute('data-parent');
      var category = categoryOption.getAttribute('data-category');
      this._updateFilters({
        category: {
          parent: parentCategory || null,
          category: category
        }
      });
    },

    _updateFilters: function(newFilters) {
      this.filters = Object.assign({}, this.filters, newFilters);
      this._onUpateURLParams();
      this._onFilterData();
    },

    _onUpateURLParams: function() {
      var pathname = Backbone.history.location.pathname;

      var encodedParams = window.btoa(JSON.stringify(this.filters));
      var newURL = pathname + '?p=' + encodedParams;
      this.router.navigate(newURL, { replace: true });
    },

    _onFilterData: function() {
      var pathname = Backbone.history.location.pathname;

      var encodedParams = window.btoa(JSON.stringify(this.filters));
      var newURL = pathname + '?p=' + encodedParams;

      $.ajax(newURL, {});
    }

  });

}).call(this, this.App);
