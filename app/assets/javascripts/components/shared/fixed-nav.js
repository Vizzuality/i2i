(function (App) {

  App.Component.FixedNav = Backbone.View.extend({

    defaults: {
      selectors: {
        fixedNav: '.js-fixed-nav',
        hero: '.js-hero',
        alert: '.js-alert',
        notification: '.js-notification',
      },
      classes: {
        hidden: '-hidden'
      },
      navHeight: 50
    },

    el: 'body',

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings);
      this._onScroll = this._onScroll.bind(this);

      this._setVars();
      this.$fixedNav.addClass(this.options.classes.hidden);

      if(!this.$fixedNav.length && !this.$notification.length) return;

      this._setListeners();
      this.visibility();
    },

    _setVars: function() {
      this.$fixedNav = this.$el.find(this.options.selectors.fixedNav);
      this.$hero = this.$el.find(this.options.selectors.hero);
      this.$alert = this.$el.find(this.options.selectors.alert);
      this.$notification = this.$el.find(this.options.selectors.notification);
    },

    _setListeners: function () {
      if (App.Helper.Utils.supportsPassiveListeners) {
        document.addEventListener('scroll', this._onScroll, { passive: true });
      } else {
        document.addEventListener('scroll', this._onScroll);
      }
    },

    visibility: function() {
      var space = this.$hero
        .get(0)
        .getBoundingClientRect();
      var alertHeight = this.$alert ? this.$alert.height() + 50 : 50; // 50 is the margin value
      var notificationHeight = this.$notification ? this.$notification.height() + 20 : 20; // 20 is the margin value

      if ((space.top < notificationHeight) && (space.bottom < (alertHeight + this.options.navHeight))) {
        this.$fixedNav.removeClass(this.options.classes.hidden);
      } else {
        this.$fixedNav.addClass(this.options.classes.hidden);
      }
    },

    _onScroll: _.throttle(function() {
      this.visibility();
    }, 20),
  });
}).call(this, this.App);
