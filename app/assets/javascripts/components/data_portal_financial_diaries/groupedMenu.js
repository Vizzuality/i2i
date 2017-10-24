(function (App) {
  App.Component.GroupedMenu = Backbone.View.extend({

    defaults: {},

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings || {});
      if (!this.$el.length) return;

      this._setVars();
      this.removeEventListener();
      this._setEventListeners();
    },

    _setVars: function() {
      this.$menuItems = this.$el.children();
      this.$submenus = this.$el.find('.js-gm-menu');

      this.openMenuBinded = this._onOpenMenu.bind(this);
    },

    _setEventListeners: function() {
      this.$menuItems.toArray().forEach(function(submenu) {
        $(submenu).find('.js-gm-label').on('click', this.openMenuBinded);
      }.bind(this));
    },

    removeEventListener: function() {
      this.$menuItems.toArray().forEach(function(submenu) {
        $(submenu).find('.js-gm-label').off('click', this.openMenuBinded);
      }.bind(this));
    },

    _onOpenMenu: function (e) {
      e && e.preventDefault() && e.stopPropagation();

      this.$menuToOpen = $(e.currentTarget).next('.js-gm-menu')[0];
      this.$submenus.toArray().forEach(function(menu) {
        var menuMatches = this.$menuToOpen.isEqualNode(menu);
        $(menu)[0].classList.toggle('-open', menuMatches);
      }.bind(this));

      window.requestAnimationFrame(function() {
        $('body').on('click', this._onCloseMenus.bind(this));
      }.bind(this));
    },

    _onCloseMenus: function (e) {
      var openedMenu = this.$menuToOpen || null;

      if(!openedMenu) return;

      if(!e.target.isEqualNode(openedMenu)) this.closeMenu();
    },

    closeMenu: function() {
      this.$menuToOpen && this.$menuToOpen.classList.remove('-open');
      $('body').off('click');
    }

  });
}).call(this, this.App);
