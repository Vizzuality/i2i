(function (App) {

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    defaults: {
      // List of indicators
      indicators: []
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      // Filter out the non visible widgets and and copy the entire object to
      // avoid mutations of the original one
      this.options.indicators = this.options.indicators
        .filter(function (indicator) { return indicator.visible && indicator.options && indicator.options.length; })
        .map(function (indicator) {
          return {
            name: indicator.name,
            id: indicator.id,
            options: Array.prototype.slice.call(indicator.options, 0)
          };
        });

      // sorts indicator array by indicator name
      this.options.indicators.sort(function (a, b) {
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
      this.options.indicators.forEach(function (indicator) {
        var isFiltered = _.findWhere(this.filters, { id: indicator.id });

        // We filter to remove the options that don't have a label
        // Here we assume that all the options that don't are options of a strand
        // indicator
        // Strand indicators have each answer duplicated, but with different values:
        // one for the people who selected the answer, the other for the people who didn't
        indicator.options = indicator.options.filter(function (option) {
          return option.length;
        }).map(function (option, index) {
          return {
            name: option,
            filtered: isFiltered && isFiltered.options.indexOf(option) !== -1
          };
        });
      }.bind(this));

      return this.options.indicators;
    },

    // TODO
    getData: function () {
      return [];
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this._getFilteredIndicators()
      }));

      return this;
    }

  });
}.call(this, this.App));
