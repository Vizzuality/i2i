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
      this._indicators.forEach(function (indicator) {
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

      return this._indicators;
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this._getFilteredIndicators()
      }));

      return this;
    }

  });
}.call(this, this.App));
