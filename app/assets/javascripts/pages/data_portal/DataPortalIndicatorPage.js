(function (App) {
  'use strict';

  App.Page.DataPortalIndicatorPage = Backbone.View.extend({

    el: 'body',

    defaults: {
      // Encoded state of the widget
      encodedState: null,
      // Decoded state of the widget
      _state: null
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      this.indicatorsCollection = new App.Collection.IndicatorsCollection();
      this.widgetContainer = this.el.querySelector('.js-widget');
      this.gridContainer = this.el.querySelector('.js-grid');

      if (!this.options.encodedState) {
        // TODO
      } else {
        this._retrieveState();
        this._fetchData();
      }
    },

    /**
     * Event listener executed when a widget has successfully fetched its data
     * @param {{ id: string, name: string, data: object[] }} event
     */
    _onWidgetSync: function (event) {
      this._updateWidgetContainer();
    },

    /**
     * Update this.options._state according to this.options.encodedState
     */
    _retrieveState: function () {
      var serializedState = App.Helper.URL.decode(this.options.encodedState);
      this.options._state = App.Helper.Indicators.deserialize(serializedState);
    },

    /**
     * Fetch the list of indicators
     */
    _fetchData: function () {
      this.indicatorsCollection.fetch()
        .done(function () {
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    /**
     * Return the list of indicators
     * @returns {object[]} widgets
     */
    _getIndicators: function () {
      return this.indicatorsCollection.toJSON().sort(function (a, b) {
        var aIsAccess = a.category === App.Helper.Indicators.CATEGORIES.ACCESS;
        var bIsAccess = b.category === App.Helper.Indicators.CATEGORIES.ACCESS;
        if (aIsAccess && !bIsAccess) return -1;
        if (!aIsAccess && bIsAccess) return 1;
        return 0;
      });
    },

    /**
     * Render the widget
     */
    _renderWidget: function () {
      var options = _.extend({}, { el: this.widgetContainer, showToolbar: false }, this.options._state);
      var widget = new App.View.ChartWidgetView(options);
      this.listenTo(widget, 'data:sync', this._onWidgetSync);
    },

    /**
     * Update the size of the widget container depending on
     * if the category of the indicator
     */
    _updateWidgetContainer: function () {
      var indicators = this._getIndicators();
      var index = _.findIndex(indicators, { id: this.options._state.id });
      var indicator = indicators[index];
      var isAccess = indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS;

      if (isAccess) {
        this.gridContainer.classList.remove('grid-m-6');
      }
    },

    render: function () {
      this._renderWidget();
    }

  });

}).call(this, this.App);
