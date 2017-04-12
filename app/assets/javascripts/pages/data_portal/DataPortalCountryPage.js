(function (App) {
  'use strict';

  var MapUrlModel = Backbone.Model.extend({

    initialize: function (iso) {
      this.iso = iso;
    },

    url: function() {
      return API_URL + '/country/' + this.iso;
    },

    parse: function (data) {
      return {
        url: data && data.length && data[0].mapUrl || null
      };
    }

  });

  App.Page.DataPortalCountryPage = Backbone.View.extend({

    el: 'body',

    headerTemplate: JST['templates/data_portal/header'],
    widgetsTemplate: JST['templates/data_portal/widgets'],
    footerTemplate: JST['templates/data_portal/footer'],

    defaults: {
      // ISO of the country
      iso: null,
      // Current year
      year: null,
      // List of active filters
      // The structure is:
      // [
      //   { id: 'my-indicator', name: 'My indicator', options: ['Option 1', 'Option 2'] }
      // ]
      // NOTE: Do not set this property at instantiation time
      _filters: []
    },

    events: {
      'click .js-customize-indicators': '_openFilterModal',
      'click .js-filter-tag': '_openFilterModal',
      'click .js-download-all': '_openDownloadAllModal'
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      this.indicatorsCollection = new App.Collection.IndicatorsCollection();
      this.mapUrlModel = new MapUrlModel(this.options.iso);
      this.headerContainer = this.el.querySelector('.js-header');
      this.widgetsContainer = this.el.querySelector('.js-widgets');
      this.footerContainer = this.el.querySelector('.js-footer');
      this._fetchData();

      new App.View.ReportFixedBar();
    },

    /**
     * Event listener executed when a widget has successfully fetched its data
     * @param {{ id: string, name: string, data: object[] }} event
     */
    _onWidgetSync: function (event) {
      this._updateWidgetContainer(event.id);
    },

    /**
     * Event listener executed when the filter are updated
     * @param {string[]} visibleIndicators ids of the visible indicators
     * @param { { name: string, options: string[] }[] } filters
     * @param {number} year
     * @param {string} jurisdiction
     */
    _onFiltersUpdate: function (visibleIndicators, filters, year, jurisdiction) {
      if (visibleIndicators) this._updateVisibleIndicators(visibleIndicators);
      if (filters) this._updateFilters(filters);
      if (year) this._updateYear(year);

      // We need to ensure we remove the filter if we don't need it anymore
      this._updateJurisdiction(jurisdiction);

      this.render();
    },

    /**
     * Replace this.options._filters by the new filters
     * @param { { name: string, options: string[] }[] } activeFiltersOptions
     */
    _updateFilters: function (filters) {
      this.options._filters = filters;
    },

    /**
     * Replace this.options.year and updates the URL
     * @param {number} year
     */
    _updateYear: function (year) {
      if (this.options.year === year) return;

      this.options.year = year;
      this._updateURL();
    },

    /**
     * Add a filter for the jurisdiction
     * @param {string} jurisdiction
     */
    _updateJurisdiction: function (jurisdiction) {
      // We copy the filters to avoid mutations of this.defaults
      this.options._filters = Array.prototype.slice.call(this.options._filters);

      var jurisdictionFilterIndex = _.findIndex(this.options._filters, { id: 'jurisdiction' });

      if (!jurisdiction || jurisdiction === 'All') {
        if (jurisdictionFilterIndex !== -1) {
          this.options._filters.splice(jurisdictionFilterIndex, 1);
        }
      } else {
        if (jurisdictionFilterIndex !== -1) {
          this.options._filters[jurisdictionFilterIndex].options = [jurisdiction];
        } else {
          this.options._filters.push({
            id: 'jurisdiction',
            options: [jurisdiction]
          });
        }
      }
    },

    /**
     * Update the URL according to the state of the application
     */
    _updateURL: function () {
      var url = '/data-portal/' + this.options.iso + '/' + this.options.year;

      // Adding { turbolinks: {} } is mandatory to avoid breaking the browser's back button
      // because Turbolinks doesn't handle well the URL changes
      // Check here: https://github.com/turbolinks/turbolinks/issues/219
      history.replaceState({ turbolinks: {} }, '', url);
    },

    /**
     * Update the visible indicators in this.indicatorsCollection
     * @param {string[]} visibleIndicators ids of the visible indicators
     */
    _updateVisibleIndicators: function(visibleIndicators) {
      this.indicatorsCollection.forEach(function (model) {
        var indicatorId = model.get('id');
        model.set({ visible: visibleIndicators.indexOf(indicatorId) !== -1 });
      });
    },

    /**
     * Fetch the model for the selected country and year
     */
    _fetchData: function () {
      // The first time we render to have the placeholder flags
      this.render();

      $.when.apply($, [
        this.indicatorsCollection.fetch(),
        this.mapUrlModel.fetch()
      ])
        .done(function (){
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    _openFilterModal: function (e) {
      var isTag = e.target.classList.contains('js-filter-tag');
      var tab = isTag
        ? ['indicator', 'filter', 'context'].indexOf(e.target.dataset.tab)
        : 0;

      new App.View.FilterIndicatorsModal({
        currentTab: tab,
        iso: this.options.iso,
        year: this.options.year,
        indicators: this.indicatorsCollection.toJSON(),
        filters: this.options._filters,
        jurisdiction: !!this._getJurisdictionFilter()
          ? this._getJurisdictionFilter().options[0]
          : null,
        continueCallback: this._onFiltersUpdate.bind(this)
      });
    },

    _openDownloadAllModal: function () {
      new App.Component.ModalDownloadAll({
        iso: this.options.iso,
        year: this.options.year
      });
    },

    /**
     * Return the jurisdiction filter if exists
     * @return {{ id: 'jurisdiction', name?: string, options: string[] }}
     */
    _getJurisdictionFilter: function () {
      return _.findWhere(this.options._filters, { id: 'jurisdiction' });
    },

    render: function () {
      this._renderHeader();
      this._renderWidgets();
      this._renderFooter();

      this.setElement(this.el);
    },

    /**
     * Render the header
     */
    _renderHeader: function () {
      this.headerContainer.innerHTML = this.headerTemplate({
        error: this._loadingError,
        indicators: this._getVisibleIndicators(),
        filters: this.options._filters
          .filter(function (filter) { return filter.id !== 'jurisdiction'; }),
        year: this.options.year,
        jurisdiction: this._getJurisdictionFilter()
          ? this._getJurisdictionFilter().options[0]
          : 'All jurisdictions',
        country: App.Helper.Indicators.COUNTRIES[this.options.iso]
      });
    },

    /**
     * Render the footer
     */
    _renderFooter: function () {
      this.footerContainer.innerHTML = this.footerTemplate({
        isZambia: this.options.iso === 'ZMB', // remove this in the future
        error: this._loadingError,
        indicators: this._getVisibleIndicators(),
        mapUrl: this.mapUrlModel.get('url'),
        downloadUrl: API_URL + '/country/' + this.options.iso + '/' + this.options.year + '/download'
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
     * @param {string} indicatorId
     */
    _updateWidgetContainer: function (indicatorId) {
      var visibleIndicators = this._getVisibleIndicators();
      var index = _.findIndex(visibleIndicators, { id: indicatorId });
      var indicator = visibleIndicators[index];
      var isAccess = indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS;

      if (isAccess) {
        this.widgetsContainer.children[index].classList.remove('grid-l-6');
      }
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

      var visibleIndicators = this._getVisibleIndicators();

      if (!visibleIndicators.length) {
        this.widgetsContainer.innerHTML = '';
        var fragment = this._createWidgetsContainer(4);
        this.widgetsContainer.appendChild(fragment);
        return;
      }

      // We create the containers for the widgets
      var fragment = this._createWidgetsContainer(visibleIndicators.length);

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
      visibleIndicators.forEach(function (indicator, index) {
        var widget = new App.View.ChartWidgetView({
          el: this.widgetsContainer.children[index].children[0],
          id: indicator.id,
          iso: this.options.iso,
          year: this.options.year,
          filters: this.options._filters
        });

        this.widgets.push(widget);

        this.listenTo(widget, 'data:sync', this._onWidgetSync);
      }, this);
    }

  });
}).call(this, this.App);
