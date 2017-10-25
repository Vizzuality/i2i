(function (App) {
  'use strict';

  App.View.VegaChartView = Backbone.View.extend({

    defaults: {
      title: '',
      spec: 'https://vega.github.io/vega/examples/bar-chart.vg.json',
      vis: null,
      params: {},
      renderer: 'svg',
      customTooltip: false,
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

      if (!this.el) return;

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

      return vega.parse(resultSpec);
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
        this.chart.addEventListener('mouseover', function(event, item) {
          if (item && item.mark.marktype !== 'line') {
            self.onTooltip.call(self, event, item);
          }
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
    onTooltip: function(event, item) {},

    render: function () {
      var spec = this.options.spec;

      this.$el.html(this.template({
        title: this.options.title
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
