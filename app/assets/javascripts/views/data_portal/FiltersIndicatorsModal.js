(function (App) {

  App.View.FilterIndicatorsModal = App.Component.Modal.extend({

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Select indicators',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<button class="c-button -white -outline -padding js-cancel">Cancel</button><button class="c-button -white -padding js-done">Done</button>',
      // Callback executed when the user presses the "Done" button
      // The callback gets passed the name of the selected chart
      continueCallback: function () {},
      // List of all the possible indicators
      indicators: [],
      // List of filters currently applied
      filters: [],
      // Index of the current tab
      _currentTab: 0,
      // List of the tabs
      // This attribute is modified at instantiation time
      _tabs: [],
      // List of the selected indicators in the modal
      _selectedIndicators: null,
      // List of selected filters in the modal
      _selectedFilters: null
    },

    events: function () {
      return _.extend({}, App.Component.Modal.prototype.events, {
        'click .js-cancel': 'onCloseModal',
        'click .js-done': '_onClickDone'
      });
    },

    contentTemplate: JST['templates/data_portal/filters'],

    initialize: function (options) {
      this.constructor.__super__.initialize.call(this, options);

      this.options._tabs = [
        {
          id: 'select-indicators',
          name: 'Select indicators',
          view: App.View.SelectIndicatorsView
        },
        {
          id: 'apply-filters',
          name: 'Apply filters',
          view: App.View.ApplyFiltersView
        }
      ];

      this.render();
    },

    _setEventListeners: function () {
      this.constructor.__super__._setEventListeners.apply(this);

      this.listenTo(this.tabView, 'tab:selected', function (tab) {
        this._onTabSelected(tab.id);
      }.bind(this));
    },

    /**
     * Event handler executed when the user switch from one tab to another
     * @param {string} tabId
     */
    _onTabSelected: function (tabId) {
      if (this.filterView) this._saveCurrentTabData();

      var tabIndex = _.findIndex(this.options._tabs, { id: tabId });
      this.options._currentTab = tabIndex;

      // We merge the list of indicators with the list of selected indicators
      // from the first tab so both of the tab always have the most updated data
      var indicators = this.options.indicators.map(function (indicator) {
        return _.extend({}, indicator, {
          visible: this.options._selectedIndicators
            ? this.options._selectedIndicators.indexOf(indicator.id) !== -1
            : indicator.visible
        });
      }, this);

      var filters = this.options._selectedFilters
        ? this.options._selectedFilters
        : this.options.filters;

      var View = this.options._tabs[tabIndex].view;
      this.filterView = new View({
        indicators: indicators,
        filters: filters
      });

      this.$el.find('.js-filters-container').html(this.filterView.render().$el);
    },

    /**
     * Save the data of the current tab
     */
    _saveCurrentTabData: function () {
      var tab = this.options._tabs[this.options._currentTab];
      var attribute = tab.id === 'select-indicators' ? '_selectedIndicators' : '_selectedFilters';
      this.options[attribute] = this.filterView.getData();
    },

    _onClickDone: function () {
      // We save the data of the current tab
      this._saveCurrentTabData();

      this.options.continueCallback(this.options._selectedIndicators, this.options._selectedFilters);
      this.onCloseModal();
    },

    render: function () {
      this.options.content = this.contentTemplate();

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
}.call(this, this.App));
