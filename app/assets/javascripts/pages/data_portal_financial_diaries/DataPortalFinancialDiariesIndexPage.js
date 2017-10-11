(function (App) {
  'use strict';

  App.Page.DataPortalFinancialDiariesIndexPage = Backbone.View.extend({

    defaults: {
      filters: {
        // can be households or individuals
        type: 'households',
        categories: [
          {
            type: (gon.categories[0] || {}).name,
            subcategory: null
          }
        ]
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
      this.tabs = document.querySelectorAll('.js-content-tab') || [];
    },

    _setEventListeners: function() {
      this.categories.forEach(function(category) {
        category.addEventListener('click', function(e) {
          this._onClickCategory(e);
        }.bind(this));
      }.bind(this));

      this.tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
          this._onClickTab(e);
        }.bind(this));
      }.bind(this));
    },

    _onClickCategory: function (e) {
      var categoryOption = e.currentTarget;
      var parentCategory = categoryOption.getAttribute('data-parent');
      var index = +categoryOption.getAttribute('data-index');
      var category = categoryOption.getAttribute('data-category');
      var categories = this.filters.categories;
      var newCategoryObject = {
        type: parentCategory || null,
        subcategory: category
      };

      if(!categories.length) {
        categories.push(newCategoryObject);
      } else {
        var categoryTypeExists = categories.find(function(cat) {
          return cat.type === newCategoryObject.type;
        });

        // It doesn't exist any category with this type. We simply add it.
        if (!categoryTypeExists) categories.push(newCategoryObject)

        if (categoryTypeExists) {
          var index = _.findIndex(categories, { type: newCategoryObject.type });

          // the user is clicking on the same category. We remove it.
          if (_.isEqual(categories[index], newCategoryObject)) {
            categories.splice(index, 1);
          } else {
            // this is a new subcategory. We replace the current one.
            categories[index] = newCategoryObject;
          }
        }
      }

      this._updateFilters({ categories: categories });
    },

    _onClickTab: function(e) {
      var type = e.currentTarget.getAttribute('data-type');
      this._updateFilters({ type: type });
    },

    _updateFilters: function(newFilters) {
      var prevFilters = Object.assign({}, this.filters);
      this.filters = Object.assign({}, this.filters, newFilters);
      var filtersAreEqual = _.isEqual(prevFilters, this.filters);
      if (!filtersAreEqual) this._onUpateURLParams();
    },

    _onUpateURLParams: function() {
      var pathname = Backbone.history.location.pathname;

      var encodedParams = window.btoa(JSON.stringify(this.filters));
      var newURL = pathname + '?p=' + encodedParams;
      this.router.navigate(newURL, { replace: true });

      // sends filters to server in order to get filtered data
      $.ajax(newURL, {});
    }

  });

}).call(this, this.App);
