
(function (App) {

  App.Page.LibraryPage = Backbone.View.extend({

    defaults: {
      type: 'publications'
    },

    initialize: function () {
      this._setVars();
      this._setEventListeners();

      this._toggleButtons(this.defaults.type);
      this._filterLibrary(this.defaults.type);
    },

    _setVars: function () {
      this.selectors = Array.prototype.slice.call(document.querySelectorAll('.content-selector'));
      this.library = document.querySelector('.l-card-grid');
      this.libraryClassName = this.library.classList.toString();
    },

    _filterLibrary: function (type) {
      this.library.className = '';
      this.library.classList.add(this.libraryClassName, '-only-' + type);
    },

    _toggleButtons: function (type) {
      this.selectors.forEach(function (selector) {
        var selectorType = selector.getAttribute('data-type');
        selector.classList.toggle('-current', selectorType === type);
      });
    },

    _onClickSelector: function (selector) {
      var type = selector.getAttribute('data-type');
      this._filterLibrary(type);
      this._toggleButtons(type);
    },

    _setEventListeners: function () {
      this.selectors.forEach(function (selector) {
        selector.addEventListener('click', function (e) {
          this._onClickSelector(e.currentTarget);
        }.bind(this));
      }.bind(this));
    }

  });
}).call(this, this.App);
