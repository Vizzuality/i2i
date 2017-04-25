(function (App) {
  App.View.FiltersTooltipView = App.Component.Tooltip.extend({

    content: JST['templates/data_portal/filters-tooltip'],

    _getContent: function () {
      return this.content({
        direction: '-' + this.options.direction,
        filters: this.options.filters
      })
    },

    render: function () {
      App.Component.Tooltip.prototype.render.apply(this);
      // var tooltipContent = this.el.querySelector('.c-filters-tooltip');
      // tooltipContent.setAttribute('role', 'dialog');
      // tooltipContent.setAttribute('aria-label', 'social links');
    }
  });
}).call(this, this.App);
