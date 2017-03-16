(function (App) {

  App.Component.ModalTeam = App.Component.Modal.extend({

    contentTemplate: JST['templates/shared/modals/modal-team'],

    defaults: {
      footer: '<button type="button" class="c-button -padding -white js-close-btn-modal">Close</button>'
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close-btn-modal': '_onCloseBtnModal'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this.data = options.data;


      this._setOptions();
      this.render();
    },

    _onCloseBtnModal: function () {
      this.constructor.__super__.onCloseModal.apply(this);
    },

    _setOptions: function () {
      this.options.content = this.contentTemplate({
        name: this.data.name,
        position: this.data.position,
        biography: this.data.biography,
        image: this.data.image
      });
    },

    render: function () {
      this.constructor.__super__.render.apply(this);
    }

  });
}).call(this, this.App);
