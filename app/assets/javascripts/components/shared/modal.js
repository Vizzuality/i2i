(function (App) {

  var templates = {
    default: '',
    team: 'templates/shared/modal-team'
  };

  App.Component.Modal = Backbone.View.extend({

    className: 'modal-container',

    template: JST['templates/shared/modal'],

    events: {
      'click .veil': '_onCloseModal'
    },

    initialize: function (options) {
      console.log(options);
      this.options = options;

      // Binded functions
      this.onKeyDownBinded = this._onKeyDown.bind(this);

      this._setVars();
      this._setEventListeners();
    },

    _setVars: function () {
      // children inherit this var and use it to render the content
      this.content = {};
      this.body = document.querySelector('body');
    },

    _setEventListeners: function () {
      document.addEventListener('keydown', this.onKeyDownBinded, false);
    },

    _removeEventListeners: function () {
      document.removeEventListener('keydown', this.onKeyDownBinded, false);
    },

    _onKeyDown: function (e) {
      // 27 is ESC key
      if (e.keyCode !== 27) return;
      this._onCloseModal();
    },

    _onCloseModal: function () {
      this._removeEventListeners();
      this.remove();
      this.body.removeAttribute('class', '_no-scroll');
    },

    render: function () {
      $(this.body).append(this.$el.html(this.template({
        content: this.content
      })));

      this.body.setAttribute('class', '_no-scroll');

      return this;
    }

  });
}).call(this, this.App);
