(function (App) {

  App.Component.YoutubeModal = App.Component.Modal.extend({

    contentTemplate: JST['templates/shared/modals/modal-youtube'],

    defaults: {
      title: 'Watch video',
      showTitle: false,
      footer: '<span></span><button type="button" class="c-button -padding -white js-close">Close</button>',
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
      return this.options.link.replace('watch?v=', 'embed/');
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
