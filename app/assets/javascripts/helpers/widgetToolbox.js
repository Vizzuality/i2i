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
    var chartConfig = App.Helper.ChartConfig.filter(function (chart) {
      return chart.visible !== false;
    });

    return new Jiminy(this.dataset, chartConfig);
  };

  /**
   * Return the list of charts that can be generated with the dataset
   * @returns {string[]}
   */
  App.Helper.WidgetToolbox.prototype.getAvailableCharts = function () {
    return this.jiminy.recommendation();
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
