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

      var x = e.clientX - refX;
      var y = e.clientY - refY;

      requestAnimationFrame(function () {
        if (!this.options.visible) {
          this.el.style.display = 'block';
          this.options.visible = true;
        }

        this.el.style.transform = 'translate(calc(' + x + 'px - 50%), calc(' + y + 'px - 100%))';
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
    }

  });

}).call(this, this.App);
