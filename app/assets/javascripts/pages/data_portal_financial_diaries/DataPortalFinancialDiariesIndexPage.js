(function (App) {
  'use strict';

  App.Page.DataPortalFinancialDiariesIndexPage = Backbone.View.extend({

    el: 'body',

    defaults: {
      filters: {
        // can be households or individuals
        type: 'households',
        categories: [],
        subFilters: []
      },
      selectors: {
        mainChart: '#vis-main-chart-',
        mainChartMobile: '#vis-main-chart-mobile-',
        detailsChart: '#vis-main-chart-details-',
      },
      specs: {
        households: {
          mainChart: {
            spec: App.Specs.Households.MainChart,
            shareOption: 'households/main-chart'
          },
          mainChartMobile: {
            spec: App.Specs.Households.MainChartMobile,
            shareOption: 'households/main-chart-mobile'
          },
          mainChartSecondary:  {
            spec: App.Specs.Households.MainChartDetails,
            shareOption: 'households/main-chart-details'
          },
          secondaryChart: {
            spec: App.Specs.Households.GroupedBarChart,
            shareOption: 'households/grouped-bar-chart'
          }
        },
        individuals: {
          mainChart: {
            spec: App.Specs.Individuals.MainChart,
            shareOption: 'individuals/main-chart'
          },
          mainChartMobile: {
            spec: App.Specs.Individuals.MainChartMobile,
            shareOption: 'individuals/main-chart-mobile'
          },
          mainChartSecondary: {
            spec: App.Specs.Individuals.MainChartDetails,
            shareOption: 'individuals/main-chart-details'
          },
          secondaryChart: {
            spec: App.Specs.Individuals.GroupedBarChart,
            shareOption: 'individuals/grouped-bar-chart'
          }
        }
      }
    },

    initialize: function(options) {
      this.filters = Object.assign(
        {},
        this.defaults.filters,
        options.filters,
        { categories: options.filters.categories || gon.selectedCategories },
        { subFilters: options.filters.subFilters || gon.selectedSubFilters }
      );

      this.iso = options.iso;
      this.year = options.year;
      this.selectors = this.defaults.selectors;

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

      new App.Component.CountryPreview({
        onChangeCountry: function(iso) {
          Turbolinks.visit('/data-portal/' + iso + '/financial-diaries');
        }
      })

      this._setVars();
      this._removeEventListeners();
      this._setEventListeners();
      this._loadCharts(this.filters.type);
    },

    _setVars: function() {
      this.router = App.Router.FinancialDiaries;
      this.categories = document.querySelectorAll('.js-category-child-option') || [];
      this.demographicOptions = document.querySelectorAll('.js-demographic-child-option') || [];
      this.tabs = document.querySelectorAll('.js-content-tab') || [];
      this.visibilityCheckboxes = document.querySelectorAll('.js-category-visibility') || [];
      this.removeHouseholdButton = document.querySelector('.js-remove-household');
      this.toggleMobileFiltersButton = document.querySelector('.js-toggle-filters');
      this.contentVeil = document.querySelector('.js-content-veil');

      // bindings
      this.onClickCategoryBinded = function(e) {
        this._onClickCategory(e);
      }.bind(this);

      this.onChangeVisibilityBinded = function(e) {
        this._onChangeVisibility(e);
      }.bind(this);

      this.onClickDemographicFilterBinded = function(e) {
        this._onClickFilter(e);
      }.bind(this);

      this.onClickRemovedetailsChartBinded = function() {
        this._onRemoveDetailsChart();
      }.bind(this);
    },

    _removeEventListeners: function() {
      $(this.categories).off('click');
      $(this.visibilityCheckboxes).off('click');
      $(this.demographicOptions).off('click');
      $(this.removeHouseholdButton).off('click');
      $(this.tabs).off('click');
    },

    _setEventListeners: function() {
      $(this.categories).on('click', this.onClickCategoryBinded);
      $(this.visibilityCheckboxes).on('click', this.onChangeVisibilityBinded);
      $(this.demographicOptions).on('click', this.onClickDemographicFilterBinded);
      $(this.removeHouseholdButton).on('click', this.onClickRemovedetailsChartBinded);
      $(this.toggleMobileFiltersButton).on('click', this._onToggleMobileFilters.bind(this));
      $(this.tabs).on('click', this._onClickTab.bind(this));
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

    _onClickFilter: function(e) {
      var $filterOption = $(e.currentTarget);
      var type = $filterOption.data('parent');
      var value = $filterOption.data('value');
      var subFilters = [].concat(this.filters.subFilters);
      var newFilter = {
        type: type,
        value: value
      };

      var index = _.findIndex(subFilters, { type: type });

      if(index !== -1) {
        subFilters[index] = newFilter;
      } else {
        subFilters.push(newFilter);
      }

      this._updateFilters({ subFilters: subFilters });
    },

    _onRemoveDetailsChart: function () {
      this._updateFilters({ detailsChart: null });
    },

    _onClickTab: function(e) {
      var type = e.currentTarget.getAttribute('data-type');
      this._updateFilters({
        type: type,
        subFilters: [],
        detailsChart: null
       });
    },

    _onToggleMobileFilters: function() {
      this.toggleMobileFiltersButton.classList.toggle('-open');
      this.contentVeil.classList.toggle('-open');
    },

    _updateFilters: function(newFilters) {
      var prevFilters = Object.assign({}, this.filters);
      this.filters = Object.assign({}, this.filters, newFilters);
      var filtersAreEqual = _.isEqual(prevFilters, this.filters);
      if (!filtersAreEqual) this._onUpdateURLParams();
    },

    _onUpdateURLParams: function() {
      var pathname = Backbone.history.location.pathname;
      var encodedParams = window.btoa(JSON.stringify(this.filters));
      var newURL = pathname + '?p=' + encodedParams;

      Turbolinks.visit(newURL);
    },

    _getCategories: function() {
      return (this.filters.categories || [])
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
    },

    _getSubFiltersString: function() {
      var subFiltersString = '';
      var subFilters = (this.filters.subFilters || [])
        .filter(function(filter) { return filter.value !== 'all' });
      _.each(subFilters, function(f, index) {
          var filterString = '';
          filterString += '&' + f.type + '=' + f.value;
          if(index < this.filters.subFilters.length && this.filters.subFilters.lenght > 1) filterString += '&'
          subFiltersString += filterString;
        }.bind(this));

      return subFiltersString;
    },

    _loadCharts: function(type) {
      var categories = this._getCategories();
      var subFiltersString = this._getSubFiltersString();

      // common params for all charts
      var params = {
        project_name: gon.project_name,
        categories: window.encodeURIComponent(JSON.stringify(categories)),
        subFilters: subFiltersString,
        api: FD_API_URL
      };

      var specs = this.defaults.specs[type];

      var capitalize = App.Helper.Utils.capitalize;
      var detailsChart = this.filters.detailsChart || null;
      var label = type === 'households' ? 'Household' : 'Individual';
      var detailsChartTitle = detailsChart ? '(' + label + ': ' + detailsChart + ')' : '';

      var mainChartTitle = categories.map(function(cat) {
        return cat.subcategory ? capitalize(cat.subcategory) : capitalize(cat.category_type);
      }).join(', ');

      if(!detailsChart) {
        var isTabletOrHigher = window.innerWidth >= 768;
        var el = isTabletOrHigher ?
          document.querySelector(this.selectors.mainChart + type) : document.querySelector(this.selectors.mainChartMobile + type);
        var shareOption = isTabletOrHigher ? specs.mainChart.shareOption : specs.mainChartMobile.shareOption;
        var spec = isTabletOrHigher ? specs.mainChart.spec : specs.mainChartMobile.spec;

        var onClickHousehold = function(detailsChart) {
          if(!detailsChart) return;
          this._updateFilters({ detailsChart: detailsChart });
        }.bind(this);

        // renders main chart
        new App.View.MainChartView({
          params: Object.assign(
            {},
            params,
            { title: mainChartTitle },
            { household: detailsChart }
          ),
          el: el,
          shareOptions: {
            spec: shareOption,
            customClass: '-main',
            onClick: function(detailsChart) {
              onClickHousehold(detailsChart);
              window.scrollTo(0, 0);
            }
          },
          spec: spec,
          onClick: onClickHousehold
        });
      } else {
        // renders main chart with household detail
        new App.View.MainChartDetails({
          params: Object.assign(
            {},
            params,
            { household: detailsChart },
            { title: mainChartTitle + ' ' + detailsChartTitle }
          ),
          el: document.querySelector(this.selectors.detailsChart + type),
          shareOptions: {
            spec: specs.mainChartSecondary.shareOption
          },
          spec: specs.mainChartSecondary.spec
        });
      }

      // renders charts by indicator
      _.each(categories, function(category) {
        new App.View.GroupedBarView({
          params: Object.assign(
            {},
            params,
            { title: capitalize(category.category_type) + ' by type' + ' ' + detailsChartTitle },
            { categories: window.encodeURIComponent(JSON.stringify([{ category_type: category.category_type }])) },
            { household: detailsChart || '' }
          ),
          el: document.querySelector('#vis-secondary-chart-' + category.category_type),
          shareOptions: {
            spec: specs.secondaryChart.shareOption
          },
          spec: specs.secondaryChart.spec
        });
      });
    }
  });

}).call(this, this.App);
