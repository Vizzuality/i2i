(function (App) {
  'use strict';

  var gridColor = 'rgba(0, 29, 34, 0.1)';
  var fontColor = '#001D22';

  var vegaTheme = {
    background: 'white',

    axis: {
      domainWidth: 0,

      gridDash: [3],
      gridColor: gridColor,
      gridWidth: 0.5,

      labelFont: 'Open Sans',
      labelFontSize: 11,
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
    area: {
      opacity: 0.8,
      interpolate: 'monotone',
      strokeWidth: 1
    },

    range: {
      category: [
        "#F95E31", // orange
        "#a30d6f", // purple
        "#84a62d", // green
        "#1daac3", // blue
        "#001d22" // gray
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
      },
      report: false,
      showToolbar: true
    },

    events: {
      'click .js-save': '_onSave'
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

      // Resize
      $(window)
        .off('resize', this.onResizeWindow)
        .on('resize', _.debounce(_.bind(this.onResizeWindow, this), 300));
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

      // Overriding background color
      resultSpec.background = 'white';

      // Overriding width
      resultSpec.width = width - (parseInt(resultSpec.padding || 0) * 2);

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
      this.currentSpec = spec || this.currentSpec;
      this.el.classList.add('c-spinning-loader');

      var self = this;
      var runtime = this.parseSpec(this.currentSpec);
      var customLoadEvent;
      if (window.CustomEvent) {
        customLoadEvent = new CustomEvent('customLoad');
      } else {
        customLoadEvent = document.createEvent('CustomEvent');
        customLoadEvent.initCustomEvent('customLoad', true, true);
      }

      // Remove old event listeners
      if (this.chart) this.chart.finalize();

      // Rendering chart
      this.chart = new vega.View(runtime)
        .renderer(this.options.renderer)
        .initialize(this.chartElement.get(0));

      this.chart.toCanvas().then(function() {
        // dispatchs custom load event
        window.dispatchEvent(customLoadEvent);
        // removes spinner
        this.el.classList.remove('c-spinning-loader');
      }.bind(this));

      // Interaction: Tooltip
      if (this.options.customTooltip) {
        var noAllowedNames = ['end0', 'end', 'yend0', 'yend', 'brush', 'yBrush'];

        this.chart.addEventListener('mousemove', function(event, item) {
          if (item && (item.mark.marktype === 'symbol' || item.mark.marktype === 'rect')) {
            if (_.contains(noAllowedNames, item.mark.name)) return;
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

    onResizeWindow: function() {
      var self = this;
      var width = this.chartElement.width();

      if (this.chart) {
        requestAnimationFrame(function() {
          // Redraw
          self.chart.width(width).run();
        });
      }
    },

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

    /**
     * Event handler for when the user clicks the save button
     */
    _onSave: function () {
      new App.Component.ModalSaveWidgetFinancial({
        widgetConfig: Object.assign(
          {},
          this.options.params,
          { el: this.options.el },
          { shareOptions: this.options.shareOptions },
          { onClick: this.options.onClick || null }
        )
      });
    },

    render: function () {
      var spec = this.options.spec;

      this.$el.html(this.template({
        title: this.options.params.title,
        showToolbar: this.options.showToolbar,
        report: this.options.report
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
