(function (App) {

  App.Page.InsightsPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-download': '_onClickDownload',
      'click .js-video': '_onClickVideo',
      'click .js-anchor': '_onClickAnchor'
    },

    /**
     * Event handler executed when the user clicks a download link
     * @param {Event} e event
     */
    _onClickDownload: function (e) {
      var name = e.currentTarget.getAttribute('name');
      App.Helper.Analytics.sendEvent('Download', 'Download from i2i library', name);
    },

    /**
     * Event handler executed when the user clicks the button to see a video
     * @param {Event} e event
     */
    _onClickVideo: function (e) {
      e.preventDefault();

      var link = e.target.href;

      new App.Component.YoutubeModal({
        link: link
      });
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
