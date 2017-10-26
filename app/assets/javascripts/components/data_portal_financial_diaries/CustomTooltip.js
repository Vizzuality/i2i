(function (App) {
  App.Component.CustomTooltip = Backbone.View.extend({

    defaults: {
      position: {},
      fields: []
    },

    el: '#vis-custom-tooltip',

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
      var top  = position.y + "px";
      var left = position.x + "px";

      this.el.setAttribute("style", currentStyles + ";top: " + top + "; left: " + left);
    },

    renderContent: function(item) {
      var tableContent = '';

      this.options.fields.forEach(function(field) {
        var value = field.format ? d3.format(field.format)(item[field.value]): item[field.value];
        tableContent += '<tr><td>' + field.name + ': </td><td>' + value + '</td></tr>';
      });

      this.$el.html('<table>' + tableContent + '</table>');
    }

  });
}).call(this, this.App);
