(function (App) {
  'use strict';

  var Model = Backbone.Model.extend({
    initialize: function (indicatorId, iso, year, filters) {
      this.indicatorId = indicatorId;
      this.iso = iso;
      this.year = year;
      this.filters = filters;
    },

    url: function() {
      var url =  API_URL + '/indicator/' + this.indicatorId + '?' + this.iso + '=' + this.year;

      if (this.filters.length) {
        var filters = this.filters.map(function (filter) {
          return {
            indicatorId: filter.id,
            value: filter.options
          };
        }.bind(this));
        url += '&filters=' + JSON.stringify(filters);
      }

      return url;
    },

    parse: function (data) {
      return {
        title: data.title,
        data: data.data.map(function (answer) {
          return {
            id: answer.answerId,
            label: answer.value.slice(0, 22) + (answer.value.length > 21 ? '...' : ''),
            count: answer.count,
            total: answer.sum,
            percentage: answer.percentage
          };
        })
      };
    }
  });

  // TODO: to be removed
  var mockupData = {
    name: 'Settlement',
    data: [
      { label: 'Rural', count: 18943, total: 36441, percentage: 0.519 },
      { label: 'Urban', count: 11046, total: 36441, percentage: 0.303 },
      { label: 'Other', count: 6450, total: 36441, percentage: 0.178 }
    ]
  };

  App.View.ChartWidgetView = Backbone.View.extend({

    template: JST['templates/data_portal/chart-widget'],

    defaults: {
      // Ratio between the height and the width (i.e. height = chartRatio * width)
      // This ratio can be updated according to the chart config App.Helper.ChartConfig
      chartRatio: 0.5,
      // Name of the default chart type
      chart: null,
      // Inner width of the chart, used internally
      _width: null,
      // Inner height of the chart, used internally
      _height: null,
      // Indicator ID
      id: null,
      // ISO of the country
      iso: null,
      // Selected year
      year: null,
      // Filters on the data
      // See _filters in App.Page.DataPortalCountryPage to see their format
      filters: []
    },

    events: {
      'click .js-retry-indicator': '_fetchData',
      'click .js-change': '_onChange'
    },

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
      this.model = new Model(this.options.id, this.options.iso, this.options.year, this.options.filters);

      // We show the spinning loader
      this._showLoader();

      this._fetchData();
    },

    /**
     * Set the listeners that doesn't depend on a DOM node
     */
    _setListeners: function () {
      window.addEventListener('resize', _.debounce(this._onResize.bind(this), 150));
    },

    /**
     * Event handler for when the window is resized
     */
    _onResize: function () {
      if (!this.options.chart) return;

      /* eslint-disable no-underscore-dangle */
      var previousWidth = this.options._width;
      var previousHeight = this.options._height;
      /* eslint-enable no-underscore-dangle */

      var newDimensions = this._computeChartDimensions();
      if (newDimensions.width !== previousWidth || newDimensions.height !== previousHeight) {
        this._renderChart();
      }
    },

    /**
     * Event handler for when the user clicks the change button
     */
    _onChange: function () {
      // We retrieve the list of all the charts that can be built with vega
      var charts = App.Helper.ChartConfig.map(function(chart) {
        return {
          name: chart.name,
          available: false,
          selected: this.options.chart === chart.name
        };
      }, this);

      // We update the object to tell which ones are available with the current
      // dataset
      this.widgetToolbox.getAvailableCharts().forEach(function (availableChart) {
        var chart = _.findWhere(charts, { name: availableChart });
        if (chart) chart.available = true;
      });

      // We instantiate the modal
      new App.Component.ModalChartSelector({
        charts: charts,
        continueCallback: this._onChangeChart.bind(this)
      });
    },

    /**
     * Event handler fow when the chart is changed
     * @param {string} chart - chosen chart
     */
    _onChangeChart: function (chart) {
      if (this.options.chart === chart) return;

      this.options.chart = chart;
      this.render();
    },

    /**
     * Fetch the data for the widget
     */
    _fetchData: function () {
      this.model.fetch()
        .done(function () {
          var data = this.model.get('data');
          if (data.length) this.widgetToolbox = new App.Helper.WidgetToolbox(data);

          // If the indicator doesn't have any data, we also want to send an event
          // to notify the parent view about it
          this.trigger('data:sync', {
            id: this.options.id,
            name: this.model.get('title'),
            data: data
          });

          // We pre-render the component with its template
          this.el.innerHTML = this.template({
            name: this.model.get('title'),
            noData: !data.length
          });
          this.chartContainer = this.el.querySelector('.js-chart');

          this.render();
          this._setListeners();
        }.bind(this))
        .fail(this.renderError.bind(this))
        .always(this._hideLoader.bind(this));
    },

    /**
     * Show the spinning loader
     */
    _showLoader: function () {
      this.el.classList.add('c-spinning-loader');
    },

    /**
     * Hide the spinning loader
     */
    _hideLoader: function () {
      this.el.classList.remove('c-spinning-loader');
    },

    /**
     * Compute the chart dimensions
     * @returns {{ width: number, height: number}}
     */
    _computeChartDimensions: function () {
      // We render the template with fake data in order to parse it as a JS object and retrieve the padding
      var chartTemplate = JSON.parse(this._getChartTemplate()({
        data: JSON.stringify([]),
        label: JSON.stringify(''),
        width: JSON.stringify(''),
        height: JSON.stringify('')
      }));

      var containerDimensions = this.chartContainer.getBoundingClientRect();

      var padding = _.extend({}, chartTemplate.padding, {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      });

      var width = Math.round(containerDimensions.width - padding.left - padding.right);
      var height = Math.round(width * this._getChartRatio());

      // We save the current dimensions of the chart to diff them whenever the window is resized in order to minimize
      // the number of re-renders
      /* eslint-disable no-underscore-dangle */
      this.options._width = width;
      this.options._height = height;
      /* eslint-enable no-underscore-dangle */

      return {
        width: width,
        height: height
      };
    },

    /**
     * Get the chart Handlebars template
     * @returns {function}
     */
    _getChartTemplate: function () {
      return JST['templates/data_portal/widgets/' + this.options.chart];
    },

    /**
     * Get the chart ratio
     * @returns {number}
     */
    _getChartRatio: function () {
      var chartConfig = _.findWhere(App.Helper.ChartConfig, { name: this.options.chart });
      return chartConfig.ratio || this.options.chartRatio;
    },

    /**
     * Generate the vega spec
     * @returns {object}
     */
    _generateVegaSpec: function () {
      if (!this.options.chart) {
        // If no data, we render the dedicated chart
        if (!this.model.get('data').length) {
          this.options.chart = 'empty';
        } else {
          var availableCharts = this.widgetToolbox.getAvailableCharts();
          if (availableCharts.length) {
            this.options.chart = availableCharts[0];
          } else {
            // eslint-disable-next-line no-console
            console.warn('Unable to generate a chart out of the current dataset');
            return {};
          }
        }
      }

      var chartDimensions = this._computeChartDimensions();

      return this._getChartTemplate()({
        data: JSON.stringify(this.model.get('data')),
        width: chartDimensions.width,
        height: chartDimensions.height
      });
    },

    /**
     * Create the chart and append it to the DOM
     */
    _renderChart: function () {
      // TODO: If no data, we render an empty chart

      vg.parse
        .spec(JSON.parse(this._generateVegaSpec()), function (error, chart) {
          this.chart = chart({ el: this.chartContainer, renderer: 'svg' }).update();
        }.bind(this));
    },

    render: function () {
      this._renderChart();
      return this.el;
    },

    renderError: function () {
      this.el.innerHTML = '<p class="loading-error">' +
        'Unable to load the indicator' +
        '<button type="button" class="c-button -retry js-retry-indicator">Retry</button>' +
        '</p>';

      this.setElement(this.el);
    }

  });

}).call(this, this.App);
