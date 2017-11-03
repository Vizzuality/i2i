(function (App) {
  App.View.Cards = Backbone.View.extend({

    el: '.js-masonry-cards',

    options: {
      itemSelector: '.js-masonry-item'
    },

    initialize: function () {
      if (!this.el) return;
      this.$el.masonry(this.options);
    }

  });
}).call(this, this.App);
