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

      this.reportWidgets = localStorage.getItem('widgets') ?
        JSON.parse(localStorage.getItem('widgets')) : [];
    },

    /**
     * @return object - object with bounds and offsets properties of the modal
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
      var isAdded = this._isWidgetAdded();

      this.el.querySelector('.js-add-report').classList.toggle('_is-hidden', isAdded);
      this.el.querySelector('.js-remove-report').classList.toggle('_is-hidden', !isAdded);
    },

    _addWidgetToReport: function (widget) {
      this.reportWidgets.push(widget);
      localStorage.setItem('widgets', JSON.stringify(this.reportWidgets));
      Backbone.Events.trigger('localStorage:setItem');
    },

    _removeWidgetFromReport: function (widget) {
      this.reportWidgets = this.reportWidgets.filter(function (w) {
        return !_.isEqual(w, widget);
      });

      localStorage.setItem('widgets', JSON.stringify(this.reportWidgets));
      Backbone.Events.trigger('localStorage:setItem');
    },

    /**
     * Check if the widget is already added in the localStorage object.
     * @return boolean - It's added or not
     */
    _isWidgetAdded: function () {
      var widgetConfig = _.extend({}, this.options.widgetConfig);

      // Check this... Try to avoid
      // removes unnecessary attributes
      delete widgetConfig.el;
      delete widgetConfig.showToolbar;

      if (!this.reportWidgets.length) {
        return false;
      }

      var isEqual = this.reportWidgets.find(function (w) {
        return _.isEqual(widgetConfig, w);
      });

      return !!isEqual;
    },

    _onAddReport: function () {
      var widgetConfig = _.extend({}, this.options.widgetConfig);
      // removes unnecessary attributes
      delete widgetConfig.el;
      delete widgetConfig.showToolbar;

      // adds widget to localStorage
      this._addWidgetToReport(widgetConfig);

      // disables 'Add to report' button once the widget is added
      this.el.querySelector('.js-add-report').classList.add('_is-hidden');
      this.el.querySelector('.js-remove-report').classList.remove('_is-hidden');
    },

    _onRemoveReport: function () {
      var widgetConfig = _.extend({}, this.options.widgetConfig);
      // removes unnecessary attributes
      delete widgetConfig.el;
      delete widgetConfig.showToolbar;

      this._removeWidgetFromReport(widgetConfig);

      this.el.querySelector('.js-add-report').classList.remove('_is-hidden');
      this.el.querySelector('.js-remove-report').classList.add('_is-hidden');
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
