(function (App) {
  App.View.HomePageSlider = Backbone.View.extend({

    el: '.rslides',

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
