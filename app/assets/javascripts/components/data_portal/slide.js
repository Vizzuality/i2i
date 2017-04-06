(function (App) {
  App.Component.Slide = Backbone.View.extend({

    defaults: {
      // Callback to be executed after an action (show or close)
      callback: function () {},
      // content to render in the modal
      content: ''
    },

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
      this.options.callback();
    },

    render: function () {
      this.el.innerHTML = this.options.content;
    }
  });
}).call(this, this.App);
