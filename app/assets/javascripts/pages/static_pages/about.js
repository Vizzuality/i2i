
(function (App) {

  'use strict';

  App.Page.AboutPage = Backbone.View.extend({

    initialize: function () {
      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
      this._setVars();
      this._setEventListeners();
    },

    _setVars: function () {
      this.profiles = Array.prototype.slice.call(document.querySelectorAll('.c-profile'));
    },

    onClick: function (e) {
      var slug = e.currentTarget.getAttribute('data-slug'),
        role = e.currentTarget.getAttribute('data-role'),
        members = JSON.parse(gon[role]).members;

      if (members === undefined) return;

      var currentMember = members.find(function (member) {
        return member.slug === slug;
      });

      if (currentMember) {
        this.openModal(currentMember);
      }
    },

    onKeydown: function (e) {
      var code = e.keyCode;
      // 13: enter, 32: space
      if (code === 13 || code === 32) {
        e.preventDefault();
        var slug = e.currentTarget.getAttribute('data-slug');
        this.openModal(slug);
      }
    },

    openModal: function (data) {
      console.log(data);
      new App.Component.ModalTeam({
        showTitle: false,
        title: data.name,
        data: data
      });
    },

    _setEventListeners: function() {
      this.profiles.forEach(function (elem) {
        elem.addEventListener('click', this.onClick);
        elem.addEventListener('keydown', this.onKeydown);
      }.bind(this));
    },

    _removeEventListerners: function() {
      this.profiles.forEach(function (elem) {
        elem.removeEventListener('click', this.onClick);
        elem.removeEventListener('keydown', this.onKeydown);
      }.bind(this));
    }

  });

}).call(this, this.App);
