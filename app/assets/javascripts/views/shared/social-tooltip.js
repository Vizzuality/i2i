(function (App) {
  App.View.SocialTooltip = App.Component.Tooltip.extend({

    content: JST['templates/shared/social-tooltip'],

    initialize: function (options) {
      this.refElem = options.refElem;
      this.constructor.__super__.initialize.call(this, options);

      this._setVars();
    },

    _setVars: function () {
      this.constructor.__super__._setVars();
      this.parentView = this.constructor.__super__;
    },

    render: function () {
      this.parentView.render.apply(this);
      var tooltipContent = this.el.querySelector('.c-social-tooltip');
      tooltipContent.setAttribute('role', 'dialog');
      tooltipContent.setAttribute('aria-label', 'social links');
    }
  });
}).call(this, this.App);
