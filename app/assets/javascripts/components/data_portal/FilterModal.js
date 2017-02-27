(function (App) {

  App.Component.FilterModal = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/filters'],
    defaults: {},

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-done-btn-modal': '_onDoneBtnModal',
        'click .js-add-indicators-btn': '_onAddIndicators'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);

      this._setVars();
      this.render();
    },

    _setVars: function () {
      this.parentView = this.constructor.__super__;
      this.parentView._setVars.call(this);
      this.indicatorsCollection = this.options.indicatorsCollection;

      // Pages used in the modal
      this.pages = [
        new App.View.IndicatorSelection({
          indicatorsCollection: this.indicatorsCollection
        }),
        new App.View.IndicatorOptions({
          indicatorsCollection: this.indicatorsCollection
        })
      ];

      this.currentIndexPage = 0;
    },

    _onAddIndicators: function () {
      // TO-DO: save selected options
      this._onNextPage();
    },

    _onNextPage: function () {
      if (this.pages[this.currentIndexPage + 1] === undefined) return;

      this._retrieveDataForm();

      this.currentIndexPage++;
      this._renderNextPage();
    },

    _retrieveDataForm: function () {
      var formData = App.Helper.SerializeForm(document.querySelector('form'));

      this.indicatorsCollection.setFilteredIndicators(formData.indicators);
    },

    _renderNextPage: function () {
      // Removes previous view before render next one
      if (this.pages[this.currentIndexPage - 1] !== undefined) {
        this.pages[this.currentIndexPage].remove();
      }

      this.el.querySelector('.js-page-container').innerHTML = this.pages[this.currentIndexPage].render();
    },

    _onDoneBtnModal: function () {
      // put here whatever need to be done before close modal.

      this.parentView.onCloseModal.call(this);
    },

    render: function () {

      this.parentView.render.apply(this);

      this._renderNextPage();
    }
  });
}).call(this, this.App);
