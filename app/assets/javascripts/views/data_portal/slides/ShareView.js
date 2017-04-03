(function (App) {
  App.View.ShareView = App.Component.Slide.extend({

    template: JST['templates/data_portal/slides/shareWidget'],

    className: 'slide',

    events: {
      'click .js-back': '_onBack',
      'click .js-copy': '_onCopy',
      'blur  .js-copy': '_onBlur'
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
     * generates an URL based on the service used.
     * { String service}
     */
    _generateShareURL: function (service) {
      var urls = {
        embed_link: 'Not available',
        facebook: 'http://www.facebook.com/sharer.php?u=' + window.location.href,
        page_link: window.location.href,
        twitter: 'https://twitter.com/intent/tweet?url=' + window.location.href
      };

      return urls[service] || '';
    },

    render: function () {
      this.options.content = this.template({
        embed_link: this._generateShareURL('embed_link'),
        facebook: this._generateShareURL('facebook'),
        page_link: this._generateShareURL('page_link'),
        twitter: this._generateShareURL('twitter')
      });
      this.constructor.__super__.render.call(this);

      return this.el;
    }

  });
}).call(this, this.App);
