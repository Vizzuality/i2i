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
      this.indicatorsCollection.fetch()
        .done(function() {
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    /**
     * Return the sorted list of indicators
     * NOTE: the access indicators are always displayed first
     * @returns {object[]} widgets
     */
    _sortIndicators: function () {
      // links category with indicators
      this.options.indicators.forEach(function(ind) {
        var index = this.indicatorsCollection.toJSON().findIndex(function(i) {
          return i.id === ind.id
        });

        if (index === -1) return;

        ind.category = this.indicatorsCollection.toJSON()[index].category;
      }.bind(this));

      return this.options.indicators.sort(function (a, b) {
        var aIsComplex = a.category === App.Helper.Indicators.CATEGORIES.ACCESS
          || a.category === App.Helper.Indicators.CATEGORIES.STRANDS;
        var bIsComplex = b.category === App.Helper.Indicators.CATEGORIES.ACCESS
          || b.category === App.Helper.Indicators.CATEGORIES.STRANDS;
        if (aIsComplex && !bIsComplex) return -1;
        if (!aIsComplex && bIsComplex) return 1;
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
     * @param {object} customIndicator
     * @param {object} widgetContainer
     */
    _updateWidgetContainer: function (customIndicator, widgetContainer) {
      var indicators = this.indicatorsCollection.toJSON();
      var index = _.findIndex(indicators, { id: customIndicator.id });
      var indicator = indicators[index];
      var isComplex = indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS
        || indidcator.category === App.Helper.Indicators.CATEGORIES.STRANDS;

      if (isComplex) {
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
      }

      this.widgets = [];

      var sortedIndicators = this._sortIndicators();

      // We instantiate the widget views
      sortedIndicators.forEach(function (indicator, index) {
        var widget = new App.View.ChartWidgetView(_.extend({},
          { el: this.widgetsContainer.children[index].children[0], showToolbar: false },
          indicator
        ));

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
