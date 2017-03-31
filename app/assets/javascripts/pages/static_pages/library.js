(function (App) {

  App.Page.LibraryPage = Backbone.View.extend({

    el: 'body',

    defaults: {
      // Categories of items
      // Format:
      // [
      //   { id: number, name: string, subcategories: { id: number, name: string }[] }
      // ]
      categories: [],
      // Selected category
      selectedCategory: null,
      // Selected category
      selectedSubcategory: null
    },

    events: {
      'click .js-category-button': '_onClickCategory'
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      this._setVars();

      if (this.options.categories.length) {
        this.options.selectedCategory = this.options.categories[0];
        this._updateCategoryButtons();
        this._filter();
      }
    },

    _setVars: function () {
      this.items = Array.prototype.slice.call(this.el.querySelectorAll('.js-item'));
      this.categoryButtons = Array.prototype.slice.call(this.el.querySelectorAll('.js-category-button'));
      this.subCategoriesFilter = this.el.querySelector('.js-subcategory-filters');
    },

    /**
     * Event handler for when the user clicks on a category
     * @params {Event} e
     */
    _onClickCategory: function (e) {
      var categoryName = e.target.textContent;
      var category = _.findWhere(this.options.categories, { name: categoryName });

      this.options.selectedCategory = category;
      this.options.selectedSubcategory = null; // We reset the subcategory each time
      this._updateCategoryButtons();
      this._filter();
    },

    /**
     * Event handler executed when the user clicks on a subcategory
     * @param {{ id: number, string: name }} subcategory
     */
    _onClickSubcategory: function (subcategory) {
      this.options.selectedSubcategory = subcategory.name === 'All' ? null : subcategory;
      this._filter();
    },

    /**
     * Update the styles category buttons according to the selected one
     */
    _updateCategoryButtons: function () {
      this.categoryButtons.forEach(function (categoryButton) {
        categoryButton.classList.toggle('-current',
          categoryButton.textContent === this.options.selectedCategory.name);
      }, this);

      this._renderFilters();
    },

    /**
     * Filter the library items
     */
    _filter: function () {
      this.items.forEach(function (item) {
        var category = item.dataset.category;
        var subcategory = item.dataset.subcategory;
        item.style.display = (category === this.options.selectedCategory.name
          && (!this.options.selectedSubcategory || (subcategory === this.options.selectedSubcategory.name)))
          ? 'block'
          : 'none';
      }, this);
    },

    /**
     * Render the filters
     */
    _renderFilters: function () {
      var filters = Array.prototype.slice.call(this.options.selectedCategory.subcategories);
      filters.unshift({ id: -1, name: 'All' });

      // We prevent the events from being duplicated and raising errors as the classList
      // of filters changes
      if (this.filtersView) this.filtersView.undelegateEvents();

      this.filtersView = new App.Component.Filters({
        el: this.subCategoriesFilter,
        filters: filters,
        selectedFilter: this.options.selectedSubcategory || filters[0],
        callback: this._onClickSubcategory.bind(this)
      });
    }

  });
}).call(this, this.App);
