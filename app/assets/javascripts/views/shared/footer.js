(function (App) {
  App.View.Footer = Backbone.View.extend({

    el: '.c-footer',

    initialize: function () {
      var refElem = this.el.querySelector('.js-toggle-tooltip');
      new App.View.SocialTooltip({ refElem: refElem });
    }

  });
}).call(this, this.App);
