(function (App) {
  App.View.ReportFixedBar = Backbone.View.extend({

    className: 'c-report-fixed-bar',

    template: function (params) {
      return '<a href="/data-portal/report?p=' + params.encodedIndicators + '"> \
        <span class="go-to-report">Go to report</span> \
        <span class="widgets-total">(' + params.widgetsOnReport
          + ' ' + params.literal + ')</span> </a>';
    },

    initialize: function () {
      this._setEventListeners();
      this.render();
    },

    _setEventListeners: function () {
      Backbone.Events.on('indicator:saved', this.render.bind(this));
    },

    /**
     * Encondes saved indicators array to b64. More info in helpers/url
     * @return base64 string of saved indicator array
     */
    _encodeIndicators: function () {
      return App.Helper.URL.encode({ indicators: localStorage.getItem('indicators') });
    },

    render: function () {
      var widgetsOnReport = localStorage.getItem('indicators') ? JSON.parse(localStorage.getItem('indicators')).length : null;

      this.el.classList.toggle('_is-hidden', !widgetsOnReport);

      $('body').append($(this.el).html(
        this.template({
          encodedIndicators: this._encodeIndicators(),
          widgetsOnReport: widgetsOnReport,
          literal: widgetsOnReport > 1 ? 'widgets' : 'widget'
        })
      ));
    }

  });
}.call(this, this.App));
