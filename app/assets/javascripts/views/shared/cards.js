(function (App) {
  App.View.Cards = Backbone.View.extend({

    el: '.masonry-cards',

    options: {
      itemSelector: '.masonry-item'
    },

    initialize: function () {
      if (!this.el) return;
      this.$el.masonry(this.options);
    }

  });
}).call(this, this.App);
