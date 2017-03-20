(function (App) {

  App.Component.ModalChartSelector = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/modal-chart-selector'],

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Do you want to see the information in another way?',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<button type="button" class="c-button -medium -white -outline js-cancel">Cancel</button><button type="button" class="c-button -medium -no-hover -white js-done">Done</button>',
      // List of charts to display in the modal
      // The structure of each chart is:
      // {
      //   string name,
      //   boolean available,
      //   boolean selected
      // }
      charts: [],
      // Callback executed when the user presses the "Done" button
      // The callback gets passed the name of the selected chart
      continueCallback: function () {}
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-cancel': 'onCloseModal',
        'click .js-done': '_onClickDone'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this.render();
    },

    /**
     * Event handler for when the "Done" button is clicked
     */
    _onClickDone: function () {
      var selectedOption = this.el.querySelector('.js-option:checked');
      this.options.continueCallback(selectedOption.value);
      this.onCloseModal();
    },

    render: function () {
      this.options.content = this.contentTemplate({
        charts: this.options.charts
      });

      this.constructor.__super__.render.apply(this);
    }

  });
}).call(this, this.App);
