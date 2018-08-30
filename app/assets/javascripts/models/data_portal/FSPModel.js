(function (App) {
  'use strict';

  App.Model.FSPModel = Backbone.Model.extend({
    // Check the default values in the initialize method
    // The values can't be placed here because Backbone.Model
    // will interprate them as the default model data
    defaults: {},

    initialize: function (attributes, options) {
      this.options = _.extend({}, {
        // Indicator id
        url: null
      }, options);
    },

    url: function() {
      return this.options.url;
    },

    parse: function (data) {
      var d = {
        title: this.options.title,
        data: data.rows
      };

      return d;
    }

  });

}).call(this, this.App);
