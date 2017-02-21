
(function (App) {

  App.Page.HomePage = Backbone.View.extend({

    initialize: function () {
      this._setVars();

      this._setAnchors();
    },

    _setVars: function () {
      this.anchors = Array.prototype.slice.call(document.querySelectorAll('.js-anchor'));
    },

    _setAnchors: function () {
      this.anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          var target = e.currentTarget.getAttribute('data-anchor');

          $('html, body').animate({
            scrollTop: $(target).offset().top
          });
        });
      });
    }

  });
}).call(this, this.App);
