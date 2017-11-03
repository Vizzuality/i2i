(function (App) {
  App.View.ShareViewFinancial = App.Component.Slide.extend({

    template: JST['templates/data_portal/slides/shareWidget'],

    defaults: {
      // State of the widget
      // Correspond to ChartWidgetView.options
      widgetConfig: {}
    },

    events: {
      'click .js-back': 'onCallback',
      'click .js-copy': '_onCopy',
      'blur  .js-copy': '_onBlur'
    },

    initialize: function (options) {
      this.defaults = _.extend({}, this.defaults, {
        title: 'Sharing options'
      });

      App.Component.Slide.prototype.initialize.call(this, options);
    },

    _onCopy: function (e) {
      var copyButton = e.currentTarget;

      window.getSelection().removeAllRanges();
      var rangeSelection = document.createRange();
      rangeSelection.selectNode(copyButton.previousElementSibling);
      window.getSelection().addRange(rangeSelection)

      var confirmation = document.execCommand('copy');

      copyButton.innerText = confirmation ? 'Copied!' : 'Ops! Something went wrong!';
    },

    _onBlur: function (e) {
      e.currentTarget.innerText = 'Copy';
    },

    /**
     * Return the URL or code of a service
     * @param {string} service
     * @return {string}
     */
    _generateURL: function (service) {
      var widgetParams = Object.assign(
        {},
        { categories: this.options.widgetConfig.categories },
        { subFilters: this.options.widgetConfig.subFilters },
        { title: this.options.widgetConfig.title }
      );

      var widgetType = this.options.widgetConfig.shareOptions.spec;
      var embedUrl =  location.origin + location.pathname + '/embed/' + widgetType + '?p=' + window.btoa(JSON.stringify(widgetParams));
      var embedHeight = this.options.widgetConfig.el.offsetHeight + 65;
      var widgetURL = window.location.href;

      var urls = {
        embed_link: '<iframe height="' + embedHeight + '" width="1090" src="' + embedUrl + '" style="border:0;"></iframe>',
        facebook: 'http://www.facebook.com/sharer.php?u=' + widgetURL,
        page_link: widgetURL,
        twitter: 'https://twitter.com/intent/tweet?url=' + widgetURL
      };

      return urls[service] || '';
    },

    render: function () {
      this.options.content = this.template({
        embed_link: this._generateURL('embed_link'),
        facebook: this._generateURL('facebook'),
        page_link: this._generateURL('page_link'),
        twitter: this._generateURL('twitter')
      });

      return this.constructor.__super__.render.call(this);
    }

  });
}).call(this, this.App);
