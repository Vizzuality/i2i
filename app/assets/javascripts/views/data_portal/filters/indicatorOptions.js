(function (App) {

  App.View.IndicatorOptions = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-options'],

    initialize: function (options) {
      this.indicatorsCollection = options.indicatorsCollection;
    },

    render: function () {
      var filteredIndicators = _.filter(this.indicatorsCollection.toJSON(),
        function (indicator) { return indicator.filtered; });

      this.el.innerHTML = this.template({
        indicators: filteredIndicators
      });

      return this.$el.html();
    }

  });
}).call(this, this.App);
