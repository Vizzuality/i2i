(function (App) {

  var templates = {
    default: '',
    team: 'templates/shared/modal-team'
  };

  App.Component.Modal = Backbone.View.extend({

    className: 'modal-container',

    template: JST['templates/shared/modal'],

    events: {
      'click .veil': 'onCloseModal'
    },

    initialize: function (options) {
      this.options = options;

      // Binded functions
      this.onKeyDownBinded = this._onKeyDown.bind(this);

      this._setVars();
    },

    _setVars: function () {
      // children inherit this var and use it to render the content
      this.content = {};
      this.title = 'Untitled modal';
      this.body = document.querySelector('body');
    },

    _setEventListeners: function () {
      // We can't move the next line to _setVars because it needs the modal to be rendered first
      this.focusableElements = this.getFocusableElements();
      this.el.addEventListener('keydown', this.onKeyDownBinded, false);
    },

    _removeEventListeners: function () {
      this.el.removeEventListener('keydown', this.onKeyDownBinded, false);
    },

    _onKeyDown: function (e) {
      // 27 is ESC key
      if (e.keyCode === 27) {
        e.preventDefault();
        this.onCloseModal();
      } else if (this.focusableElements.length >= 1 && e.keyCode === 9) { // 9 is TAB key
        // If only one element, we just don't tab through the elements
        if (this.focusableElements.length === 1) {
          e.preventDefault();
          return;
        }

        var firstFocusable = this.focusableElements[0];
        var lastFocusable = this.focusableElements[this.focusableElements.length - 1];

        if (e.target === firstFocusable) {
          if (e.shiftKey) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else if (e.target === lastFocusable) {
          if (!e.shiftKey) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    },

    onCloseModal: function () {
      // We restore the focus
      this.prevFocusedEl.focus();

      this._removeEventListeners();
      this.remove();
      this.body.classList.remove('_no-scroll');
    },

    getFocusableElements: function () {
      var focusables = App.Helper.Accessibility.getFocusableElements();
      return Array.prototype.slice.call(this.el.querySelectorAll(focusables));
    },

    render: function () {
      $(this.body).append(this.$el.html(this.template({
        content: this.content
      })));

      // Element that had the focus when the modal opened
      this.prevFocusedEl = document.activeElement;

      // We add some attributes for the accessibility
      this.el.setAttribute('role', 'dialog');
      this.el.setAttribute('aria-label', this.title);
      this.el.setAttribute('tabindex', '0');

      // We attach the event listeners
      this._setEventListeners();

      // We focus the first focusable element of the modal
      if (this.focusableElements.length) {
        this.focusableElements[0].focus();
      }

      this.body.classList.add('_no-scroll');
    }

  });
}).call(this, this.App);
