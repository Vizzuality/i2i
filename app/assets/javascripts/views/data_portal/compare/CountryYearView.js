(function (App) {

  var Collection = Backbone.Collection.extend({

    comparator: 'name',

    initialize: function (attributes, options) {
      this.options = _.extend({}, options);
    },

    url: function () {
      return API_URL + '/country/';
    },

    parse: function (data) {
      return data
        .filter(function (country) {
          // Kenya is temporarly hidden
          // https://basecamp.com/1756858/projects/12871501/todos/305471773
          return country.iso !== 'KEN';
        })
        .map(function (row) {
        return {
          name: row.name,
          iso: row.iso,
          years: row.year
            .map(function (years) {
              return {
                value: years.year,
                active: this.options.iso === row.iso && this.options.year === years.year,
                disabled: this.options.iso === row.iso && this.options.year === years.year
              };
            }, this)
            .sort(function (yearA, yearB) {
              if (yearA.value < yearB.value) return -1;
              if (yearA.value > yearB.value) return 1;
              return 0;
            })
        };
      }, this);
    }

  });

  App.View.CountryYearView = Backbone.View.extend({

    template: JST['templates/data_portal/compare/country-year'],

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
      'click .js-year': '_onClickYear'
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);

      // We copy the array to avoid mutations
      this.options.compareIndicators = Array.prototype.slice.call(this.options.compareIndicators || []);

      this.collection = new Collection({}, {
        iso: this.options.iso,
        year: this.options.year
      });

      this._fetchData();
    },

    /**
     * Event handler executed when the user interacts with a checkbox
     * @param {Event} e event
     */
    _onClickYear: function (e) {
      var checkbox = e.target;
      var iso = checkbox.dataset.iso;
      var year = +checkbox.value;

      // If the user clicks the disabled checkbox, we don't do anything
      if (checkbox.disabled) return;

      if (checkbox.checked) { // Just being checked
        if (!this._canSelectOption()) checkbox.checked = false;
        else {
          this._addCompareItem(iso, year);
        }
      } else {
        this._removeCompareItem(iso, year);
      }
    },

    /**
     * Add an item to this.options.compareIndicators
     * @param {string} iso ISO of the country
     * @param {number} year
     */
    _addCompareItem: function (iso, year) {
      this.options.compareIndicators.push({
        id: this.options.indicator.id,
        iso: iso,
        year: year,
        filters: []
      });
    },

    /**
     * Remove an item to this.options.compareIndicators
     * @param {string} iso ISO of the country
     * @param {number} year
     */
    _removeCompareItem: function (iso, year) {
      var compareItemIndex = _.findIndex(this.options.compareIndicators, { iso: iso });
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

      this.collection.fetch()
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
     * @return { { name: string, iso: string, years: { value: number, active: boolean, disabled: boolean }[] }[] }
     */
    _getDataForRender: function () {
      return this.collection.toJSON()
        .map(function (country) {
          var activeYears = this.options.compareIndicators
            .filter(function (compareIndicator) { return compareIndicator.iso === country.iso })
            .reduce(function (res, compareIndicator) { return res.concat([compareIndicator.year]); }, []);

          return _.extend({}, country, {
            years: country.years.map(function (year) {
              return _.extend({}, year, {
                // The year that is disabled is the year selected for the whole portal
                // so it should always stay active
                active: activeYears.indexOf(year.value) !== -1 || year.disabled
              });
            })
          });

        }, this)
    },

    render: function () {
      this.el.innerHTML = this.template({
        countries: this._getDataForRender()
      });

      this.setElement(this.el);

      return this;
    },

    renderError: function () {
      new App.View.RetryMessageView({
        el: this.el,
        label: 'Unable to load the compare options',
        callback: this._fetchData.bind(this)
      });
    }

  });
}.call(this, this.App));
