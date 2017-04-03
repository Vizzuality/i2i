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
      footer: '<button type="button" class="c-button -medium -white -outline js-button">Add to report</button><div class="group-button"><button type="button" class="c-button -medium -white -disabled js-print">Print</button><button type="button" class="c-button -medium -white -disabled">Download</button><button type="button" data-slide-index="0" class="c-button -medium -white js-slide-button">Share</button></div>',
      // TO-DO: add description
      widgetConfig: {
        // See App.View.ChartWidgetView for details about this option
        showToolbar: false
      }
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
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
      var widgetConfig = _.extend({}, this.options.widgetConfig, {
        el: $(this.el).find('.js-widget-container'),
        showToolbar: this.defaults.widgetConfig.showToolbar
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
        slide.view.toggleVisibility(this.slides.indexOf(slide) === slideIndex)
      }.bind(this));
    },

    render: function () {
      this.options.content = this.contentTemplate();
      this.constructor.__super__.render.apply(this);

      this._setPosition();
      this._renderWidget();
      this._renderSlides();
    }

  });
}).call(this, this.App);
