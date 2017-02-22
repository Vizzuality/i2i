(function (App) {
  'use strict';

  var Model = Backbone.Model.extend({
    // TODO
    parse: function (data) {
      return data;
    }
  });

  // TODO: remove once API
  var mockupData = {
    iso: 'KEN',
    country: 'Kenya',
    years: [2010, 2011, 2012, 2014, 2015],
    indicators: [1, 3, 5, 14]
  };

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
      this.model = new Model(mockupData);
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
      // TODO: remove this code once the API is available
      var deferred = $.Deferred();
      deferred.resolve({ toBe: 'removed' });
      return deferred;

      // return this.model.fetch();
    },

    render: function () {
      // We replace the placeholder by the name of the country
      var countryContainers = document.querySelectorAll('.js-country');
      Array.prototype.slice.call(countryContainers).forEach(function (container) {
        container.textContent = this.model.toJSON().country;
      }, this);

      // We replace the placeholder by the year
      document.querySelector('.js-year').textContent = this.options.year;

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
      var model = this.model.toJSON();
      var fragment = new DocumentFragment();

      // We create the containers for the widgets
      model.indicators.forEach(function () {
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
      model.indicators.forEach(function (indicator, index) {
        new App.View.ChartWidgetView({
          el: this.widgetsContainer.children[index].children[0],
          id: indicator
        });
      }, this);
    }

  });

}).call(this, this.App);
