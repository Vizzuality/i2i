(function (App) {
  'use strict';

  App.View.GroupedBarView = App.View.VegaChartView.extend({

    options: {
      spec: App.Specs.GroupedBarChart,
      showToolbar: true
    },

    events: {
      'click .js-save': '_onSave'
    },

    /**
     * Event handler for when the user clicks the save button
     */
    _onSave: function () {
      new App.Component.ModalSaveWidgetFinancial({
        widgetConfig: Object.assign(
          {},
          this.options.params,
          { el: this.options.el }
        )
      });
    }

  });

}).call(this, this.App);
