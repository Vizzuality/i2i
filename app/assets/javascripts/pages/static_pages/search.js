(function (App) {
  App.View.Search = Backbone.View.extend({
    initialize: function () {
      this._setVars();
      this._setEventListeners();
    },

    _setVars: function() {
      this.$searchContainer = $('#search-container');
      this.$searchButton = $('#search-button');
      this.$closeButton = $('#close-button');
      this.$searchInput = $('#search-input');
    },

    _setEventListeners: function () {
      this.$searchInput = $('#search-input');
      this.$searchButton.on('click', this._toggleSearch.bind(this));
      this.$closeButton.on('click', this._closeSearch.bind(this));
    },

    _toggleSearch: function () {
      this.$searchContainer.toggleClass('-open');
      if (this.$searchContainer.hasClass('-open')) {
        $('.c-modal-search').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e){
          $('#search-input').focus();
        })
      };
    },

    _closeSearch: function () {
      this.$searchContainer.removeClass('-open');
    }
  });

}).call(this, this.App);
