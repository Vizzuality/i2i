((function (App) {
  'use strict';

  // This helper is key to help identify which widgets can be rendered
  // depending on the data we have

  /**
   * Constructor of the WidgetToolbox helper
   * @param {object[]} dataset
   */
  App.Helper.WidgetToolbox = function (dataset) {
    if (!dataset) {
      throw new Error('The widget toolbox needs to be constructed with a dataset');
    }
    this.dataset = dataset;
    this.jiminy = this._getJiminyInstance();
  };

  /* eslint-disable no-underscore-dangle */

  /**
   * Return an instance of Jiminy
   * @returns {object} instance
   */
  App.Helper.WidgetToolbox.prototype._getJiminyInstance = function () {
    return new Jiminy(this.dataset, App.Helper.ChartConfig);
  };

  /**
   * Return the list of charts that can be generated with the dataset
   * @returns {string[]}
   */
  App.Helper.WidgetToolbox.prototype.getAvailableCharts = function () {
    var isComplexIndicator = !!this.dataset[0].id;
    var availableCharts = this.jiminy.recommendation();

    return availableCharts.filter(function (chartName) {
      var chart = _.findWhere(App.Helper.ChartConfig, { name: chartName });
      var isComplexChart = chart.complex;
      return (isComplexIndicator && isComplexChart) || (!isComplexIndicator && !isComplexChart);
    });
  };

  /**
   * Return the charts configuration object
   * @return {object} chart config
   */
  App.Helper.WidgetToolbox.prototype.getChartConfig = function () {
    return App.Helper.ChartConfig;
  };

  /* eslint-enable no-underscore-dangle */
})(this.App));
