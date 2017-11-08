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
     * Event handler executed when the user deletes a widget
     * @param {object} indicator
     */
    _onDelete: function (indicator) {
      // List of the *serialized* indicators without the one to delete
      var indicators = this.options.indicators.filter(function (ind) {
        return !_.isEqual(ind, indicator);
      }).map(function (ind) {
        return App.Helper.Indicators.serialize(ind);
      });

      // We update the URL
      var encodedState = App.Helper.URL.encode({ indicators: indicators });
      var url = window.location.pathname + '?p=' + encodedState;

      // Adding { turbolinks: {} } is mandatory to avoid breaking the browser's back button
      // because Turbolinks doesn't handle well the URL changes
      // Check here: https://github.com/turbolinks/turbolinks/issues/219
      history.replaceState({ turbolinks: {} }, '', url);

      // We delete the indicator from the sessionStorage, if stored there
      if (App.Helper.Indicators.isIndicatorSaved(indicator)) {
        App.Helper.Indicators.removeIndicator(indicator);
      }

      // We delete the indicator from the page
      var indicatorIndex = _.findIndex(this.options.indicators, indicator);
      this.options.indicators.splice(indicatorIndex, 1);

      // If the last indicator of the report has just been removed, we redirect the user
      if (!this.options.indicators.length) {
        Turbolinks.visit('/data-portal', { action: 'replace' });
      } else {
        this.render();
      }
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
      var fragment = document.createDocumentFragment();

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
        || indicator.category === App.Helper.Indicators.CATEGORIES.STRANDS;

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
          {
            el: this.widgetsContainer.children[index].children[0],
            report: true,
            onDelete: function () { this._onDelete(indicator); }.bind(this),
            showDetails: true
          },
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
