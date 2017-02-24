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
    { indicator: 'geographic_area' },
    { indicator: 'gender' },
    { indicator: 'i2i_Marital_Status' },
    { indicator: 'i2i_Education' },
    { indicator: 'i2i_Income_Sources' }
  ];

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
      year: null
    },

    events: {
      'click .js-retry': '_fetchData'
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      // this.indicatorsCollection = new IndicatorsCollection(this.options.iso, this.options.year);
      this.indicatorsCollection = new IndicatorsCollection(INDICATORS);
      this.headerContainer = this.el.querySelector('.js-header');
      this.widgetsContainer = this.el.querySelector('.js-widgets');
      this._fetchData();
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

      var collection = this.indicatorsCollection.toJSON();

      if (!collection.length) {
        this.widgetsContainer.innerHTML = '';
        var fragment = this._createWidgetsContainer(4);
        this.widgetsContainer.appendChild(fragment);
        return;
      }

      // We create the containers for the widgets
      var fragment = this._createWidgetsContainer(collection.length);

      this.widgetsContainer.innerHTML = ''; // We ensure it's empty first
      this.widgetsContainer.appendChild(fragment);

      // We instantiate the widget views
      collection.forEach(function (indicator, index) {
        new App.View.ChartWidgetView({
          el: this.widgetsContainer.children[index].children[0],
          id: indicator.indicator,
          iso: this.options.iso,
          year: this.options.year
        });
      }, this);
    }

  });

}).call(this, this.App);
