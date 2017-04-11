(function (App) {
  App.Component.ModalDownloadAll = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/modal-download-all'],

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Download All',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<div class="group-button"><button class="c-button -white js-close">Close</button></div><div class="group-button"><a disabled href="#" download class="c-button -sea js-continue">Continue</a></div>'
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-close': 'onCloseModal',
        'click .js-continue': '_onContinue'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);
      this.render();
    },

    _setFormVars: function () {
      this.form = this.el.querySelector('form');

      this.emailField = this.form.querySelector('.js-email');
      this.termsCheckbox = this.form.querySelector('.js-terms');

      this.continueButton = this.el.querySelector('.js-continue');
    },

    _setFormEventListeners: function () {
      this.emailField.addEventListener('keyup', this._validationForm.bind(this));
      this.termsCheckbox.addEventListener('change', this._validationForm.bind(this));
    },

    _onContinue: function () {
      // whatever needed to do after click on the 'continue' button
    },

    /**
     * Validates if email is filled properly and terms and conditions are accepted
     */
    _validationForm: function () {
      if (this.emailField.checkValidity() && this.termsCheckbox.checked) {
        this.continueButton.removeAttribute('disabled');
      } else {
        this.continueButton.setAttribute('disabled', 'disabled');
      }
    },

    /**
     * Generates url link based on iso and year params
     * @return { string } - generated link
     */
    _generateLink: function () {
      return 'https://s3-us-west-1.amazonaws.com/i2i-bucket/files/' + this.options.iso +'-' + this.options.year + '.zip';
    },

    /**
     * Sets the href attribute of the link
     */
    _setDownloadLink: function () {
      this.continueButton.setAttribute('href', this._generateLink());
    },

    afterRender: function () {
      this.constructor.__super__.afterRender.apply(this);
      this._setFormVars();
      this._setFormEventListeners();
      this._setDownloadLink();
    },

    render: function () {
      this.options.content = this.contentTemplate();
      this.constructor.__super__.render.apply(this);
    }
  });
}).call(this, this.App);
