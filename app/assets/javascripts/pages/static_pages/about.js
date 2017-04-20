(function (App) {

  'use strict';

  App.Page.AboutPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor',
      'click .js-profile': '_onClickProfile',
      'keydown .js-profile': '_onKeydownProfile'
    },

    /**
     * Event handler executed when the user clicks on an anchor
     * @param {Event} e
     */
    _onClickAnchor: function (e) {
      e.preventDefault();
      var target = e.currentTarget.getAttribute('href');

      $('html, body').animate({
        scrollTop: $(target).offset().top
      });
    },

    /**
     * Event handler executed when the user clicks a profile
     * @param {Event} e
     */
    _onClickProfile: function (e) {
      var currentMember = this._getProfileData(e.currentTarget);
      if (currentMember) this._openProfileModal(currentMember);
    },

    /**
     * Event handler executed when the user press a key while the focus
     * is on a profile
     * @param {Event} e
     */
    _onKeydownProfile: function (e) {
      var code = e.keyCode;
      // 13: enter, 32: space
      if (code === 13 || code === 32) {
        e.preventDefault();
        var currentMember = this._getProfileData(e.currentTarget);
        if (currentMember) this._openProfileModal(currentMember);
      }
    },

    /**
     * Get the data of a profile
     * @param {HTMLElement} profileNode
     * @return {object} profile
     */
    _getProfileData: function (profileNode) {
      var slug = profileNode.dataset.slug,
        role = profileNode.dataset.role,
        members = window.gon && gon[role].members;

      if (!members) return;

      return members.find(function (member) {
        return member.slug === slug;
      });
    },

    /**
     * Open the profile modal
     * @param {object} profile
     */
    _openProfileModal: function (profile) {
      new App.Component.ModalTeam({
        title: profile.name,
        memberInfo: profile
      });
    }

  });

}).call(this, this.App);
