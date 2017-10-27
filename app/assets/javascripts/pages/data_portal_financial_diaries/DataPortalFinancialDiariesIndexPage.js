(function (App) {
  'use strict';

  App.Page.DataPortalFinancialDiariesIndexPage = Backbone.View.extend({

    el: 'body',

    defaults: {
      filters: {
        // can be households or individuals
        type: 'households',
        categories: [],
        demography: [
          {
            group: 'gender',
            value:'all'
          },
          {
            group: 'age',
            value:'all'
          }
        ]
      }
    },

    initialize: function(options) {
      this.filters = Object.assign(
        {},
        this.defaults.filters,
        options.filters,
        { categories: options.filters.categories || gon.selectedCategories }
      );

      this.iso = options.iso;
      this.year = options.year;

      if (this.filterView) {
        this.filterView.removeEventListener();
        this.demographicFiltersView.removeEventListener();
      } else {
        this.filterView = new App.Component.GroupedMenu({
          el: $('.js-filters')
        });

        this.demographicFiltersView = new App.Component.GroupedMenu({
          el: $('.js-demographic-filters')
        });
      }

      this._setVars();
      this._removeEventListeners();
      this._setEventListeners();
      this._loadCharts();
    },

    _setVars: function() {
      this.router = App.Router.FinancialDiaries;
      this.categories = document.querySelectorAll('.js-category-child-option') || [];
      this.demographicOptions = document.querySelectorAll('.js-demographic-child-option') || [];
      this.tabs = document.querySelectorAll('.js-content-tab') || [];
      this.visibilityCheckboxes = document.querySelectorAll('.js-category-visibility') || [];
      this.removeHouseholdButton = document.querySelector('.js-remove-household');

      // bindings
      this.onClickCategoryBinded = function(e) {
        this._onClickCategory(e);
      }.bind(this);

      this.onChangeVisibilityBinded = function(e) {
        this._onChangeVisibility(e);
      }.bind(this);

      this.onClickDemographicFilterBinded = function(e) {
        this._onClickDemographicFilter(e);
      }.bind(this);

      this.onClickRemoveHouseholdBinded = function() {
        this._onRemoveHousehold();
      }.bind(this);

      this.getPreviousScroll = function() {
        window.prevPageYOffset = window.pageYOffset;
        window.prevPageXOffset = window.pageXOffset;
      };

      this.setPreviousScroll = function() {
        window.scrollTo(window.prevPageXOffset, window.prevPageYOffset);
      };
    },

    _removeEventListeners: function() {
      $(this.categories).off('click');
      $(this.visibilityCheckboxes).off('click');
      $(this.demographicOptions).off('click');
      $(this.removeHouseholdButton).off('click');

      this.tabs.forEach(function(tab) {
        $(tab).off('click');
      });

      $(document).off('turbolinks:request-start');
      $(document).off('turbolinks:load');
    },

    _setEventListeners: function() {
      $(this.categories).on('click', this.onClickCategoryBinded);
      $(this.visibilityCheckboxes).on('click', this.onChangeVisibilityBinded);
      $(this.demographicOptions).on('click', this.onClickDemographicFilterBinded);
      $(this.removeHouseholdButton).on('click', this.onClickRemoveHouseholdBinded);

      // allows to keep scroll position after Turbolinks render the new page
      $(document).on('turbolinks:request-start', this.setPreviousScroll);
      $(document).on('turbolinks:load', this.setPreviousScroll);

      this.tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
          this._onClickTab(e);
        }.bind(this));
      }.bind(this));
    },

    _onChangeVisibility: function(e) {
      e.stopPropagation();

      var $checkbox = $(e.currentTarget);
      var categoryType = $checkbox.val();
      var isVisible = $checkbox[0].checked;
      var categories = [].concat(this.filters.categories);
      var index = _.findIndex(categories, { type: categoryType });

      if (index !== -1) {
        categories[index] = Object.assign({}, categories[index], { visible: isVisible });
      } else {
        // if the category is not already selected, it will be selected and displayed by default
        categories.push({
          type: categoryType,
          subcategory: null,
          visible: true
        });
      }

      this._updateFilters({ categories: categories });
    },

    _onClickCategory: function (e) {
      e && e.preventDefault() && e.stopPropagation();

      var categoryOption = e.currentTarget;
      var parentCategory = categoryOption.getAttribute('data-parent');
      var category = categoryOption.getAttribute('data-category');
      var categories = [].concat(this.filters.categories);
      var newCategoryObject = {
        type: parentCategory || null,
        subcategory: category,
        visible: true
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
            categories[index] = Object.assign({}, newCategoryObject);
          }
        }
      }

      this.filterView.closeMenu();
      this._updateFilters({ categories: categories });
    },

    _onClickDemographicFilter: function(e) {
      var $filterOption = $(e.currentTarget);
      var group = $filterOption.data('parent');
      var value = $filterOption.data('value');
      var demographicFilters = [].concat(this.filters.demography);
      var newDemographicFilter = {
        group: group,
        value: value
      };

      var index = _.findIndex(demographicFilters, { group: group });

      if(index !== -1) {
        demographicFilters[index] = newDemographicFilter;
      } else {
        demographicFilters.push(newDemographicFilter);
      }

      this._updateFilters({ demography: demographicFilters });
    },

    _onRemoveHousehold: function () {
      this._updateFilters({ household: null });
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

      Turbolinks.visit(newURL);
    },

    _loadCharts: function() {
      var capitalize = App.Helper.Utils.capitalize;
      var household = this.filters.household || null;
      var categories = (this.filters.categories || [])
        .filter(function(cat) { return cat.visible })
        .map(function(category) {

          if (category.subcategory) {
            return {
              category_type: category.type,
              subcategory: category.subcategory || null
            }
          }

          return {
            category_type: category.type,
            category_name: 'ALL'
          };
        });

      // common params for all charts
      var params = {
        project_name: gon.project_name,
        categories: window.encodeURIComponent(JSON.stringify(categories)),
        api: FD_API_URL
      };

      var mainChartTitle = categories.map(function(cat) {
        return capitalize(cat.category_type);
      }).join(', ');

      if(!household) {
        // renders main chart
        new App.View.MainChartView({
          params: Object.assign(
            params,
            { title: mainChartTitle }
          ),
          onClick: function(household) {
            if(!household) return;
            this._updateFilters({ household: household });
          }.bind(this)
        });
      } else {
        // renders main chart with household detail
        new App.View.MainChartHouseholdView({
          params: Object.assign(
            params,
            { household: household },
            { title: mainChartTitle }
          )
        });
      }


      var groupedBarTitle = categories.map(function(cat) {
        return capitalize(cat.category_type);
      }).join(', ') + " by type";

      new App.View.GroupedBarView({
        params: Object.assign(
          params,
          { categories: window.encodeURIComponent(JSON.stringify(categories.map(function(cat) {
            return { category_type: cat.category_type };
          })))},
          // temporary patch. REMOVE ASAP
          { title: 'Savings by type' || groupedBarTitle }
        )
      });
    }
  });

}).call(this, this.App);
