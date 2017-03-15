(function (App) {
  'use strict';

  App.Model.ChartWidgetModel = Backbone.Model.extend({

    // Check the default values in the initialize method
    // The values can't be placed here because Backbone.Model
    // will interprate them as the default model data
    defaults: {},

    initialize: function (options) {
      this.options = _.extend({}, {
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
      }, options);

      this.indicatorModel = new App.Model.IndicatorModel({}, this.options);
      if (this.options.analysisIndicatorId) {
        this.analysisIndicatorModel = new App.Model.IndicatorModel(
          {},
          _.extend({}, this.options, { id: this.options.analysisIndicatorId })
        );
      }
    },

    /**
     * Return the list of the columns of the indicator used for the analysis
     * NOTE: need the analysis indicator to be fetched
     * @returns {string[]} columns
     */
    _getAnalysisColumns: function () {
      var data = this.analysisIndicatorModel.get('data');
      if (!data) return [];
      return data.map(function (row) { return row.label; });
    },

    /**
     * Fetch the partial indicator models for the analysis
     * A partial indicator in an indicator filtered by one of the column of the
     * indicator used for the analysis.
     * @returns {object} $.Deferred
     */
    _fetchAnalysisPartials: function () {
      var analysisColumns = this._getAnalysisColumns();

      // For each column, we fetch the data of the main indicator, filtering
      // with it
      var partialIndicatorModels = analysisColumns.map(function (columnName) {
        return new App.Model.IndicatorModel(
          {},
          _.extend({}, this.options, {
            filters: (this.options.filters || []).concat(
              [{
                id: this.options.analysisIndicatorId,
                name: this.analysisIndicatorModel.get('title'),
                options: [columnName]
              }]
            )
          })
        );
      }, this);

      // We now fetch the data of each model
      return $.when.apply($,
        partialIndicatorModels.map(function (partialIndicatorModel) {
          // We can't directly return partialIndicatorModel.fetch() here because we need the
          // data to be parsed
          var deferred = $.Deferred();
          partialIndicatorModel.fetch()
            .done(function () { deferred.resolve(partialIndicatorModel.toJSON()); })
            .fail(deferred.reject);
          return deferred;
        })
      );
    },

    /**
     * Join the partial indicators to form the complete datasets
     * Each row will get a "group" attribute with the name of the column used to retrieve the data
     * @returns {object[]}
     */
    _joinAnalysisPartials: function () {
      var analysisColumns = this._getAnalysisColumns();

      // List of all the partial indicators
      var partialIndicators = Array.prototype.slice.call(arguments).map(function (arg) {
        return arg;
      });

      var res = _.extend({}, partialIndicators[0], { data: [] });

      res.data = analysisColumns.map(function (columnName, index) {
        // The method below mutates the original dataset
        return partialIndicators[index].data.map(function (row) {
          row.group = columnName;
          row.groupPercentage = _.findWhere(this.analysisIndicatorModel.get('data'), { label: columnName }).percentage;
          return row;
        },this);
      }, this).reduce(function (res, data) {
        return res.concat(data);
      }, []);

      return res;
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
        // We first need to fetch the data of the indicator used for the
        // analysis in order to get its columns
        this.analysisIndicatorModel.fetch()
          // We then fetch all the information of the widget by combining the
          // data of the same indicator filtered with each of the columns of the
          // indicator used for the analysis
          .then(this._fetchAnalysisPartials.bind(this))
          // We finally gather all the information into this model
          .then(this._joinAnalysisPartials.bind(this))
          .done(function(data) {
            this.set(data);
            deferred.resolve.apply(this, arguments);
          }.bind(this))
          .fail(deferred.reject);
      }

      return deferred;
    },

  });

}).call(this, this.App);
