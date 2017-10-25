(function (App) {
  'use strict';

  var gridColor = 'rgba(0, 29, 34, 0.1)';
  var fontColor = '#001D22';

  var vegaTheme = {
    background: null,

    axis: {
      domainWidth: 0,

      gridDash: [3],
      gridColor: gridColor,
      gridWidth: 0.5,

      labelFont: 'Open Sans',
      labelFontSize: 13,
      labelColor: fontColor,

      tickWidth: 0,
      tickColor: gridColor,
    },

    symbol: {
      size: 20
    },

    line: {
      opacity: 1,
      interpolate: 'monotone',
      strokeWidth: 1
    },

    range: {
      category: [
        '#2F939C',
        '#001D22',
        '#EDC72F',
        '#F95E31'
      ]
    }
  };

  App.View.VegaChartView = Backbone.View.extend({

    defaults: {
      title: '',
      spec: 'https://vega.github.io/vega/examples/bar-chart.vg.json',
      vis: null,
      params: {},
      renderer: 'svg',
      customTooltip: false,
      customTooltipOptions: {
        fields: []
      },
      tooltip: {
        showAllFields: true
      }
    },

    template: JST['templates/financial_diaries/vega_chart'],

    /**
     * @param  {Object} settings
     */
    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, this.options || {}, settings);
      // used by tooltip
      this.currentItem = {};

      if (!this.el) return;

      if (this.options.customTooltip) this.customTooltip = new App.Component.CustomTooltip();

      this.render();
      this.setListeners();
    },

    /**
     * @param  {String} url
     * @return {Promise}
     */
    fetchSpecFromURL: function(url) {
      return vega
        .loader()
        .load(url);
    },

    /**
     * @param  {Object} originalSpec
     * @return {Object}
     */
    parseSpec: function(originalSpec) {
      this.chartElement = this.$el.find('.chart');

      var width = this.chartElement.width();
      var resultSpec = Object.assign({}, originalSpec);
      var params = this.options.params || {};

      resultSpec.width = width;

      if (this.options.params) {
        resultSpec = JSON.parse(_.template(JSON.stringify(resultSpec))(params));
      }

      return vega.parse(resultSpec, vegaTheme);
    },

    /**
     * @param {String} urlSpec
     */
    fetchChart: function(urlSpec) {
      var self = this;
      this.fetchSpecFromURL(urlSpec).then(function(data) {
        self.drawChart(JSON.parse(data));
      });
    },

    /**
     * @param {Object} spec
     */
    drawChart: function(spec) {
      var self = this;
      var runtime = this.parseSpec(spec);

      // Rendering chart
      this.chart = new vega.View(runtime)
        .renderer(this.options.renderer)
        .logLevel(vega.Warn)
        .initialize(this.chartElement.get(0))
        .hover()
        .run();

      // Interaction: Tooltip
      if (this.options.customTooltip) {
        this.chart.addEventListener('mousemove', function(event, item) {
          if (item && (item.mark.marktype === 'symbol' || item.mark.marktype === 'rect')) {
            self.onTooltip.call(self, event, item);
          }
        });

        this.chart.addEventListener('mouseout', function(event, item) {
          self.customTooltip.hideTooltip();
        });
      } else {
        vegaTooltip.vega(this.chart, this.options.tooltip);
      }
    },

    /**
     * @param {Object} newOptions
     */
    setOptions: function(newOptions) {
      this.options = Object.assign({}, this.options || {}, newOptions);
      this.render();
    },

    /**
     * SetListeners
     */
    setListeners: function() {},

    /**
     * onTooltip
     * @param  {Event} event
     * @param  {Object} item
     */
    onTooltip: function(event, item) {
      var tooltipOptions = this.options.customTooltipOptions || {};

      var position = {
        x: event.clientX,
        y: event.clientY
      };

      this.customTooltip.setFields(tooltipOptions.fields);

      if(!_.isEqual(this.currentItem, item.datum)) {
        this.currentItem = item;
        this.customTooltip.renderContent(item.datum);
      }

      this.customTooltip.showTooltip();
      this.customTooltip.setPosition(position);
    },

    render: function () {
      var spec = this.options.spec;

      this.$el.html(this.template({
        title: this.options.params.title
      }));

      if (!spec) {
        throw Error('spec should be defined and it should be a JSON object or an URL string');
      }

      if (typeof spec === 'object') {
        this.drawChart(spec);
      } else if (typeof spec === 'string') {
        this.fetchChart(spec);
      } else {
        throw Error('spec should be a JSON object or an URL string');
      }

      return this.el;
    }

  });

}).call(this, this.App);
