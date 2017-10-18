(function (App) {
  'use strict';

  App.View.VegaChartView = Backbone.View.extend({

    defaults: {
      title: '',
      spec: 'https://vega.github.io/vega/examples/bar-chart.vg.json',
      vis: null,
      params: {
        a: 1,
        b: 2
      },
      renderer: 'svg'
    },

    template: JST['templates/financial_diaries/vega_chart'],

    /**
     * @param  {Object} settings
     */
    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, this.options || {}, settings);
      if (!this.el) return;
      this.render();
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
      var resultSpec = originalSpec;
      var params = this.options.params || {};

      if (this.options.params) {
        resultSpec = JSON.parse(_.template(JSON.stringify(resultSpec), params)());
      }

      return vega.parse(resultSpec);
    },

    /**
     * @param {String} urlSpec
     */
    fetchChart: function(urlSpec) {
      var self = this;
      this.fetchSpecFromURL(this.options.url).then(function(data) {
        self.drawChart(JSON.parse(data));
      });
    },

    /**
     * @param {Object} spec
     */
    drawChart: function(spec) {
      this.chartElement = this.$el.find('.chart').get(0);
      this.chart = new vega.View(this.parseSpec(spec))
        .renderer(this.options.renderer)
        .initialize(this.chartElement)
        .hover()
        .run();
    },

    /**
     * @param {Object} newOptions
     */
    setOptions: function(newOptions) {
      this.options = Object.assign({}, this.options || {}, newOptions);
      this.render();
    },

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
