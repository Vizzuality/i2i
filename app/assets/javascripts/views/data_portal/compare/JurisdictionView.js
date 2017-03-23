(function (App) {

  App.View.JurisdictionView = Backbone.View.extend({

    template: JST['templates/data_portal/compare/jurisdiction'],

    defaults: {
      // ISO of the country
      iso: null,
      // Current year of the portal
      year: null,
      // The indicator being compared
      indicator: null,
      // Number of options the user can select at max
      optionsLimit: 3,
      // List of the indicators used for the comparison
      // The format of each of them is:
      // { id: string, year: number, iso: string, filters: { id: string, name: string, options: string[] }[] }
      compareIndicators: []
    },

    events: {
      'click .js-retry-compare': '_fetchData',
      'click .js-jurisdiction': '_onClickJurisdiction'
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);

      // We copy the array to avoid mutations
      this.options.compareIndicators = Array.prototype.slice.call(this.options.compareIndicators || []);

      this._fetchData();
    },

    /**
     * Event handler executed when the user interacts with a checkbox
     * @param {Event} e event
     */
    _onClickJurisdiction: function (e) {
      var checkbox = e.target;

      if (checkbox.checked) { // Just being checked
        if (!this._canSelectOption()) checkbox.checked = false;
        else {
          this._addCompareItem(checkbox.value);
        }
      } else {
        this._removeCompareItem(checkbox.value);
      }
    },

    /**
     * Add an item to this.options.compareIndicators
     * @param {string} juridication name of the jurisdiction
     */
    _addCompareItem: function (jurisdiction) {
      this.options.compareIndicators.push({
        id: this.options.indicator.id,
        iso: this.options.iso,
        year: this.options.year,
        filters: [{
          id: 'jurisdiction',
          name: 'jurisdiction',
          options: [jurisdiction]
        }]
      });
    },

    /**
     * Remove an item to this.options.compareIndicators
     * @param {string} jurisdiction name of the jurisdiction
     */
    _removeCompareItem: function (jurisdiction) {
      var compareItemIndex = _.findIndex(this.options.compareIndicators, function (compareIndicator) {
        return compareIndicator.filters.length
          && compareIndicator.filters[0].options.length
          && compareIndicator.filters[0].options[0] === jurisdiction;
      }, this);
      this.options.compareIndicators.splice(compareItemIndex, 1);
    },

    /**
     * Return whether the user can select another option
     * @return {boolean}
     */
    _canSelectOption: function () {
      return this.options.compareIndicators.length + 1 < this.options.optionsLimit;
    },

    /**
     * Fetch the list of countries and years and render the view
     */
    _fetchData: function () {
      this._showLoader();

      this.model = new App.Model.IndicatorModel({}, {
        id: 'jurisdiction',
        iso: this.options.iso,
        year: this.options.year,
        filters: [] // The filters shouldn't be needed to retrieve the juridications
      });

      this.model.fetch()
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
     * @return { { id: string, year: number, iso: string, filters: {}[] } }
     */
    getData: function () {
      return this.options.compareIndicators;
    },

    /**
     * Return the data in a format adapted for the render function
     * @return { { name: string, active: boolean }[] }[] }
     */
    _getDataForRender: function () {
      var res = this.model.get('data');

      // We copy the array to avoid mutations
      res = Array.prototype.slice.call(res);

      var activeJuridictions = this.options.compareIndicators
        .map(function (compareIndicator) {
          return compareIndicator.filters.length
            && compareIndicator.filters[0]
            && compareIndicator.filters[0].options.length
            && compareIndicator.filters[0].options[0];
        });

      res = res.map(function (row) {
        return {
          name: row.label,
          active: activeJuridictions.indexOf(row.label) !== -1
        };
      });

      var isAllOptionActive = !!this.options.compareIndicators
        .filter(function (compareIndicator) {
          return !compareIndicator.filters.length;
        }).length;

      // We add the "All" option, by default active
      res.unshift({
        name: 'All',
        active: true,
        disabled: true
      });

      return res;
    },

    render: function () {
      this.el.innerHTML = this.template({
        jurisdictions: this._getDataForRender()
      });

      this.setElement(this.el);

      return this;
    },

    renderError: function () {
      this.el.innerHTML = '<p class="loading-error">' +
        'Unable to load the compare options' +
        '<button type="button" class="c-button -retry js-retry-compare">Retry</button>' +
        '</p>';

      this.setElement(this.el);
    }

  });
}.call(this, this.App));
