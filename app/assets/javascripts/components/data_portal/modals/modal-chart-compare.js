(function (App) {

  App.Component.ModalChartCompare = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/modal-chart-compare'],

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Compare data',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<button type="button" class="c-button -padding -white -outline js-cancel">Cancel</button><button type="button" class="c-button -padding -white js-done">Done</button>',
      // Indicator being compared
      indicator: null,
      // Current ISO of the portal
      iso: null,
      // Current year of the portal
      year: null,
      // Current filters of the portal
      filters: [],
      // List of the indicators used for the comparison
      // See "compareIndicators" in App.View.ChartWidgetView for the format
      compareIndicators: [],
      // Whether the user can compare the indicator with a different country/year
      canCompareCountries: true,
      // Callback executed when the user presses the "Done" button
      // The callback gets passed the name of the selected chart
      continueCallback: function () {},
      // Callback executed when the user presses the "Clear comparison" button
      // The callback doesn't receive any parameter
      stopCompareCallback: function () {},
      // Index of the current tab
      // NOTE: the value is updated at instantiation
      _currentTab: -1,
      // List of the tabs
      // This attribute is modified at instantiation time
      _tabs: [],
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-cancel': 'onCloseModal',
        'click .js-done': '_onClickDone',
        'click .js-clear-comparison': '_onClickClearCompare',
        'click .js-compare': '_onClickTab'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);

      this.options._tabs = [
        {
          id: 'country-year',
          name: 'Country and year',
          view: App.View.CountryYearView,
          available: this.options.canCompareCountries
        },
        {
          id: 'jurisdiction',
          name: 'Jurisdiction in ' + App.Helper.Indicators.COUNTRIES[this.options.iso] + ' in ' + this.options.year,
          view: App.View.JurisdictionView,
          available: true
        }
      ];

      // If the compare indicators the view gets passed are jurisdiction indicators or
      // the first tab is unavailable, then the default tab is the second
      if (this._isJurisdictionsCompareIndicators() || !this.options.canCompareCountries) {
        this.options._currentTab = 1;
      } else if (this.options.compareIndicators && this.options.compareIndicators.length) {
        this.options._currentTab = 0;
      }

      this.render();
    },

    /**
     * Event handler for when the user selects one of the tabs
     * @param {event} e
     */
    _onClickTab: function (e) {
      // We delete the previous data when the tab is changed
      // to avoid leaks between tabs
      this.options.compareIndicators = null;

      var tabId = e.target.value;
      this._onTabSelected(tabId);
    },

    /**
     * Event handler for when the "Done" button is clicked
     */
    _onClickDone: function () {
      var compareIndicators = this._getCompareIndicators();
      this.options.continueCallback(compareIndicators);
      this.onCloseModal();
    },

    /**
     * Event handler for when the "Clear comparison" button is clicked
     */
    _onClickClearCompare: function () {
      this.options.stopCompareCallback();
      this.onCloseModal();
    },

    /**
     * Event handler executed when the user switch from one tab to another
     * @param {string} tabId
     */
    _onTabSelected: function (tabId) {
      var tabIndex = _.findIndex(this.options._tabs, { id: tabId });
      this.options._currentTab = tabIndex;

      // We empty all the containers before rendering the new tab
      var containers = this.el.querySelectorAll('.js-container');
      Array.prototype.slice.call(containers).forEach(function (container) {
        container.innerHTML = '';
      });

      var tab = this.options._tabs[tabIndex];
      var View = tab.view;
      this.compareView = new View({
        el: this.$el.find('.js-container-' + tab.id),
        iso: this.options.iso,
        year: this.options.year,
        filters: this.options.filters,
        indicator: this.options.indicator,
        compareIndicators: this.options.compareIndicators
      });
    },

    /**
     * Return whether the compare indicators passed to the view correspond
     * to data of the Jurisdiction tab
     * @return {boolean}
     */
    _isJurisdictionsCompareIndicators: function () {
      return !!this.options.compareIndicators
        && this.options.compareIndicators.reduce(function (res, compareIndicator) {
          return compareIndicator.filters
            && compareIndicator.filters.length
            && !!_.findWhere(compareIndicator.filters, { id: 'jurisdiction' })
            || res;
        }, false);
    },

    /**
     * Return the list of indicators for the comparison
     * @return { { id: string, year: number, iso: string, filters: { id: string, name: string, options: string[] }[] }[] }
     */
    _getCompareIndicators: function () {
      return this.compareView.getData();
    },

    render: function () {
      this.options.content = this.contentTemplate({
        tabs: this.options._tabs,
        currentTab: this.options._currentTab,
        indicator: this.options.indicator.name,
        country: App.Helper.Indicators.COUNTRIES[this.options.iso],
        year: this.options.year
      });

      this.constructor.__super__.render.apply(this);

      this._setEventListeners();

      if (this.options._currentTab !== -1) {
        this._onTabSelected(this.options._tabs[this.options._currentTab].id);
      }
    }

  });
}).call(this, this.App);
