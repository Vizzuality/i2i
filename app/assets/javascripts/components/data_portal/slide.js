(function (App) {
  App.Component.Slide = Backbone.View.extend({

    defaults: {
      // Callback to be executed after an action (show or close)
      callback: function () {},
      // Title of the slide - mandatory
      title: '',
      // content to render in the slide
      content: ''
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      this._onTransitionend = this._onTransitionend.bind(this);
    },

    _onTransitionend: function () {
      if (this.el.classList.contains('-visible')) {
        this.previsouslyFocusedEl = document.activeElement;
        this.el.focus();
      } else {
        this.previsouslyFocusedEl.focus();
        this.el.removeEventListener('transitionend', this._onTransitionend);
      }
    },

    toggleVisibility: function (visible) {
      this.el.addEventListener('transitionend', this._onTransitionend);
      this.el.classList.toggle('-visible', visible);
    },

    onCallback: function () {
      this.options.callback();
    },

    render: function () {
      this.el.innerHTML = this.options.content;
      this.el.setAttribute('aria-label', this.options.title);
      this.el.setAttribute('tabindex', 0);
    }
  });
}).call(this, this.App);
