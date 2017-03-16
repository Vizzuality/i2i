(function (App) {
  'use strict';

  var IndicatorsCollection = Backbone.Collection.extend({
    // initialize: function (iso, year) {
    //   this.iso = iso;
    //   this.year = year;
    // },

    // url: function() {
    //   return API_URL + '/indicator/' + this.iso + '/' + this.year;
    // },

    // parse: function (data) {$
    //   return _.uniq(data.data.map(function (o) { return o.indicatorId }))
    //     .map(function (indicatorId) {
    //       return {
    //         indicator: indicatorId
    //       };
    //     });
    // }
  });

  var INDICATORS = [
    { id: 'geographic_area', name: 'Geographic Area', category: 'Common Indicators', visible: false },
    { id: 'gender', name: 'Gender', category: 'Common Indicators', visible: false },
    { id: 'age',name: 'Age', category: 'Common Indicators', visible: false },
    // { id: 'access_to_resources', name: 'Access to Resources', category: 'Common Indicators', visible: false },
    // { id: 'dwelling_type', name: 'Dwelling type: roof/dwelling', category: 'Common Indicators', visible: false },
    { id: 'i2i_Marital_Status', name: 'Marital Status', category: 'Common Indicators', visible: false },
    { id: 'i2i_Education', name: 'Level of education', category: 'Common Indicators', visible: true },
    { id: 'i2i_Income_Sources', name: 'Sources of income', category: 'Common Indicators', visible: true },
    { id: 'fas_strand', name: 'Financial services uptake', category: 'Financial Access', visible: true },
    { id: 'savings_strand', name: 'Savings', category: 'Financial Access', visible: true },
    { id: 'credit_strand', name: 'Credit', category: 'Financial Access', visible: true },
    { id: 'remittances_strand', name: 'Send and receive money', category: 'Financial Access', visible: false },
    { id: 'insurance_strand', name: 'Insurance', category: 'Financial Access', visible: false }
  ];

  // This object is used to detect the category of the indicators without having to repeat
  // the exact name
  // NOTE: this object is duplicated in ChartWidgetView and ApplyFiltersView; make sure to
  // update both of them
  var CATEGORIES = {
    COMMON: 'Common Indicators',
    STRAND: 'Financial Access'
  };

  // This will be removed when we have a way to get the country name from the API
  var COUNTRIES = {
    UGA: 'Uganda',
    TZA: 'Tanzania',
    ZMB: 'Zambia',
    RWA: 'Rwanda',
    GHA: 'Ghana',
    KEN: 'Kenya',
    MOZ: 'Mozambique',
    PAK: 'Pakistan'
  };

  App.Page.DataPortalCountryPage = Backbone.View.extend({

    el: 'body',

    headerTemplate: JST['templates/data_portal/header'],
    widgetsTemplate: JST['templates/data_portal/widgets'],

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
      'click .js-retry': '_fetchData',
      'click .js-customize-indicators': '_openFilterModal'
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      this.indicatorsCollection = new IndicatorsCollection(INDICATORS);
      this.headerContainer = this.el.querySelector('.js-header');
      this.widgetsContainer = this.el.querySelector('.js-widgets');
      this._fetchData();
    },

    /**
     * Event listener executed when a widget has successfully fetched its data
     * @param {{ id: string, name: string, data: object[] }} event
     */
    _onWidgetSync: function (event) {
      this._updateIndicatorsData(event.id, event.name, event.data);
      this._updateWidgetContainer(event.id, event.data);
    },

    /**
     * Event listener executed when the filter are updated
     * @param {string[]} visibleIndicators ids of the visible indicators
     * @param { { name: string, options: string[] }[] } filters
     */
    _onFiltersUpdate: function (visibleIndicators, filters) {
      if (visibleIndicators) this._updateVisibleIndicators(visibleIndicators);
      if (filters) this._updateFilters(filters);
      this._renderWidgets();
    },

    /**
     * Update the indicators collection with the data passed as argument
     * @param {string} indicatorId
     * @param {string} indicatorName
     * @param {object[]} data
     */
    _updateIndicatorsData: function (indicatorId, indicatorName, data) {
      var indicator = this.indicatorsCollection.find({ id: indicatorId });
      indicator.set({ options: data.map(function (option) { return option.label; }) });
    },

    /**
     * Replace this.options._filters by the new filters
     * @param { { name: string, options: string[] }[] } activeFiltersOptions
     */
    _updateFilters: function (filters) {
      this.options._filters = filters;
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

      var deferred = $.Deferred();
      deferred.resolve(INDICATORS);

      // this.indicatorsCollection.fetch()
      deferred
        .done(function (){
          this._loadingError = false;
        }.bind(this))
        .fail(function () {
          this._loadingError = true;
        }.bind(this))
        .always(this.render.bind(this));
    },

    _openFilterModal: function () {
      new App.View.FilterIndicatorsModal({
        iso: this.options.iso,
        year: this.options.year,
        indicators: this.indicatorsCollection.toJSON(),
        filters: this.options._filters,
        continueCallback: this._onFiltersUpdate.bind(this)
      });
    },

    render: function () {
      // // We replace the placeholder by the name of the country
      // var countryContainers = document.querySelectorAll('.js-country');
      // Array.prototype.slice.call(countryContainers).forEach(function (container) {
      //   container.textContent = this.model.toJSON().country;
      // }, this);

      // // We replace the placeholder by the year
      // document.querySelector('.js-year').textContent = this.options.year;

      this._renderHeader();
      this._renderWidgets();

      this.setElement(this.el);
    },

    /**
     * Render the header
     */
    _renderHeader: function () {
      this.headerContainer.innerHTML = this.headerTemplate({
        error: this._loadingError,
        indicators: this.indicatorsCollection.toJSON(),
        year: this.options.year,
        country: COUNTRIES[this.options.iso]
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
     * @param {object[]} data
     */
    _updateWidgetContainer: function (indicatorId, data) {
      var visibleIndicators = this._getVisibleIndicators();
      var index = _.findIndex(visibleIndicators, { id: indicatorId });
      var indicator = visibleIndicators[index];
      var isStrand = indicator.category === CATEGORIES.STRAND;

      if (isStrand) {
        this.widgetsContainer.children[index].classList.remove('grid-l-6');
      }
    },

    /**
     * Return the sorted list of visible indicators
     * NOTE: the strand indicators are always displayed first
     * @returns {object[]} widgets
     */
    _getVisibleIndicators: function () {
      return this.indicatorsCollection.toJSON().filter(function (indicator) {
        return indicator.visible;
      }).sort(function (a, b) {
        if (a.category === CATEGORIES.STRAND && b.category !== CATEGORIES.STRAND) return -1;
        if (a.category !== CATEGORIES.STRAND && b.category === CATEGORIES.STRAND) return 1;
        return 0;
      });
    },

    /**
     * Render the widgets
     */
    _renderWidgets: function () {
      if (this._loadingError) {
        this.widgetsContainer.innerHTML = '<p class="loading-error">' +
          'Unable to load the indicators' +
          '<button type="button" class="c-button -retry js-retry">Retry</button>' +
          '</p>';
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
          indicators: this.indicatorsCollection.toJSON(),
          indicator: indicator,
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
