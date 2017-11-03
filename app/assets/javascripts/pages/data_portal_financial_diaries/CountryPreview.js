(function (App) {
  'use strict';

  App.Page.CountryPreview = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor'
    },

    initialize: function () {
      new App.Component.CountryPreview({
        onChangeCountry: function (country) {
          Turbolinks.visit('/data-portal/' + country);
        }
      });

      this._renderCharts();
    },

    _onClickAnchor: function (e) {
      e.preventDefault();

      var href = e.currentTarget.getAttribute('href').split('#');
      var target = '#' + href[1];

      $('html, body').animate({
        scrollTop: $(target).offset().top - 50
      });
    },

    _renderCharts: function () {
      var category = [{"category_type":"income","category_name":"ALL"}];
      var params = {
        project_name: gon.project_name,
        categories: window.encodeURIComponent(JSON.stringify(category)),
        api: FD_API_URL,
        subFilters: ''
      };

      var isTabletOrHigher = window.innerWidth >= 768;
      var el = isTabletOrHigher ?
        document.querySelector('#vis-main-chart') : document.querySelector('#vis-main-chart-mobile');

      new App.View.MainChartView({
        params: Object.assign(
          {},
          params,
          { title: 'Income' }
        ),
        el: el,
        showToolbar: false
      });
    }

  });

}).call(this, this.App);
