(function (App) {
  'use strict';

  App.Page.DataPortalIndexPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor',
      'click .filter-finscope': 'showFinscope',
      'click .filter-financial-diaries': 'showFinancialDiaries'
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
      list.addClass("is-finscope");
      list.removeClass("is-financial-diaries");
    },

    showFinancialDiaries: function() {
      var list = this.$el.find('.l-country-list');
      list.addClass("is-financial-diaries");
      list.removeClass("is-finscope");
    }
  });

}).call(this, this.App);
