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
      footer: '<button type="button" class="c-button -white js-button">Add to report</button><div class="group-button"><button disabled type="button" class="c-button -white -outline js-print">Print</button><button disabled type="button" class="c-button -white -outline">Download</button><button disabled type="button" data-slide-index="0" class="c-button -white -outline js-slide-button">Share</button></div>',
      // modifies locally the widget configuration to render it properly in the modal
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

      // we assure the modal is completely displayed. This way focus won't center it
      if (offsets.top < document.body.scrollTop) {
        $('body').animate({
          // 52px is the height of the modal title
          scrollTop: offsets.top - 52
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
