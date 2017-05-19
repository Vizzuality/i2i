(function (App) {

  App.Component.YoutubeModal = App.Component.Modal.extend({

    contentTemplate: JST['templates/shared/modals/modal-youtube'],

    defaults: {
      title: 'Watch video',
      showTitle: false,
      footer: '<span></span><button type="button" class="c-button -medium -white js-close">Close</button>',
      // Youtube link to the video
      link: null
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close': 'onCloseModal'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this._generateContent();
      this.render();
    },

    /**
     * Return the embed link of the Youtube video
     * @return {string}
     */
    _getEmbedLink: function () {
      var videoID;
      var matches = this.options.link.match(/(watch\?v=|youtu\.be\/)([^#\&\?]*)/);
      if (matches && matches.length > 2) videoID = matches[2];

      if (videoID) return 'https://www.youtube.com/embed/' + videoID;
      return null;
    },

    /**
     * Generate the content of the modal
     */
    _generateContent: function () {
      this.options.content = this.contentTemplate({
        embedLink: this._getEmbedLink()
      });
    },

  });
}).call(this, this.App);
