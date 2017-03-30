((function (App) {
  'use strict';

  App.View.RetryMessageView = Backbone.View.extend({

    template: function (params) {
      return '<p class="c-retry-message">' +
        params.label +
        '<button type="button" class="c-button -white js-retry">Retry</button>' +
        '</p>';
    },

    defaults: {
      // Label to display on top of the button
      label: '',
      // Callback to execute when the button is pressed
      callback: function () {}
    },

    events: {
      'click .js-retry': '_onClickRetry'
    },

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings);
      this.render();
    },

    /**
     * Event handler executed when the user clicks the retry button
     */
    _onClickRetry: function () {
      this.options.callback();
    },

    render: function () {
      this.el.innerHTML = this.template(this.options);
      this.setElement(this.el);
    }

  });
})(this.App));
