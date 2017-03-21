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
        analysisIndicatorId: null,
        // List of the indicators used for the comparison
        // Check the property in App.View.ChartWidgetView to see the format
        compareIndicators: null
      }, options);

      this.indicatorModel = new App.Model.IndicatorModel({}, this.options);

      if (this.options.analysisIndicatorId) {
        this.analysisIndicatorModel = new App.Model.IndicatorModel(
          {},
          _.extend({}, this.options, { id: this.options.analysisIndicatorId })
        );
      }

      if (this.options.compareIndicators) {
        this.compareIndicatorsModels = this.options.compareIndicators.map(function (compareIndicator) {
          return new App.Model.IndicatorModel(
            {},
            {
              id: compareIndicator.id,
              iso: compareIndicator.iso,
              year: compareIndicator.year,
              filters: (this.options.filters || []).concat(compareIndicator.filters)
            }
          )
        }, this);
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
     * Join the partial indicators to form the complete dataset
     * Each row will get a "group" attribute with the name of the column used to retrieve the data
     * @returns {object[]}
     */
    _joinAnalysisPartials: function () {
      var analysisColumns = this._getAnalysisColumns();

      // List of all the partial indicators
      var partialIndicators = Array.prototype.slice.call(arguments);

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
     * Return the name of the compare group
     * @param {object} model Model of the partial indicator
     * @returns {string}
     */
    _getCompareGroupName: function (model) {
      if (model.options.filters && model.options.filters.length) {
        return model.options.filters[0].options[0] + ' ' + model.options.year;
      } else {
        return App.Helper.Indicators.COUNTRIES[model.options.iso] + ' ' + model.options.year;
      }
    },

    /**
     * Fetch the partial indicators for the comparison
     * A partial indicator represent the data of an indicator used for the comparison
     * @returns {object} $.Deferred
     */
    _fetchComparePartials: function () {
      return $.when.apply($,
        this.compareIndicatorsModels.map(function (compareIndicatorsModel) {
          // We can't directly return compareIndicatorsModel.fetch() here because we need the
          // data to be parsed
          var deferred = $.Deferred();
          compareIndicatorsModel.fetch()
            .done(function () { deferred.resolve(compareIndicatorsModel.toJSON()); })
            .fail(deferred.reject);
          return deferred;
        })
      );
    },

    /**
     * Join the partial indicators to form the complete dataset
     * Each row will get a "group" attribute with the name of the data represented
     * @returns {object[]}
     */
    _joinComparePartials: function () {
      var res = this.indicatorModel.toJSON();
      res.data = res.data.map(function (row) {
        return _.extend({}, row, { group: this._getCompareGroupName(this.indicatorModel) });
      }, this);

      // We append the data of each partial indicator, changing the name of the group each time
      this.compareIndicatorsModels.forEach(function (compareIndicatorModel) {
        var data = compareIndicatorModel.get('data');
        data = data.map(function (row) {
          return _.extend({}, row, { group: this._getCompareGroupName(compareIndicatorModel) });
        }, this);

        res.data = res.data.concat(data);
      }, this);

      return res;
    },

    /**
     * Fetch the model's data
     * @returns {object} $.Deferred
     */
    fetch: function () {
      var deferred = $.Deferred();

      if (this.analysisIndicatorModel) {
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
      } else if (this.compareIndicatorsModels) {
        // We first fetch the data of the indicator
        this.indicatorModel.fetch()
          // We then fetch the data of all the indicators used for the comparison
          .then(this._fetchComparePartials.bind(this))
          // We finally join the data
          .then(this._joinComparePartials.bind(this))
          .done(function (data) {
            this.set(data)
            deferred.resolve.apply(this, arguments);
          }.bind(this))
          .fail(deferred.reject);
      } else {
        this.indicatorModel.fetch()
          .done(function() {
            this.set(this.indicatorModel.toJSON());
            deferred.resolve.apply(this, arguments);
          }.bind(this))
          .fail(deferred.reject);
      }

      return deferred;
    },

  });

}).call(this, this.App);
