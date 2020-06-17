(function (App) {

  App.Component.FixedNav = Backbone.View.extend({

    defaults: {
      selectors: {
        fixedNav: '.js-fixed-nav',
        hero: '.js-hero',
        alert: '.js-alert',
        notification: '.js-notification',
        detailsPage: '.l-details-page',
        heroImage: '.l-image',
      },
      classes: {
        hidden: '-hidden',
        relative: '-relative',
      },
      navHeight: 50
    },

    el: 'body',

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings);
      this._onScroll = this._onScroll.bind(this);

      this._setVars();

      if (this.$hero.length) this.$fixedNav.addClass(this.options.classes.hidden);
      if (this.$heroImage.length) this.$fixedNav.addClass(this.options.classes.relative);

      if(!this.$fixedNav.length && !this.$notification.length) return;

      this._setListeners();
      this.visibility();
    },

    _setVars: function() {
      this.$fixedNav = this.$el.find(this.options.selectors.fixedNav);
      this.$hero = this.$el.find(this.options.selectors.hero);
      this.$alert = this.$el.find(this.options.selectors.alert);
      this.$notification = this.$el.find(this.options.selectors.notification);
      this.$detailsPage = this.$el.find(this.options.selectors.detailsPage);
      this.$heroImage = this.$el.find(this.options.selectors.heroImage);
    },

    _setListeners: function () {
      if (App.Helper.Utils.supportsPassiveListeners) {
        document.addEventListener('scroll', this._onScroll, { passive: true });
      } else {
        document.addEventListener('scroll', this._onScroll);
      }
    },

    visibility: function() {
      var $hero = this.$hero.get(0) || this.$heroImage.get(0);
      var notificationHeight = this.$notification ? this.$notification.height() + 20 : 20; // 20 is the margin value

      if (this.$detailsPage.length && $hero) {
        var space1 = $hero ? $hero.getBoundingClientRect() : { top: 0, bottom: 0 };

        if ((notificationHeight - space1.top) > notificationHeight) {
          this.$fixedNav.removeClass(this.options.classes.relative);
        } else {
          this.$fixedNav.addClass(this.options.classes.relative);
        }
      } else if ($hero) {
        var space = $hero ? $hero.getBoundingClientRect() : { top: 0, bottom: 0 };
        var alertHeight = this.$alert ? this.$alert.height() + 50 : 50; // 50 is the margin value

        if ((space.top < notificationHeight) && (space.bottom < (alertHeight + this.options.navHeight))) {
          this.$fixedNav.removeClass(this.options.classes.hidden);
        } else {
          this.$fixedNav.addClass(this.options.classes.hidden);
        }
      }
    },

    _onScroll: _.throttle(function() {
      this.visibility();
    }, 20),
  });
}).call(this, this.App);
