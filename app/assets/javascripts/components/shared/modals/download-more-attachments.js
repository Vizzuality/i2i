(function (App) {
  App.Component.DownloadMoreAttachments = App.Component.Modal.extend({
    contentTemplate: JST['templates/shared/modals/modal-more-attachments'],

    defaults: {
      title: 'Download',
      showTitle: true,
      footer: '<span></span><button type="button" class="c-button -medium -white js-close">Close</button>',
      attachments: []
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close': 'onCloseModal'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      console.log(options);
      this._generateContent();
      this.render();
    },

    /**
     * Generate the content of the modal
     */
    _generateContent: function () {
      this.options.content = this.contentTemplate({
        attachments: this.options.attachments.map(function (attachment) {
          return {
            filename: attachment.table.filename,
            year: attachment.table.year
          }
        })
      });
    },

  });
}).call(this, this.App);
