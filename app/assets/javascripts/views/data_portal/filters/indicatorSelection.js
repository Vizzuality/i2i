(function (App) {

  var indicators = [
    {
      id: 0,
      name: 'gender'
    },
    {
      id: 2,
      name: 'age'
    },
    {
      id: 0,
      name: 'marital status'
    }
  ];

  App.View.IndicatorSelection = Backbone.View.extend({

    template: JST['templates/data_portal/modals/filters-indicator-selection'],

    render: function () {
      this.el.innerHTML = this.template({
        indicators: indicators
      });

      return this.$el.html();
    }

  });
}).call(this, this.App);
