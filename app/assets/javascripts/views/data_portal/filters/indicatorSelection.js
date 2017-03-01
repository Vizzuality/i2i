(function (App) {

  App.View.IndicatorSelection = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-selection'],

    initialize: function (options) {
      this.indicatorsCollection = options.indicatorsCollection;
      this.filters = options.filters;
    },

    render: function () {
      var indicators = this.indicatorsCollection.clone();

      _.each(this.filters, function (filter) {
        indicators.find(function (_indicator) { return _indicator.get('name') === filter.name; })
          .set('filtered', true);
      });

      this.el.innerHTML = this.template({
        indicators: indicators.toJSON()
      });

      return this.$el.html();
    }

  });
}).call(this, this.App);
