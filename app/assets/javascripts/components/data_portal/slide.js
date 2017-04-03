(function (App) {
  App.Component.Slide = Backbone.View.extend({

    defaults: {},

    initialize: function (settings) {
      this.options = _.extend({}, this.defaults, settings);
    },

    toggleVisibility: function (visible) {
      // Incoming slide styles
      if (visible) {
        this.el.classList.add('-enter');

        if (this.el.classList.contains('-leave')) {
          this.el.classList.remove('-leave');
        }
        return;
      }

      // Outgoing slide styles
      if (this.el.classList.contains('-enter')) {
        this.el.classList.remove('-enter');
        this.el.classList.add('-leave');
      }
    },

    onCallback: function () {
      if (this.options.callback && typeof this.options.callback === 'function') {
        this.options.callback();
      }
    },

    render: function () {
      this.el.innerHTML = this.content;
    }
  });
}).call(this, this.App);
