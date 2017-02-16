(function (App) {

  App.Component.Tooltip = Backbone.View.extend({

    className: 'c-tooltip',

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
    },

    _setVars: function () {
      this.body = document.querySelector('body');
      this.position = { top: 0, left: 0 };
    },

    showTooltip: function () {
      this.el.classList.remove('_is-hidden');
    },

    hideTooltip: function () {
      this.el.classList.add('_is-hidden');
    },

    getPosition: function () {
      var offsets = $(this.defaultConfig.refElem).offset();

      if (this.defaultConfig.direction === 'bottom') {
        offsets.top += this.defaultConfig.offset;
      }

      if (this.defaultConfig.direction === 'top') {
        offsets.top -= this.defaultConfig.offset;
      }

      return offsets;
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
      this._setPosition();
    }

  });
}).call(this, this.App);
