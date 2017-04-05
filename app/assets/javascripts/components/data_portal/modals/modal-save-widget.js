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
      footer: '<button type="button" class="c-button -white js-button" disabled>Add to report</button><div class="group-button"><button disabled type="button" class="c-button -white -outline js-print">Print</button><button disabled type="button" class="c-button -white -outline">Download</button><button disabled type="button" data-slide-index="0" class="c-button -white -outline js-slide-button">Share</button></div>',
      // modifies locally the widget configuration to render it properly in the modal
      widgetConfig: {
        // See App.View.ChartWidgetView for details about this option
        showToolbar: false
      }
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-add-report': '_onAddReport',
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

    _setPosition: function () {
      var bounds = this.options.widgetConfig.el.getBoundingClientRect();
      var offsets = {
        top: bounds.top + document.body.scrollTop,
        left: bounds.left + document.body.scrollLeft
      };

      var modal = this.el.querySelector('.c-modal');
      var modalContent = modal.querySelector('.js-modal-content');

      modal.classList.add('-save-widget');
      modal.style.top = offsets.top + 'px';
      modal.style.left = offsets.left + 'px';

      modalContent.style.width = bounds.width + 'px';
      modalContent.style.height = bounds.height + 'px';

      // we assure the modal is completely displayed. This way focus won't center it
      if (offsets.top < document.body.scrollTop) {
        $('body').animate({
          // 52px is the height of the modal title
          scrollTop: offsets.top - 52
        }, 400, function () {
          this._renderWidget();
          this._renderSlides();

          // disables 'Add to Report' button once the modal is rendered if the widget is already added.
          if (this._isWidgetAdded()) {
            this.el.querySelector('.js-add-report').setAttribute('disabled', 'disabled');
          }

          this.constructor.__super__.afterRender.apply(this);
        }.bind(this));
      } else {
        this._renderWidget();
        this._renderSlides();

        // disables 'Add to Report' button once the modal is rendered if the widget is already added.
        if (this._isWidgetAdded()) {
          this.el.querySelector('.js-add-report').setAttribute('disabled', 'disabled');
        }

        this.constructor.__super__.afterRender.apply(this);
      }
    },

    _addWidgetToReport: function (widget) {
      var widgetArray = localStorage.getItem('widgets') ?
        JSON.parse(localStorage.getItem('widgets')) : [];

      widgetArray.push(widget);
      localStorage.setItem('widgets', JSON.stringify(widgetArray));
    },

    /**
     * Check if the widget is already added in the localStorage object.
     * @return boolean - It's added or not
     */
    _isWidgetAdded: function () {
      var widgetArray = localStorage.getItem('widgets') ?
        JSON.parse(localStorage.getItem('widgets')) : [];
      var widgetConfig = _.extend({}, this.options.widgetConfig);

      // Check this... Try to avoid
      // removes unnecessary attributes
      delete widgetConfig.el;
      delete widgetConfig.showToolbar;

      if (!widgetArray.length) {
        return false;
      }

      var isEqual = widgetArray.find(function (w) {
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
      this.el.querySelector('.js-add-report').setAttribute('disabled', 'disabled');
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
      this._setPosition();
    },

    render: function () {
      this.options.content = this.contentTemplate();
      this.constructor.__super__.render.apply(this);
    }
  });
}).call(this, this.App);
