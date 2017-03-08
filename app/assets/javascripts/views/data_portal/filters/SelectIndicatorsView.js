(function (App) {

  App.View.SelectIndicatorsView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/select-indicators'],

    defaults: {
      // List of indicators with their associated values
      // See _filters in App.Page.DataPortalCountryPage
      indicators: []
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
    },

    /**
     * Return the list of indicators grouped by category
     * @returns {{ category: string, indicators: object[]}[]}
     */
    _getGroupedIndicators: function () {
      var categories = _.groupBy(this.options.indicators, function (indicator) {
        return indicator.category;
      });

      return Object.keys(categories).map(function (category) {
        return {
          name: category,
          indicators: categories[category]
        };
      }, this);
    },

    /**
     * Return the list of selected indicators from the DOM
     * @returns {string[]}
     */
    _getSelectedIndicators: function () {
      var indicators = this.el.querySelectorAll('.js-indicator');
      indicators = Array.prototype.slice.call(indicators);
      return indicators.filter(function (indicator) {
        return indicator.checked;
      }).map(function (indicator) {
        return indicator.value;
      });
    },

    /**
     * Return the data associated with the tab
     * @returns {string[]}
     */
    getData: function () {
      return this._getSelectedIndicators();
    },

    render: function () {
      this.el.innerHTML = this.template({
        indicatorsbyCategories: this._getGroupedIndicators()
      });

      return this;
    }

  });
}.call(this, this.App));
