(function (App) {

  App.View.IndicatorOptions = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-options'],

    render: function () {
      this.el.innerHTML = this.template({});

      return this.$el.html();
    }

  });
}).call(this, this.App);
