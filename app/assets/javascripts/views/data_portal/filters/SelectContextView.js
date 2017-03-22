(function (App) {

  var Collection = Backbone.Collection.extend({

    initialize: function (attributes, options) {
      this.options = _.extend({}, options);
    },

    url: function () {
      return API_URL + '/country/';
    },

    parse: function (data) {
      return _.findWhere(data, { iso: this.options.iso })
        .year
        .map(function (years) {
          return { value: years.year };
        });
    }

  });

  App.View.SelectContextView = Backbone.View.extend({

    template: JST['templates/data_portal/filters/select-context'],

    defaults: {
      // Current ISO
      iso: null,
      // Current year
      year: null
    },

    events: {
      'click .js-retry-context': '_fetchData',
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
      this.collection = new Collection({}, { iso: this.options.iso });
      this._fetchData();
    },

    /**
     * Fetch the list of years and render the View
     */
    _fetchData: function () {
      this.collection.fetch()
        .done(this.render.bind(this))
        .fail(this.renderError.bind(this));
    },

    /**
     * Return the data associated with the tab
     * @returns {number}
     */
    getData: function () {
      var selectedRadio = document.querySelector('.js-year:checked');
      return +selectedRadio.value;
    },

    /**
     * Return the list of years to be rendered
     * @returns {{ value: number, active: boolean }[]}
     */
    _getYears: function () {
      return this.collection.toJSON()
        .map(function (year) {
          return {
            value: year.value,
            active: year.value === this.options.year
          };
        }, this);
    },

    render: function () {
      this.el.innerHTML = this.template({
        years: this._getYears()
      });

      return this;
    },

    renderError: function () {
      this.el.innerHTML = '<p class="loading-error">' +
        'Unable to load the context options' +
        '<button type="button" class="c-button -retry js-retry-context">Retry</button>' +
        '</p>';

      this.setElement(this.el);
    }

  });
}.call(this, this.App));
