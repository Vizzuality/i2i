(function (App) {

  App.Component.ModalAboutReadMore = App.Component.Modal.extend({

    defaults: {
      showTitle: true,
      footer: '<span></span><button type="button" class="c-button -medium -white js-close">Close</button>',
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close': 'onCloseModal'
      });
    },

    initialize: function (options) {
      App.Component.Modal.prototype.initialize.call(this, options);
      this.options.content = '<div class="c-modal-about-read-more">'
        + '<div class="content">'
        + this.options.content
        + '</div>'
        + '</div>';
      this.render();
    }

  });
}).call(this, this.App);
