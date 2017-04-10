(function (App) {
  App.Component.ModalSaveWidget = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/modal-save-widget'],

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Save widget',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      allowScroll: true,
      // See App.Component.Modal for details about this option
      isAbsolute: true,
      // See App.Component.Modal for details about this option
      footer: '<div class="group-button"><button type="button" class="c-button -white js-add-report">Add to report</button><button type="button" class="c-button -white js-remove-report">Remove from report</button></div><div class="group-button"><button disabled type="button" class="c-button -white -outline js-print">Print</button><button disabled type="button" class="c-button -white -outline">Download</button><button disabled type="button" data-slide-index="0" class="c-button -white -outline js-slide-button">Share</button></div>',
      // modifies locally the widget configuration to render it properly in the modal
      widgetConfig: {
        // See App.View.ChartWidgetView for details about this option
        showToolbar: false
      }
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-add-report': '_onAddReport',
        'click .js-remove-report': '_onRemoveReport',
        'click .js-slide-button': '_onSelectSlide',
        'click .js-print': '_onPrint'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this.render();
    },

    _setVars: function () {
      this.constructor.__super__._setVars.call(this);
      this.slides = [{
        view: new App.View.ShareView({
          callback: this._returnWidget.bind(this)
        })
      }];
    },

    //  *** localStorage private methods ***

    /**
     * Returns an array of indicators or an empty array
     * @return {object[]} - Array of indicators
     */
    _getSavedIndicators: function() {
      return localStorage.getItem('indicators') ?
        JSON.parse(localStorage.getItem('indicators')) : [];
    },

    /**
     * Serializes indicator's properties
     * @param {object} indicator - indicator to be serialiazed
     */
    _serializeIndicator: function(indicator) {
      return App.Helper.Indicators.serialize(indicator);
    },

    /**
     * Adds the given indicator to localStorage collection
     * @param {object} indicator - indicator to be added
     */
    _saveIndicator: function(indicator) {
      var savedIndicators = this._getSavedIndicators();
      var serializedIndicator = this._serializeIndicator(indicator);

      savedIndicators.push(serializedIndicator);
      localStorage.setItem('indicators', JSON.stringify(savedIndicators));

      Backbone.Events.trigger('indicator:saved');
    },

    /**
     * Removes the given indicator from localStorage collection
     * @param {object} indicatorToRemove - indicator to be removed
     */
    _removeIndicator: function(indicatorToRemove) {
      var serializedIndicator = this._serializeIndicator(indicatorToRemove);
      var savedIndicators = this._getSavedIndicators();
      savedIndicators = savedIndicators.filter(function (savedIndicator) {
        return !_.isEqual(savedIndicator, serializedIndicator);
      });

      localStorage.setItem('indicators', JSON.stringify(savedIndicators));
      Backbone.Events.trigger('indicator:saved');
    },

    /**
     * Check if the indicator is already saved in the localStorage object.
     * @param {object} indicator - checked indicator
     * @return {boolean} isEqual - It's saved or not
     */
    _isIndicatorSaved: function (indicator) {
      var serializedIndicator = this._serializeIndicator(indicator);
      var savedIndicators = this._getSavedIndicators();

      if (!savedIndicators.length) {
        return false;
      }

      var isSaved = savedIndicators.find(function (savedIndicator) {
        return _.isEqual(serializedIndicator, savedIndicator);
      });

      return !!isSaved;
    },

    //  *** END localStorage private methods ***

    /**
     * @return {object} - object with bounds and offsets properties of the modal
     */
    _getModalDimensions: function() {
      var bounds = this.options.widgetConfig.el.getBoundingClientRect();
      return {
        bounds: bounds,
        offsets: {
          top: bounds.top + document.body.scrollTop,
          left: bounds.left + document.body.scrollLeft
        }
      };
    },

    /**
     * Sets dimensions of the modal before render its content
     */
    _setDimensions: function () {
      var modalDimension = this._getModalDimensions();
      var modal = this.el.querySelector('.c-modal');
      var modalContent = modal.querySelector('.js-modal-content');

      modal.classList.add('-save-widget');
      modal.style.top = modalDimension.offsets.top + 'px';
      modal.style.left = modalDimension.offsets.left + 'px';

      modalContent.style.width = modalDimension.bounds.width + 'px';
      modalContent.style.height = modalDimension.bounds.height + 'px';
    },

    /**
     * Renders modal content and performs a scroll animation if needed.
     */
    _renderContent: function () {
      var modalDimension = this._getModalDimensions();

      // we assure the modal is completely displayed. This way focus won't center it
      if (modalDimension.offsets.top < document.body.scrollTop) {
        $('body').animate({
          // 52px is the height of the modal title
          scrollTop: modalDimension.offsets.top - 52
        }, 400, function () {
          this._renderWidget();
          this._renderSlides();

          this.constructor.__super__.afterRender.apply(this);
        }.bind(this));
      } else {
        this._renderWidget();
        this._renderSlides();

        this.constructor.__super__.afterRender.apply(this);
      }
    },

    /**
     * Toggle button classes based on widget saved status
     */
    _toggleButtons: function () {
      var currentIndicator = _.extend({}, this.options.widgetConfig);
      var isSaved = this._isIndicatorSaved(currentIndicator);

      this.el.querySelector('.js-add-report').classList.toggle('_is-hidden', isSaved);
      this.el.querySelector('.js-remove-report').classList.toggle('_is-hidden', !isSaved);
    },

    _onAddReport: function () {
      var indicator = _.extend({}, this.options.widgetConfig);

      // adds indicator to localStorage
      this._saveIndicator(indicator);

      this._toggleButtons();
    },

    _onRemoveReport: function () {
      var indicator = _.extend({}, this.options.widgetConfig);

      // removes indicator from localStorage
      this._removeIndicator(indicator);

      this._toggleButtons();
    },

    _onSelectSlide: function (event) {
      var slideIndex = parseInt(event.currentTarget.getAttribute('data-slide-index'), 10);
      this.setSlide(slideIndex);
    },

    // TO-DO: take a screenshot of the embed
    _onPrint: function () {
      console.warn('WIP!')
    },

    _renderWidget: function () {
      var widgetConfig = _.extend({}, this.options.widgetConfig, this.defaults.widgetConfig, {
        el: $(this.el).find('.js-widget-container')
      });

      new App.View.ChartWidgetView(widgetConfig);
    },

    _renderSlides: function () {
      this.slides.forEach(function (slide) {
        $(this.el.querySelector('.js-slider-container')).append(slide.view.render());
      }.bind(this));
    },

    _returnWidget: function () {
      this.setSlide(-1);
    },

    setSlide: function (slideIndex) {
      this.slides.forEach(function (slide) {
        slide.view.toggleVisibility(this.slides.indexOf(slide) === slideIndex);
      }.bind(this));
    },

    afterRender: function () {
      this._setDimensions();
      this._renderContent();
      this._toggleButtons();
    },

    render: function () {
      this.options.content = this.contentTemplate();
      this.constructor.__super__.render.apply(this);
    }
  });
}).call(this, this.App);
