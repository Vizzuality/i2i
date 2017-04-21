(function (App) {

  App.Component.Modal = Backbone.View.extend({

    className: 'modal-container',

    template: JST['templates/shared/modal'],

    events: {
      'click .veil': 'onCloseModal'
    },

    // Do not add a defaults object here because it will be overriden
    // by the inherited view without possibility to merge the two of them

    initialize: function (options) {
      this.options = _.extend({
        // Show the title of the modal to the user
        showTitle: false,
        // Title of the modal – mandatory for accessibility
        title: 'Untitled modal',
        // Allows the modal container have scroll
        allowScroll: false,
        // Allows the modal container be positioned absolutely. By default
        // it's positioned fixed.
        isAbsolute: false,
        // Content of the modal
        content: '',
        // Modal footer
        footer: ''
      }, this.defaults, options);

      // Binded functions
      this.onKeyDownBinded = this._onKeyDown.bind(this);

      this._setVars();
    },

    _setVars: function () {
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

    afterRender: function () {
      // We focus the first focusable element of the modal
      if (this.focusableElements !== undefined && this.focusableElements.length) {
        this.focusableElements[0].focus()
      }
    },

    render: function () {
      $(this.body).append(this.$el.html(this.template({
        showTitle: this.options.showTitle,
        title: this.options.title,
        content: this.options.content,
        footer: this.options.footer
      })));

      // Element that had the focus when the modal opened
      this.prevFocusedEl = document.activeElement;

      // We add some attributes for the accessibility
      var modalContent = this.el.querySelector('.js-modal-content');
      modalContent.setAttribute('role', 'dialog');
      modalContent.setAttribute('aria-label', this.options.title);
      modalContent.setAttribute('tabindex', '0');

      this.body.classList.toggle('_no-scroll', !this.options.allowScroll);
      this.el.classList.toggle('-absolute', this.options.isAbsolute);

      // We attach the event listeners
      this._setEventListeners();

      this.afterRender();
    }

  });
}).call(this, this.App);
