(function (App) {

  App.View.ApplyFiltersView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/apply-filters'],

    defaults: {
      // ISO of the country
      iso: null,
      // Selected year
      year: null,
      // List of indicators
      indicators: [],
      // List of the filters
      filters: []
    },

    events: {
      'click .js-retry': '_fetchData',
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      // Filter out the non visible and the strand indicators and copy the entire object to
      // avoid mutations of the original one
      this.options.indicators = this.options.indicators
        .filter(function (indicator) {
          return indicator.visible && indicator.category !== App.Helper.Indicators.CATEGORIES.STRAND;
        })
        .map(function (indicator) {
          return {
            name: indicator.name,
            id: indicator.id,
            options: indicator.options && Array.prototype.slice.call(indicator.options)
          };
        })
        .sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

      this._fetchData();
    },

    /**
     * Fetch the data for each indicator and render it
     */
    _fetchData: function () {
      this._showLoader();

      var indicatorsModels = this.options.indicators.map(function (indicator) {
        return new App.Model.IndicatorModel({},
          {
            id: indicator.id,
            iso: this.options.iso,
            year: this.options.year
          }
        );
      }, this);

      $.when.apply($,
        indicatorsModels.map(function (indicatorsModel) {
          return indicatorsModel.fetch();
        })
      ).done(function () {
        // We copy the options in this.options.indicators
        indicatorsModels.forEach(function (indicatorsModel) {
          var indicator = _.findWhere(this.options.indicators, { id: indicatorsModel.options.id });
          indicator.options = indicatorsModel.get('data').map(function (row) {
            return row.label;
          });
        }, this);
      }.bind(this))
      .then(function () {
        this._hideLoader();
        this.render();
      }.bind(this))
      .fail(function () {
        this.renderError();
        this._hideLoader();
      }.bind(this));
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

    _getFilteredIndicators: function () {
      this.options.indicators.forEach(function (indicator) {
        var isFiltered = _.findWhere(this.options.filters, { id: indicator.id });
        indicator.options = indicator.options.map(function (option, index) {
          return {
            name: option,
            filtered: isFiltered && isFiltered.options.indexOf(option) !== -1
          };
        });
      }.bind(this));

      return this.options.indicators;
    },

    getData: function () {
      var options = document.querySelectorAll('.js-option');
      options = Array.prototype.slice.call(options);

      var filtersGroup = _.groupBy(options, function (option) {
        return option.dataset.indicator;
      });

      return Object.keys(filtersGroup)
        .map(function(indicatorId) {
          var indicator = _.findWhere(this.options.indicators, { id: indicatorId });
          return {
            id: indicatorId,
            name: indicator.name,
            options: filtersGroup[indicatorId]
              .filter(function (option) { return option.checked; })
              .map(function (option) { return option.value; })
          };
        }, this)
        .filter(function (filter) {
          return filter.options.length;
        });
    },

    render: function () {
      this.$el.html(this.template({
        indicators: this._getFilteredIndicators()
      }));

      return this;
    },

    renderError: function () {
      this.el.innerHTML = '<p class="loading-error">' +
        'Unable to load the filters' +
        '<button type="button" class="c-button -retry js-retry">Retry</button>' +
        '</p>';

      this.setElement(this.el);
    }

  });
}.call(this, this.App));
