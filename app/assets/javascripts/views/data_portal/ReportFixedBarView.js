(function (App) {
  App.View.ReportFixedBar = Backbone.View.extend({

    className: 'c-report-fixed-bar',

    template: JST['templates/data_portal/report-fixed-bar'],

    initialize: function () {
      this._setEventListeners();
      this.render();
    },

    _setEventListeners: function () {
      Backbone.Events.on('localStorage:setItem', this.render.bind(this));
    },

    render: function () {
      var widgetsOnReport = localStorage.getItem('widgets') ? JSON.parse(localStorage.getItem('widgets')).length : null;

      this.el.classList.toggle('_is-hidden', !widgetsOnReport);

      $('body').append($(this.el).html(
        this.template({
          widgetsOnReport: widgetsOnReport,
          literal: widgetsOnReport > 1 ? 'widgets' : 'widget'
        })
      ));
    }

  });
}.call(this, this.App));
