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

  App.Page.DataPortalCountryPage = Backbone.View.extend({

    widgetsTemplate: JST['templates/data_portal/country-page'],

    defaults: {
      // ISO of the country
      iso: null,
      // Current year
      year: null
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      // this.indicatorsCollection = new IndicatorsCollection(this.options.iso, this.options.year);
      this.indicatorsCollection = new IndicatorsCollection(INDICATORS);
      this.widgetsContainer = document.querySelector('.js-widgets');
      this.fetchData()
        .done(this.render.bind(this))
        .fail(this.renderError.bind(this));
    },

    /**
     * Fetch the model for the selected country and year
     * @returns {object} $.Deferred
     */
    fetchData: function () {
      var deferred = $.Deferred();
      deferred.resolve(INDICATORS);
      return deferred;

      // return this.indicatorsCollection.fetch();
    },

    render: function () {
      // // We replace the placeholder by the name of the country
      // var countryContainers = document.querySelectorAll('.js-country');
      // Array.prototype.slice.call(countryContainers).forEach(function (container) {
      //   container.textContent = this.model.toJSON().country;
      // }, this);

      // // We replace the placeholder by the year
      // document.querySelector('.js-year').textContent = this.options.year;

      this.renderWidgets();
    },

    renderError: function () {
      // TODO
      console.error('unable to fetch the country data');
    },

    /**
     * Render the widgets
     */
    renderWidgets: function () {
      var collection = this.indicatorsCollection.toJSON();
      var fragment = new DocumentFragment();

      // We create the containers for the widgets
      collection.forEach(function () {
        var div = document.createElement('div');
        div.classList.add('grid-s-12', 'grid-l-6');
        var widget = document.createElement('div');
        widget.classList.add('c-widget');
        div.appendChild(widget);
        fragment.appendChild(div);
      });

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
