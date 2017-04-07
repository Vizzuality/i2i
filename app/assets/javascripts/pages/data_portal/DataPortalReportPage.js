(function (App) {
  App.Page.DataPortalReportPage = Backbone.View.extend({

    el: 'body',

    defaults: {
      indicators: []
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);

      this._setVars();
      this._fetchData();
    },

    _setVars: function () {
      this.indicatorsCollection = new App.Collection.IndicatorsCollection();

      this.widgetsContainer = this.el.querySelector('.js-widgets');
    },

    /**
     * Fetch the model for the selected country and year
     */
    _fetchData: function () {
      // The first time we render to have the placeholder flags
      this.render();

      $.when.apply($,
        this.indicatorsCollection.fetch()
      ).done(function () {
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    /**
     * Return the sorted list of visible indicators
     * NOTE: the access indicators are always displayed first
     * @returns {object[]} widgets
     */
    _getVisibleIndicators: function () {
      return this.indicatorsCollection.toJSON().filter(function (indicator) {
        return indicator.visible;
      }).sort(function (a, b) {
        var aIsAccess = a.category === App.Helper.Indicators.CATEGORIES.ACCESS;
        var bIsAccess = b.category === App.Helper.Indicators.CATEGORIES.ACCESS;
        if (aIsAccess && !bIsAccess) return -1;
        if (!aIsAccess && bIsAccess) return 1;
        return 0;
      });
    },

    /**
     * Create the widget containers
     * @param {number} count - number of containers to create
     * @returns {DocumentFragment} containers
     */
    _createWidgetsContainer: function (count) {
      var fragment = new DocumentFragment();

      for (var i = 0, j = count; i < j; i++) {
        var div = document.createElement('div');
        div.classList.add('grid-s-12', 'grid-l-6');
        var widget = document.createElement('div');
        widget.classList.add('c-widget');
        div.appendChild(widget);
        fragment.appendChild(div);
      }

      return fragment;
    },

    /**
     * Update the size of the widget container depending on
     * if the category of the indicator
     * @param {object} indicator
     * @param {object} widgetContainer
     */
    _updateWidgetContainer: function (indicator, widgetContainer) {
      var visibleIndicators = this._getVisibleIndicators();
      var index = _.findIndex(visibleIndicators, { id: indicator.id });
      var indicator = visibleIndicators[index];
      var isAccess = indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS;

      if (isAccess) {
        widgetContainer.classList.remove('grid-l-6');
      }
    },

    /**
     * Render the widgets
     */
    _renderWidgets: function () {
      if (this._loadingError) {
        new App.View.RetryMessageView({
          el: this.widgetsContainer,
          label: 'Unable to load the indicators',
          callback: this._fetchData.bind(this)
        });
        return;
      }

      // We create the containers for the widgets
      var fragment = this._createWidgetsContainer(this.options.indicators.length);

      this.widgetsContainer.innerHTML = ''; // We ensure it's empty first
      this.widgetsContainer.appendChild(fragment);

      // If the widget instances already exist, we remove the listeners
      // and reset their pointer
      if (this.widgets) {
        this.widgets.forEach(function (widget) {
          this.stopListening(widget);
        }, this);
        this.widgets = [];
      } else {
        this.widgets = [];
      }

      // We instantiate the widget views
      this.options.indicators.forEach(function (indicator, index) {
        var widget = new App.View.ChartWidgetView({
          el: this.widgetsContainer.children[index].children[0],
          id: indicator.id,
          iso: indicator.iso,
          year: indicator.year,
          filters: indicator.filters,
          showToolbar: false
        });

        this.widgets.push(widget);

        this.listenTo(widget, 'data:sync', function() {
          // Need a way to know the widget container of two or more equal indicators but
          // different params, so we can not trust on finding by indicator id.
          var widgetContainer = this.widgetsContainer.children[index];
          this._updateWidgetContainer(indicator, widgetContainer)
        }.bind(this));
      }, this);
    },

    render: function () {
      this._renderWidgets();

      this.setElement(this.el);
    }
  });
}.call(this, this.App));
