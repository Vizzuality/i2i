(function (App) {

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    initialize: function (options) {
      this.indicators = options.indicators;
      this.filters = options.filters;
    },

    _getFilteredIndicators: function () {
      var filteredIndicators = this.indicators;

      filteredIndicators.forEach(function (indicator) {
        var filteredIndicator = _.findWhere(this.filters, { id: indicator.id });
        var filters = [];

        console.log(indicator.options);

        indicator.options.forEach(function (option) {
          filters.push({
            name: option,
            filtered: filteredIndicator !== undefined
          });
        });

        indicator.options = filters;
      });

      console.log(filteredIndicators);

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
