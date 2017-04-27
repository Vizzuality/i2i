(function (App) {
  'use strict';

  App.View.SwitcherView = Backbone.View.extend({

    defaults: {
      // Element containing the content of the tabs
      // This element is the one with the role "tabpanel"
      tabpanel: null,
      // Name of the current tab (name attribute of the tab)
      // Must be set to the defaut value
      currentTab: null,
      // Callback to execute when the active tab is changed
      // Gets passed the name of the tab
      onChange: function () {}
    },

    events: {
      'click *[role="tab"]': '_onClickTab',
      'keydown *[role="tab"]': '_onKeyDownTab'
    },

    initialize: function (options) {
      this.options = Object.assign({}, this.defaults, options);
    },

    /**
     * Event handler executed when the user clicks one of the tab
     * @param {Event} e
     */
    _onClickTab: function (e) {
      var tab = e.target;
      var tabName = tab.name;

      if (tabName !== this.options.currentTab) {
        this._setTab(tabName);
      }
    },

    /**
     * Event handler executed when the user presses a key while focusing
     * on a tab
     * @param {Event} e
     */
    _onKeyDownTab: function (e) {
      if (e.keyCode !== 37 && e.keyCode !== 39) return;

      e.preventDefault();

      // We get the list of tabs
      var tabs = this.el.querySelectorAll('[role="tab"]');
      tabs = Array.prototype.slice.call(tabs);

      // We get the active tab
      var activeTab = this._getActiveTab();

      // We get the position of the tab in the list of tabs
      var activeTabIndex = tabs.indexOf(activeTab);

      // If the user pressed the left arrow
      if (e.keyCode === 37) {
        if (activeTabIndex !== 0) {
          var previousTab = tabs[activeTabIndex - 1];
          this._setTab(previousTab.name);
        }
      } else {
        if (activeTabIndex !== tabs.length - 1) {
          var nextTab = tabs[activeTabIndex + 1];
          this._setTab(nextTab.name);
        }
      }
    },

    /**
     * Get the active tab element
     * @return {HTMLElement}
     */
    _getActiveTab: function () {
      var selector = '[role="tab"][name="' + this.options.currentTab + '"]';
      return this.el.querySelector(selector);
    },

    /**
     * Get the list of non-active tabs
     * @return {HTMLElement[]}
     */
    _getNonActiveTabs: function () {
      var activeTab = this._getActiveTab();
      return Array.prototype.slice.call(this.el.querySelectorAll('[role="tab"]'))
        .filter(function (tab) {
          return tab !== activeTab;
        });
    },

    /**
     * Set the active tab
     * @param {string} tabName
     */
    _setTab: function (tabName) {
      this.options.currentTab = tabName;
      this.options.onChange(tabName);

      var activeTab = this._getActiveTab();
      var nonActiveTabs = this._getNonActiveTabs();

      activeTab.classList.toggle('-current', true);
      activeTab.setAttribute('tabindex', 0);
      activeTab.setAttribute('aria-selected', true);
      activeTab.focus();

      nonActiveTabs.forEach(function (tab) {
        tab.classList.toggle('-current', false);
        tab.setAttribute('tabindex', -1);
        tab.setAttribute('aria-selected', false);
      });

      this.options.tabpanel.setAttribute('aria-labelledby', tabName + '-tab');
    }

  });

}).call(this, this.App);
