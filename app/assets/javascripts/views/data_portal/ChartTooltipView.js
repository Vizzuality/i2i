(function (App) {
  'use strict';

  App.View.ChartTooltipView = Backbone.View.extend({

    className: 'c-chart-tooltip',

    template: JST['templates/data_portal/chart-tooltip'],

    defaults: {
      // Title of the tooltip
      title: null,
      // Subtitle of the tooltip
      subtitle: null,
      // Value of the tooltip
      value: null,
      // DOM element to use as a reference for the positioning of the tooltip
      reference: null,
      // Visibility of the tooltip
      // This is a private attribute, do not change its value outside
      _visible: false
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      this.render();

      this._onMousemove = this._onMousemove.bind(this);

      this._setListeners();
    },

    /**
     * Set the listeners that aren't attached to a DOM node managed by this view
     */
    _setListeners: function () {
      this.options.reference.addEventListener('mousemove', this._onMousemove);
    },

    /**
     * Stop the listeners that aren't attached to a DOM node managed by this view
     */
    _stopListeners: function () {
      this.options.reference.removeEventListener('mousemove', this._onMousemove);
    },

    /**
     * Event handler executed when the mouse moves
     * @param {Event} e event
     */
    _onMousemove: function (e) {
      var rects = this.options.reference.getBoundingClientRect();
      var refX = rects.left;
      var refY = rects.top;

      // Position of the click
      var x = e.clientX - refX;
      var y = e.clientY - refY;

      // Translate values for the tooltip
      var tooltipTranslateX = 'calc(' + x + 'px - 50%)';
      var tooltipTranslateY = 'calc(' + y + 'px - 100%)';

      // Translate values for the tip
      var tipTranslateX = '-50%';
      var tipTranslateY = '0';

      requestAnimationFrame(function () {
        if (!this.options._visible) {
          this.el.style.display = 'block';
          this.options._visible = true;
        }

        // We compute the dimensions of the tooltip
        // It needs to be done after it's been made visible
        var tooltipRefs = this.el.getBoundingClientRect();

        // Tooltip's position according to the click
        var tooltipLeft = x - tooltipRefs.width / 2;
        var tooltipRight = x + tooltipRefs.width / 2;

        // Minimum and maximum value for the tooltip position
        var leftLimit = 0;
        var rightLimit = rects.width;

        // If the tooltip is cut on its left edge
        if (tooltipLeft < leftLimit) {
          tooltipTranslateX = '' + leftLimit;
          tipTranslateX = 'calc(-50% - ' + (-tooltipLeft) + 'px)';
        }

        // If the tooltip is cut on its right edge
        if (tooltipRight > rightLimit) {
          tooltipTranslateX = 'calc(' + rightLimit + 'px - 100%)';
          tipTranslateX = 'calc(-50% - ' + (rightLimit - tooltipRight) + 'px)';
        }

        // We finally give their positions to the tooltip and the tip
        this.el.style.transform = 'translate(' + tooltipTranslateX + ', ' + tooltipTranslateY + ')';
        this.tip.style.transform = 'translate(' + tipTranslateX + ', ' + tipTranslateY + ') rotate(-45deg)';
      }.bind(this));
    },

    /**
     * Detroy the view and this.el
     * Inherited from Backbone.View
     */
    remove: function () {
      this._stopListeners();
      Backbone.View.prototype.remove.call(this);
    },

    render: function () {
      this.el.innerHTML = this.template({
        title: this.options.title,
        subtitle: this.options.subtitle,
        value: this.options.value
      });

      this.options.reference.appendChild(this.el);
      this.tip = this.el.querySelector('.js-tip');
    }

  });

}).call(this, this.App);
