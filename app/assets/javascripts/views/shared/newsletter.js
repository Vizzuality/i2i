(function (App) {

  App.View.Newsletter = Backbone.View.extend({

    el: '.js-subscribe',

    events: {
      'click' : '_onClickSubscribe'
    },

    _onClickSubscribe: function () {
      new App.View.NewsletterModalView();
    }

  });
}).call(this, this.App);
