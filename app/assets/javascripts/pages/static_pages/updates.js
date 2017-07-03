(function (App) {

  App.Page.UpdatesPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor'
    },

    /**
     * Event handler executed when the user clicks on an anchor
     * @param {Event} e
     */
    _onClickAnchor: function (e) {
      e.preventDefault();
      var target = e.currentTarget.getAttribute('href');

      $('html, body').animate({
        scrollTop: $(target).offset().top
      });
    }

  });
}).call(this, this.App);
