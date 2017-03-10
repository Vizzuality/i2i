
(function (App) {
  App.Page.EventsPage = Backbone.View.extend({

    defaults: {
      filter: 'all'
    },

    initialize: function () {
      this._setVars();
      this._setListeners();

      this._onFilter(this.defaults.filter);
    },

    _setVars: function () {
      this.filters = Array.prototype.slice.call(document.querySelectorAll('.js-event-filter-btn'));
      this.eventGrid = document.querySelector('.l-card-grid');
      this.eventGridClassName = this.eventGrid.classList.toString();
    },

    _setListeners: function () {
      this.filters.forEach(function (filterElem) {
        filterElem.addEventListener('click', function (e) {
          this._onFilter(e.currentTarget.getAttribute('data-filter'));
        }.bind(this));
      }.bind(this));
    },

    /**
     * Filters grid based on CSS match selection
     */
    _applyFilter: function(filter) {
      this.eventGrid.className = '';

      if (filter === 'all') {
        this.eventGrid.classList.add(this.eventGridClassName);
      } else {
        this.eventGrid.classList.add(this.eventGridClassName, '-only-' + filter);
      }
    },

    /**
     * Toggles CSS class based on filter value
     */
    _toggleButtons: function (filterBy) {
      this.filters.forEach(function (filterElem) {
        var timestamp = filterElem.getAttribute('data-filter');
        filterElem.classList.toggle('-applied', timestamp === filterBy)
      });
    },

    _onFilter: function (filterBy) {
      this._toggleButtons(filterBy);
      this._applyFilter(filterBy);
    }

  });
}).call(this, this.App);
