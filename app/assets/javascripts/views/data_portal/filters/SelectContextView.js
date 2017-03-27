 (function (App) {

  var YearsCollection = Backbone.Collection.extend({

    initialize: function (attributes, options) {
      this.options = _.extend({}, options);
    },

    url: function () {
      return API_URL + '/country/';
    },

    parse: function (data) {
      return _.findWhere(data, { iso: this.options.iso })
        .year
        .map(function (years) {
          return { value: years.year };
        });
    }

  });

  App.View.SelectContextView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/select-context'],

    defaults: {
      // Current ISO
      iso: null,
      // Current year
      year: null,
      // Current selected jurisdiction
      jurisdiction: null
    },

    events: {
      'click .js-retry-context': '_fetchData',
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);

      this.yearsCollection = new YearsCollection({}, { iso: this.options.iso });
      this.jurisdictionsModel = new App.Model.IndicatorModel({}, {
        id: 'jurisdiction',
        iso: this.options.iso,
        year: this.options.year,
        filters: [] // The filters shouldn't be needed to retrieve the juridications
      });

      this._fetchData();
    },

    /**
     * Fetch the list of years and render the View
     */
    _fetchData: function () {
      this._showLoader();

      $.when.apply($, [
        this.jurisdictionsModel.fetch(),
        this.yearsCollection.fetch()
      ])
        .done(this.render.bind(this))
        .fail(this.renderError.bind(this))
        .always(this._hideLoader.bind(this));
    },

    /**
     * Show the spinning loader
     * NOTE: also empties the container
     */
    _showLoader: function () {
      this.el.innerHTML = '';
      this.el.classList.add('c-spinning-loader');
    },

    /**
     * Hide the spinning loader
     */
    _hideLoader: function () {
      this.el.classList.remove('c-spinning-loader');
    },

    /**
     * Return the data associated with the tab
     * @returns {{ year: number, jurisdiction: string }}
     */
    getData: function () {
      var selectedYearRadio = document.querySelector('.js-year:checked');
      var selectedJurisdictionRadio = document.querySelector('.js-jurisdiction:checked');

      return {
        year: +selectedYearRadio.value,
        jurisdiction: selectedJurisdictionRadio.value === 'All'
          ? null
          : selectedJurisdictionRadio.value
      };
    },

    /**
     * Return the list of years to be rendered
     * @returns {{ value: number, active: boolean }[]}
     */
    _getYears: function () {
      return this.yearsCollection.toJSON()
        .map(function (year) {
          return {
            value: year.value,
            active: year.value === this.options.year
          };
        }, this);
    },

    /**
     * Return the list of jurisdictions to be rendered
     * @returns {{ value: string, active: boolean }[]}
     */
    _getJurisdictions: function () {
      var res = this.jurisdictionsModel.get('data')
        .map(function (jurisdiction) {
          return {
            value: jurisdiction.label,
            active: jurisdiction.label === this.options.jurisdiction
          };
        }, this);

      res.unshift({
        value: 'All',
        active: !this.options.jurisdiction
      });

      return res;
    },

    render: function () {
      this.el.innerHTML = this.template({
        years: this._getYears(),
        jurisdictions: this._getJurisdictions()
      });

      return this;
    },

    renderError: function () {
      this.el.innerHTML = '<p class="loading-error">' +
        'Unable to load the context options' +
        '<button type="button" class="c-button -retry js-retry-context">Retry</button>' +
        '</p>';

      this.setElement(this.el);
    }

  });
}.call(this, this.App));
