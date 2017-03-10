(function (App) {
  /**
   * This is a parent view to inherit the core functionialities
   * of the tooltip. To use it, inherit a new tooltip based on this
   * and override/extend functionalities to adapt them to your needs.
   */
  App.Component.Tooltip = Backbone.View.extend({

    className: 'c-tooltip',

    id: 'vizz-component',

    // direction property has the following values: 'top', 'bottom'
    defaultConfig: {
      direction: 'bottom',
      offset: 10
    },

    events: function () {
      if (App.Helper.Responsive.isDesktop) {
        return {
          'mouseenter': 'showTooltip',
          'mouseleave': 'hideTooltip'
        };
      }

      return {};
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
      if (!App.Helper.Responsive.isDesktop) {
        this.body.addEventListener('touchstart', this._onTouchStartBody.bind(this));
        this.refElem.addEventListener('touchstart', this.toggleVisibility.bind(this));
      }

      if (App.Helper.Responsive.isDesktop) {
        this.refElem.addEventListener('mouseover', this.showTooltip.bind(this))
        this.refElem.addEventListener('mouseleave', this.hideTooltip.bind(this));
      }
    },

    _onTouchStartBody: function (e) {
      if(e.target === this.refElem || e.target === this.el || this.el.contains(e.target)) return;
      this.hideTooltip();
    },

    toggleVisibility: function () {
      this._calculatePosition();
      this._setPosition();
      this.refElem.focus();
      this.el.classList.toggle('_is-hidden', !this.isHidden());
    },

    showTooltip: function () {
      if (!this.isHidden()) return;
      this._calculatePosition();
      this._setPosition();
      this.refElem.focus();
      this.el.classList.remove('_is-hidden');
      this.el.setAttribute('aria-hidden', false);
    },

    hideTooltip: function () {
      this.el.classList.add('_is-hidden');
      this.refElem.blur();
      this.el.setAttribute('aria-hidden', true);
    },

    isHidden: function () {
      return this.el.classList.contains('_is-hidden');
    },

    _calculatePosition: function () {
      var offsets = $(this.defaultConfig.refElem).offset();

      this.refElemSize = {
        width: this.defaultConfig.refElem.offsetWidth,
        height: this.defaultConfig.refElem.offsetHeight
      };

      if (this.defaultConfig.direction === 'bottom') {
        offsets.top += this.refElemSize.height + this.defaultConfig.offset;
      }

      if (this.defaultConfig.direction === 'top') {
        offsets.top -= this.refElemSize.height;
      }

      this.position = {
        top: offsets.top,
        left: offsets.left
      };
    },

    _setPosition: function () {
      this.el.style.top = this.position.top + 'px';
      this.el.style.left = this.position.left + 'px';
    },

    _setDirection: function () {
      var directionTranslate = this.defaultConfig.direction === 'top' ?
        '-100%' : 0;

      this.el.style.transform = 'translate(calc(-50% + ' + (this.refElemSize.width / 2) + 'px), ' + directionTranslate +')';
    },

    render: function () {
      $(this.body).append(this.el);
      $(this.el).html(this.content({
        direction: '-' + this.defaultConfig.direction
      }));

      this.el.setAttribute('role', 'tooltip');

      this._calculatePosition();
      this._setDirection();
      this.showTooltip();
    }

  });
}).call(this, this.App);
