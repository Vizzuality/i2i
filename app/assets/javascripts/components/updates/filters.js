((function (App) {

  App.Component.Filters = Backbone.View.extend({

    template: JST['templates/updates/subcategories'],

    defaults: {
      // List of filters
      // Format: { id: number, name: string }[]
      filters: [],
      // Active filter
      selectedFilter: null,
      // Callback to execute when the active filter is changed
      // Get passed the active filter
      callback: function () {}
    },

    events: {
      'click .js-filter': '_onFilter'
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      this.render();
    },

    /**
     * Event handler executed when the user selects one of the filters
     * @param {Event} e
     */
    _onFilter(e) {
      this.options.selectedFilter = _.findWhere(this.options.filters, {
        name: e.currentTarget.getAttribute('data-filter')
      });

      this.options.callback(this.options.selectedFilter);

      this.render();
    },

    render: function () {
      this.$el.html(this.template({
        filters: this.options.filters,
        selectedFilter: this.options.selectedFilter
      }));
    }

  });
}).call(this, this.App));
