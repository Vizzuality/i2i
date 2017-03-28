(function (App) {
  /**
   * This is a parent view to inherit the core functionialities
   * of the tooltip. To use it, inherit a new tooltip based on this
   * and override/extend functionalities to adapt them to your needs.
   */
  App.Component.Tooltip = Backbone.View.extend({

    className: 'c-tooltip',

    id: 'vizz-component',

    defaults: {
      // Reference element for the tooltip
      refElem: null,
      // Direction of the tooltip
      // Either "top" or "bottom"
      direction: 'bottom',
      // Offset between the tip of the tooltip and the reference element
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
      this.options = _.extend({}, this.defaults, options);
      this._setVars();
      this._setEventListeners();

      this.render();
      this.hideTooltip();
    },

    _setVars: function () {
      this.body = document.querySelector('body');
      this.position = { top: 0, left: 0 };
    },

    _setEventListeners: function () {
      if (!App.Helper.Responsive.isDesktop) {
        this.body.addEventListener('touchstart', this._onTouchStartBody.bind(this));
        this.options.refElem.addEventListener('touchstart', this.toggleVisibility.bind(this));
      }

      if (App.Helper.Responsive.isDesktop) {
        this.options.refElem.addEventListener('mouseover', this.showTooltip.bind(this))
        this.options.refElem.addEventListener('mouseleave', this.hideTooltip.bind(this));
      }
    },

    _onTouchStartBody: function (e) {
      if(e.target === this.options.refElem || e.target === this.el || this.el.contains(e.target)) return;
      this.hideTooltip();
    },

    toggleVisibility: function () {
      this._calculatePosition();
      this._setPosition();
      this.options.refElem.focus();
      this.el.classList.toggle('_is-hidden', !this.isHidden());
    },

    showTooltip: function () {
      if (!this.isHidden()) return;
      this._calculatePosition();
      this._setPosition();
      this.options.refElem.focus();
      this.el.classList.remove('_is-hidden');
      this.el.setAttribute('aria-hidden', false);
    },

    hideTooltip: function () {
      this.el.classList.add('_is-hidden');
      this.options.refElem.blur();
      this.el.setAttribute('aria-hidden', true);
    },

    isHidden: function () {
      return this.el.classList.contains('_is-hidden');
    },

    _calculatePosition: function () {
      var offsets = $(this.options.refElem).offset();

      this.options.refElemSize = {
        width: this.options.refElem.offsetWidth,
        height: this.options.refElem.offsetHeight
      };

      if (this.options.direction === 'bottom') {
        offsets.top += this.options.refElemSize.height + this.options.offset;
      }

      if (this.options.direction === 'top') {
        offsets.top -= this.options.offset;
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
      var directionTranslate = this.options.direction === 'top' ?
        '-100%' : 0;

      this.el.style.transform = 'translate(calc(-50% + ' + (this.options.refElemSize.width / 2) + 'px), ' + directionTranslate +')';
    },

    /**
     * Return the content of the tooltip
     * @return {string}
     */
    _getContent: function() {
      return this.content({
        direction: '-' + this.options.direction
      })
    },

    render: function () {
      this.el.innerHTML = this._getContent();

      this.el.setAttribute('role', 'tooltip');

      this.body.appendChild(this.el);

      this._calculatePosition();
      this._setDirection();
      this.showTooltip();
    }

  });
}).call(this, this.App);
