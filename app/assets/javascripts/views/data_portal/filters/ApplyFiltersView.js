(function (App) {

   // This object is used to detect the category of the indicators without having to repeat
  // the exact name
  // NOTE: this object is duplicated in ChartWidgetView and ApplyFiltersView; make sure to
  // update both of them
  var CATEGORIES = {
    COMMON: 'Common Indicators',
    STRAND: 'Financial Access'
  };

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    defaults: {
      // List of indicators
      indicators: [],
      // List of the filters
      filters: []
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      // Filter out the non visible and the strand indicators and copy the entire object to
      // avoid mutations of the original one
      this.options.indicators = this.options.indicators
        .filter(function (indicator) { return indicator.visible && indicator.category !== CATEGORIES.STRAND && indicator.options && indicator.options.length; })
        .map(function (indicator) {
          return {
            name: indicator.name,
            id: indicator.id,
            options: Array.prototype.slice.call(indicator.options, 0)
          };
        })
        .sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
    },

    _getFilteredIndicators: function () {
      this.options.indicators.forEach(function (indicator) {
        var isFiltered = _.findWhere(this.options.filters, { id: indicator.id });
        indicator.options = indicator.options.map(function (option, index) {
          return {
            name: option,
            filtered: isFiltered && isFiltered.options.indexOf(option) !== -1
          };
        });
      }.bind(this));

      return this.options.indicators;
    },

    getData: function () {
      var options = document.querySelectorAll('.js-option');
      options = Array.prototype.slice.call(options);

      var filtersGroup = _.groupBy(options, function (option) {
        return option.dataset.indicator;
      });

      return Object.keys(filtersGroup)
        .map(function(indicatorId) {
          var indicator = _.findWhere(this.options.indicators, { id: indicatorId });
          return {
            id: indicatorId,
            name: indicator.name,
            options: filtersGroup[indicatorId]
              .filter(function (option) { return option.checked; })
              .map(function (option) { return option.value; })
          };
        }, this)
        .filter(function (filter) {
          return filter.options.length;
        });
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this._getFilteredIndicators()
      }));

      return this;
    }

  });
}.call(this, this.App));
