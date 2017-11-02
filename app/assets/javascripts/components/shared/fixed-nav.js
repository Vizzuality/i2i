(function (App) {

  App.Component.FixedNav = Backbone.View.extend({

    defaults: {
      selectors: {
        fixedNav: '.js-fixed-nav',
        hero: '.js-hero'
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
      if(!this.$fixedNav.length) return;

      this._setListeners();
      this.visibility();
    },

    _setVars: function() {
      this.$fixedNav = this.$el.find(this.options.selectors.fixedNav);
      this.$hero = this.$el.find(this.options.selectors.hero);
    },

    _setListeners: function () {
      if (App.Helper.Utils.supportsPassiveListeners) {
        document.addEventListener('scroll', this._onScroll, { passive: true });
      } else {
        document.addEventListener('scroll', this._onScroll);
      }
    },

    visibility: function() {
      var bottomSpace = this.$hero
        .get(0)
        .getBoundingClientRect()
        .bottom;

      if(bottomSpace <= this.options.navHeight) {
        this.$fixedNav.removeClass(this.options.classes.hidden);
      } else {
        this.$fixedNav.addClass(this.options.classes.hidden);
      }
    },

    _onScroll: _.throttle(function() {
      this.visibility();
    }, 16),
  });
}).call(this, this.App);
