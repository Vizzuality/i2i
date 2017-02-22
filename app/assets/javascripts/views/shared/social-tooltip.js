(function (App) {

  App.View.SocialTooltip = App.Component.Tooltip.extend({

    content: JST['templates/shared/social-tooltip'],

    initialize: function (options) {
      this.refElem = options.refElem;
      this.constructor.__super__.initialize.call(this, options);
    },
    _showTooltip: function () {
      this.constructor.__super__.showTooltip.apply(this);
    },

    render: function () {
      this.position = this.constructor.__super__.getPosition();
      this.constructor.__super__.render.apply(this);
      this._showTooltip();
    }
  });
}).call(this, this.App);
