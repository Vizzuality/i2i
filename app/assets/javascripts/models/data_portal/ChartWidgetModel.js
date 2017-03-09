(function (App) {
  'use strict';

  App.Model.ChartWidgetModel = Backbone.Model.extend({

    defaults: {
      // Indicator id
      id: null,
      // Country ISO
      iso: null,
      // Year
      year: null,
      // List of filters
      // See _filters in App.Page.DataPortalCountryPage to see their format
      filters: [],
      // Id of the indicator used for the analysis
      // NOTE: can't be modified after instantiation
      analysisIndicatorId: null
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      this.indicatorModel = new App.Model.IndicatorModel(this.options);
      if (this.options.analysisIndicatorId) {
        this.analysisIndicatorModel = new App.Model.IndicatorModel(
          _.extend({}, this.options, { id: this.options.analysisIndicatorId })
        );
      }
    },

    /**
     * Fetch the model's data
     * @returns {object} $.Deferred
     */
    fetch: function () {
      var deferred = $.Deferred();

      if (!this.analysisIndicatorModel) {
        this.indicatorModel.fetch()
          .done(function() {
            this.set(this.indicatorModel.toJSON());
            deferred.resolve.apply(this, arguments);
          }.bind(this))
          .fail(deferred.reject);
      } else {
        console.log('complicado');
      }

      return deferred;
    },

  });

}).call(this, this.App);
