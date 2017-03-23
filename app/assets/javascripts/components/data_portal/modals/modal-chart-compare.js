(function (App) {

  App.Component.ModalChartCompare = App.Component.Modal.extend({

    contentTemplate: JST['templates/data_portal/modals/modal-chart-compare'],

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Compare data',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<button type="button" class="c-button -padding -white -outline js-cancel">Cancel</button><button type="button" class="c-button -padding -no-hover -white js-done">Done</button>',
      // Indicator being compared
      indicator: null,
      // Current ISO of the portal
      iso: null,
      // Current year of the portal
      year: null,
      // List of the indicators used for the comparison
      // See "compareIndicators" in App.View.ChartWidgetView for the format
      compareIndicators: [],
      // Callback executed when the user presses the "Done" button
      // The callback gets passed the name of the selected chart
      continueCallback: function () {},
      // Callback executed when the user presses the "Clear comparison" button
      // The callback doesn't receive any parameter
      stopCompareCallback: function () {},
      // Index of the current tab
      // NOTE: the value is updated at instantiation
      _currentTab: 0,
      // List of the tabs
      // This attribute is modified at instantiation time
      _tabs: [],
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-cancel': 'onCloseModal',
        'click .js-done': '_onClickDone',
        'click .js-clear-comparison': '_onClickClearCompare'
      });
    },

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);

      this.options._tabs = [
        {
          id: 'country-year',
          name: 'Country and year',
          view: App.View.CountryYearView
        },
        {
          id: 'jurisdiction',
          name: 'Jurisdiction in ' + App.Helper.Indicators.COUNTRIES[this.options.iso] + ' in ' + this.options.year,
          view: App.View.JurisdictionView
        }
      ];

      // If the compare indicators the view gets passed are jurisdiction indicators
      // then the default tab is the second
      if (this._isJurisdictionsCompareIndicators()) {
        this.options._currentTab = 1;
      }

      this.render();
    },

    _setEventListeners: function () {
      this.constructor.__super__._setEventListeners.apply(this);

      this.listenTo(this.tabView, 'tab:selected', function (tab) {
        // We delete the previous data when the tab is changed
        // to avoid leaks between tabs
        this.options.compareIndicators = null;

        this._onTabSelected(tab.id);
      }.bind(this));
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

      var View = this.options._tabs[tabIndex].view;
      this.compareView = new View({
        el: this.$el.find('.js-container'),
        iso: this.options.iso,
        year: this.options.year,
        indicator: this.options.indicator,
        compareIndicators: this.options.compareIndicators
      });

      this.setElement(this.el);
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
        indicator: this.options.indicator.name,
        country: App.Helper.Indicators.COUNTRIES[this.options.iso],
        year: this.options.year
      });

      this.constructor.__super__.render.apply(this);

      this.tabView = new App.View.TabView({
        el: this.el.querySelector('.js-tabs'),
        tabs: this.options._tabs,
        currentTab: this.options._currentTab
      });

      this._setEventListeners();
      this._onTabSelected(this.options._tabs[this.options._currentTab].id);
    }

  });
}).call(this, this.App);
