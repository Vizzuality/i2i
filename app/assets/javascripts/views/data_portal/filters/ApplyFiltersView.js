(function (App) {

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    initialize: function (options) {
      this.indicators = options.indicators;
      this.filters = options.filters;
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this.indicators
      }));

      return this;
    }

  });
}.call(this, this.App));
