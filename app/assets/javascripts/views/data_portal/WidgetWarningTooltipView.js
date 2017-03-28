(function (App) {
  App.View.WidgetWarningTooltipView = App.Component.Tooltip.extend({

    template: JST['templates/data_portal/widget-warning-tooltip'],

    // The default parameters will be merged with the ones of
    // App.Component.Tooltip
    defaults: {
      // Title of the tooltip
      title: 'Are you sure you want to continue?',
      // Description of the tooltip
      description: '',
      // Offset between the ref element and the tip of the tooltip
      offset: 5,
      // Callback executed when the user clicks the continue button
      continueCallback: function () {},
      // Callback executed when the user clicks the cancel button
      cancelCallback: function () {}
    },

    // We override the default events
    events: {
      'click .js-continue': '_onClickContinue',
      'click .js-cancel': '_onClickCancel'
    },

    initialize: function (options) {
      this.options = _.extend({}, App.Component.Tooltip.prototype.defaults, this.defaults, options);
      this._setVars();
      this.render();

      // The tooltip needs to be hidden before being shown for the first time
      this.hideTooltip();
      this.showTooltip();
    },

    /**
     * Event handler executed when the user clicks the continue button
     */
    _onClickContinue: function () {
      this.options.continueCallback.apply(this);
    },

    /**
     * Event handler executed when the user clicks the cancel button
     */
    _onClickCancel: function () {
      this.options.cancelCallback.apply(this);
    },

    /**
     * Return the content of the tooltip
     * @override
     * @return {string}
     */
    _getContent: function () {
      return this.template({
        direction: '-' + this.options.direction,
        title: this.options.title,
        description: this.options.description
      });
    },

    render: function () {
      App.Component.Tooltip.prototype.render.apply(this);
      // this.setElement(this.el);
    }
  });
}).call(this, this.App);
