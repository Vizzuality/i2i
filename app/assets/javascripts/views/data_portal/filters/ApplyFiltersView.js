(function (App) {

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    initialize: function (options) {
      // clones array with an object array inside
      this._indicators = options.indicators.map(function (indicator) {
        return {
          name: indicator.name,
          id: indicator.id,
          options: Array.prototype.slice.call(indicator.options, 0)
        };
      });

      // sorts indicator array by indicator name
      this._indicators.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }

        return 0;
      });

      this.filters = options.filters;
    },

    _getFilteredIndicators: function () {
      var filteredIndicators = this._indicators;

      filteredIndicators.forEach(function (indicator) {
        var isFiltered = _.findWhere(this.filters, { id: indicator.id });
        var filters = [];

        if (isFiltered === undefined) {
          indicator.options.forEach(function (option) {
            filters.push({
              name: option,
              filtered: false
            });
          });
        } else {
          indicator.options.forEach(function (option, index) {
            filters.push({
              name: option,
              filtered: isFiltered.options.indexOf(option) !== -1
            });
          });
        }

        indicator.options = filters;
      }.bind(this));

      return filteredIndicators;
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this._getFilteredIndicators()
      }));

      return this;
    }

  });
}.call(this, this.App));
