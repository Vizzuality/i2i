(function (App) {

  App.View.IndicatorSelection = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-selection'],

    initialize: function (options) {
      this.indicatorsCollection = options.indicatorsCollection;
    },

    render: function () {
      this.el.innerHTML = this.template({
        indicators: this.indicatorsCollection.toJSON()
      });

      return this.$el.html();
    }

  });
}).call(this, this.App);
