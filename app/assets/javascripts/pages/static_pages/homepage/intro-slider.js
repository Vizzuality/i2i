(function (App) {
  App.View.HomePageIntroSlider = Backbone.View.extend({

    el: '.js-intro-slider',

    options: {
      auto: true,
      speed: 3000
    },

    initialize: function () {
      if (!this.el) return;
      this.$el.responsiveSlides(this.options);
    }

  });
}).call(this, this.App);
