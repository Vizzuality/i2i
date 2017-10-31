(function (App) {

  App.View.Newsletter = Backbone.View.extend({

    el: '.js-subscribe',

    events: {
      'click .js-subscribe-link' : '_onClickSubscribe'
    },

    _onClickSubscribe: function (e) {
      new App.View.NewsletterModalView(e.target.dataset);
    }

  });
}).call(this, this.App);
