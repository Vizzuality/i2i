(function (App) {
  App.Component.CustomTooltip = Backbone.View.extend({

    defaults: {
      position: {},
      fields: []
    },

    el: '#vis-custom-tooltip',

    template: JST['templates/financial_diaries/custom_tooltip'],

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings);
    },

    setFields: function(fields) {
      this.options = Object.assign({}, this.options, { fields: fields });
    },

    showTooltip: function() {
      this.el.setAttribute("style", "visibility: visible");
    },

    hideTooltip: function() {
      this.el.setAttribute("style", "visibility: hidden");
    },

    setPosition: function(position) {
      var currentStyles = this.el.getAttribute('style');
      var top  = (position.y + 10) + "px";
      var left = (position.x + 10) + "px";

      this.el.setAttribute("style", currentStyles + ";top: " + top + "; left: " + left);
    },

    parseFields: function(fields, item) {
      return fields.map(function(field) {
        var value = field.format ? d3.format(field.format)(item[field.value]): item[field.value];
        return {
          title: field.title,
          value: value
        };
      });
    },

    renderContent: function(item) {
      this.$el.html(this.template({
        fields: this.parseFields(this.options.fields, item)
      }));
    }

  });
}).call(this, this.App);
