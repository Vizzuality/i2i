(function (App) {
  App.View.Footer = Backbone.View.extend({

    el: '.c-footer',

    initialize: function () {
      this._setVars();
      this._setEventListeners();
    },

    _setVars: function () {
      this.body = document.querySelector('body');
      this.refElem = this.el.querySelector('.js-toggle-tooltip');
      this.socialTooltip = new App.View.SocialTooltip({ refElem: this.refElem });
    },

    _setEventListeners: function () {
      this.refElem.addEventListener('mouseenter', function () {
        if (this.body.contains(this.socialTooltip.el)) {
          if (this.socialTooltip.isHidden()) {
            this.socialTooltip.showTooltip();
          } else {
            this.socialTooltip.hideTooltip();
          }
        } else {
          this.socialTooltip.render();
        }
      }.bind(this));

      this.refElem.addEventListener('mouseleave', function () {
        this.socialTooltip.hideTooltip();
      }.bind(this));
    }
  });
}).call(this, this.App);
