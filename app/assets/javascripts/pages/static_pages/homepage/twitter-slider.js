(function (App) {
  App.View.HomePageTwitterSlider = Backbone.View.extend({

    el: '.js-twitter-slider',

    options: {
        auto: false,
        nav: true,
        speed: 500,
        namespace: "buttons",
        prevText: "Previous",
        nextText: "Next"
    },

    initialize: function () {
      if (!this.el) return;
      this.$el.responsiveSlides(this.options);
    }

  });
}).call(this, this.App);