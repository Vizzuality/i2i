(function (App) {

  App.Component.ModalTeam = App.Component.Modal.extend({

    contentTemplate: JST['templates/shared/modals/modal-team'],

    defaults: {
      title: 'Team member profile',
      showTitle: false,
      footer: '<button type="button" class="c-button -medium -white js-close-btn-modal">Close</button>',
      // Contains an object with the info of the member to be displayed
      memberInfo: {}
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close-btn-modal': 'onCloseModal'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this._options = _.extend({}, this.defaults, options);

      this._setOptions();
      this.render();
    },

    _setVars: function() {
      this.constructor.__super__._setVars.call(this, {});
      this.router = App.Router.Application;
    },

    onCloseModal: function () {
      this.constructor.__super__.onCloseModal.apply(this);
      this.router.navigate('about', { replace: true });
    },

    _setOptions: function () {
      var memberInfo = this._options.memberInfo;
      this.options.content = this.contentTemplate({
        name: memberInfo.name,
        position: memberInfo.position,
        biography: memberInfo.biography,
        image: memberInfo.image_url,
        blogs: memberInfo.blogs
      });
    },

    render: function () {
      this.constructor.__super__.render.apply(this);
    }

  });
}).call(this, this.App);
