(function (App) {

  App.View.IndicatorOptions = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-options'],

    initialize: function (options) {
      this.filters = options.filters;
    },

    render: function () {
      this.el.innerHTML = this.template({
        indicators: this.filters
      });

      return this.$el.html();
    }

  });
}).call(this, this.App);
