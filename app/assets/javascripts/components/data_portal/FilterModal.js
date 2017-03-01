(function (App) {

  App.Component.FilterModal = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/filters'],

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
      this.filters = this.options.filters;
      this.onDone = this.options.onDone;

      // Pages used in the modal
      this.pages = [
        new App.View.IndicatorSelection({
          indicatorsCollection: this.indicatorsCollection,
          filters: this.filters
        }),
        new App.View.IndicatorOptions({
          filters: this.filters
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
      return App.Helper.SerializeForm(document.querySelector('form'));
    },

    _renderNextPage: function () {
      // Removes previous view before render next one
      if (this.pages[this.currentIndexPage - 1] !== undefined) {
        this.pages[this.currentIndexPage].remove();
      }

      this.el.querySelector('.js-page-container').innerHTML = this.pages[this.currentIndexPage].render();
    },

    _onDoneBtnModal: function () {
      console.log('_onDoneBtnModal');
      var formData = this._retrieveDataForm();

      this.onDone(formData.indicators);

      this.parentView.onCloseModal.call(this);
    },

    render: function () {

      this.parentView.render.apply(this);

      this._renderNextPage();
    }
  });
}).call(this, this.App);
