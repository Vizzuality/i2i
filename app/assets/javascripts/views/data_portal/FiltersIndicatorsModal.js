(function (App) {

  App.View.FilterIndicatorsModal = App.Component.Modal.extend({

    defaults: {
      // See App.Component.Modal for details about this option
      title: 'Select indicators',
      // See App.Component.Modal for details about this option
      showTitle: true,
      // See App.Component.Modal for details about this option
      footer: '<button class="c-button -white -outline -padding js-cancel">Cancel</button><button class="c-button -white -padding js-done">Done</button>',
      // settings for default tab to show
      tab: {
        name: 'apply-filters',
        index: 1
      },
      // Callback executed when the user presses the "Done" button
      // The callback gets passed the name of the selected chart
      continueCallback: function () {}
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
      this.indicators = options.indicators;
      this.filters = options.filters;

      this._setVars();
      this.render();
    },

    _setVars: function () {
      this.constructor.__super__._setVars.apply(this);

      this.pages = [
        {
          id: 'select-indicators',
          view: App.View.SelectIndicatorsView
        },
        {
          id: 'apply-filters',
          view: App.View.ApplyFiltersView
        }
      ];
    },

    _setEventListeners: function () {
      this.constructor.__super__._setEventListeners.apply(this);

      Backbone.Events.on('tab:selected', function (tab) {
        this._onTabSelected(tab.id);
      }.bind(this));
    },

    _onTabSelected(tabId) {
      var FilterView = _.find(this.pages, function (page) { return page.id === tabId; }).view;
      $('#filterContainer').html(new FilterView({
        indicators: this.indicators,
        filters: this.filters
      }).render().$el);
    },

    _onClickDone: function () {
      var form = document.querySelector('form');
      var newFilters = App.Helper.SerializeFilters(form);

      this.options.continueCallback(newFilters);

      this.constructor.__super__.onCloseModal.apply(this);
    },

    render: function () {
      this.options.content = this.contentTemplate();

      requestIdleCallback(function () {
        this.constructor.__super__.render.apply(this);

        new App.View.TabView({
          el: '#tabContainer',
          tabs: [
            { name: 'Select indicators', id: 'select-indicators' },
            { name: 'Apply filters', id: 'apply-filters' }
          ],
          currentTab: this.defaults.tab.index
        });

        this._setEventListeners();
        this._onTabSelected(this.defaults.tab.name);
      }.bind(this));
    }

  });
}.call(this, this.App));
