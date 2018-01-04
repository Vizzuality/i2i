(function (App) {
    App.Page.SearchPage = Backbone.View.extend({

        el: 'body',

        events: {
            'click .js-search-filters': '_openFiltersModal',
            'submit #search-input': '_handleSearchInput'
        },

        initialize: function (term, tagTerm) {
            this.term = gon.term || [];
            this.tagTerm = gon.selected_tags || [];
            this._setEventListeners();
            console.log(gon.selected_tags, 'loaded search page, this:', this.tagTerm)
        },

        _setEventListeners: function () {
            Backbone.Events.on('search:update', this._handleSearchTags.bind(this));
          },

        _handleSearchTags: function(event) {
            this.tagTerm = event['tag_term'];
            this._updateSearch();
        },

        _handleSearchInput: function(event) {
            event.preventDefault();
            this.term = $(event.currentTarget).find('.search-input').val();
            this._updateSearch();
        },

        _updateSearch: function() {
            var terms = $.param({
                term: this.term,
                tag_term: this.tagTerm.length > 0 ? this.tagTerm.join(',') : []
            });

            window.location.href = '/search?' + terms;
        },

        _openFiltersModal: function() {
            console.log('open filter');
            new App.View.SearchFiltersModal({selectedTags: this.tagTerm});
        }
    });
}).call(this, this.App);
