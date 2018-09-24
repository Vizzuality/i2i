(function (App) {
  'use strict';

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor',
      'click .filter-finscope': 'showFinscope',
      'click .filter-financial-diaries': 'showFinancialDiaries',
      'click .filter-geospatial': 'showGeospatial',
      'click .see-all-countries': 'showAllCountries'
    },

    _onClickAnchor: function (e) {
      e.preventDefault();
      var target = e.currentTarget.getAttribute('href');

      $('html, body').animate({
        scrollTop: $(target).offset().top
      });
    },

    showFinscope: function() {
      var list = this.$el.find('.l-country-list');
      var selectDescription = this.$el.find('.select-country-description')[0];

      list.addClass("is-finscope");
      list.removeClass("is-financial-diaries");
      list.removeClass("is-geospatial");

      selectDescription.innerHTML = "National Surveys countries - \
                                     Please click on the country’s flag below to view \
                                     the datasets available for that country. \
                                     <a href='.l-country-list' class='see-all-countries js-anchor'>See all countries</a>";
    },

    showFinancialDiaries: function() {
      var list = this.$el.find('.l-country-list');
      var selectDescription = this.$el.find('.select-country-description')[0];

      list.addClass("is-financial-diaries");
      list.removeClass("is-finscope");
      list.removeClass("is-geospatial");

      selectDescription.innerHTML = "Financial Diaries countries - \
                                     Please click on the country’s flag below to view \
                                     the datasets available for that country. \
                                     <a href='.l-country-list' class='see-all-countries js-anchor'>See all countries</a>";
    },

    showGeospatial: function() {
      var list = this.$el.find('.l-country-list');
      var selectDescription = this.$el.find('.select-country-description')[0];

      list.addClass("is-geospatial");
      list.removeClass("is-finscope");
      list.removeClass("is-financial-diaries");

      selectDescription.innerHTML = "Geospatial data countries - \
                                     Please click on the country’s flag below to view \
                                     the datasets available for that country. \
                                     <a href='.l-country-list' class='see-all-countries js-anchor'>See all countries</a>";
    },

    showAllCountries: function() {
      var list = this.$el.find('.l-country-list');
      var selectDescription = this.$el.find('.select-country-description')[0];

      list.removeClass("is-finscope");
      list.removeClass("is-financial-diaries");
      list.removeClass("is-geospatial");

      selectDescription.innerHTML = 'Please click on the country’s flag below to \
                                     view the datasets available for that country.'
    }
  });

}).call(this, this.App);
