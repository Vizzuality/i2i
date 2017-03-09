(function (App) {

  /**
   * This is a parent view to inherit the core functionialities
   * of the tooltip. To use it, inherit a new tooltip based on this
   * and override/extend functionalities to adapt them to your needs.
   */
  App.Component.Tooltip = Backbone.View.extend({

    className: 'c-tooltip',

    id: 'vizz-component',

    defaultConfig: {
      direction: 'bottom',
      offset: 25
    },

    events: {
      'mouseenter': 'showTooltip',
      'mouseleave': 'hideTooltip'
    },

    initialize: function (options) {
      this.config = _.extend(this.defaultConfig, options);
      this._setVars();
      this._setEventListeners();

      this.render();
      this.hideTooltip();
    },

    _setVars: function () {
      this.refElem = this.defaultConfig.refElem;
      this.body = document.querySelector('body');
      this.position = { top: 0, left: 0 };
    },

    _setEventListeners: function () {
      this.refElem.addEventListener('mouseover', this.showTooltip.bind(this))
      this.refElem.addEventListener('mouseleave', this.hideTooltip.bind(this));
    },

    showTooltip: function () {
      if (!this.isHidden()) return;
      this._calculatePosition();
      this._setPosition();
      this.el.classList.remove('_is-hidden');
    },

    hideTooltip: function () {
      this.el.classList.add('_is-hidden');
    },

    isHidden: function () {
      return this.el.classList.contains('_is-hidden');
    },

    _calculatePosition: function () {
      var offsets = $(this.defaultConfig.refElem).offset();

      if (this.defaultConfig.direction === 'bottom') {
        offsets.top += this.defaultConfig.offset;
      }

      if (this.defaultConfig.direction === 'top') {
        offsets.top -= this.defaultConfig.offset;
      }

      this.position = {
        top: offsets.top,
        left: offsets.left
      };
    },

    _setPosition: function () {
      var refElemWidth = this.defaultConfig.refElem.offsetWidth;

      this.el.style.top = this.position.top + 'px';
      this.el.style.left = this.position.left + 'px';
      this.el.style.transform = 'translate(calc(-50% + ' + (refElemWidth / 2) + 'px), 0)';
    },

    render: function () {
      $(this.body).append(this.el);
      $(this.el).html(this.content());

      this.showTooltip();
    }

  });
}).call(this, this.App);
