(function (App) {

  App.Component.ModalTeam = App.Component.Modal.extend({

    contentTemplate: JST['templates/shared/modals/modal-team'],

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close-btn-modal': '_onCloseBtnModal'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);

      this.render();
    },

    _onCloseBtnModal: function () {
      this.constructor.__super__.onCloseModal.apply(this);
    },

    render: function () {
      // sample data. TO-DO: retrieve data.
      this.content = this.contentTemplate({
        name: 'Jeremy Soul',
        role: 'Advisor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        url_photo: '/images/people/person_1.jpg'
      });

      this.title = 'Jeremy Soul member';

      this.constructor.__super__.render.apply(this);
    }

  });
}).call(this, this.App);
