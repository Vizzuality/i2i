(function (App) {
  App.View.Footer = Backbone.View.extend({

    el: '.c-footer',

    initialize: function () {
      if (!this.el) return;
      var refElem = this.el.querySelector('.js-toggle-tooltip');
      new App.View.SocialTooltip({ refElem: refElem, direction: 'top' });
    }

  });
}).call(this, this.App);
