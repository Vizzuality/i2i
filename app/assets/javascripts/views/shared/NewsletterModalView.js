(function (App) {

  App.View.NewsletterModalView = App.Component.Modal.extend({

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Subscribe to our newsletter',
      // See App.Component.Modal for details about this option
      footer: '<span></span><button class="c-button -medium -white js-close">Close</button>',
      // See App.Component.Modal for details about this option
      modalClass: '-newsletter'
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close': 'onCloseModal'
      });
    },

    contentTemplate: JST['templates/shared/modals/modal-newsletter'],

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this.render();
    },

    render: function () {
      this.options.content = this.contentTemplate();
      this.constructor.__super__.render.apply(this);
    }

  });
}.call(this, this.App));
