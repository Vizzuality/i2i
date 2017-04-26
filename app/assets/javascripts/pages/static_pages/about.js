(function (App) {

  'use strict';

  App.Page.AboutPage = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-anchor': '_onClickAnchor',
      'click .js-profile': '_onClickProfile',
      'keydown .js-profile': '_onKeydownProfile',
      'click .js-read-more': '_onClickReadMore',
      'click .js-submit': '_onClickSubmit'
    },

    initialize: function () {
      this.countriesCollection = new App.Collection.CountriesCollection();

      this._fetchCountries();
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
     * Event handler executed when the user clicks on of the read more buttons
     * @param {Event} e
     */
    _onClickReadMore: function (e) {
      var title = e.target.dataset.title;
      var content = e.target.nextElementSibling.innerHTML;

      new App.Component.ModalAboutReadMore({
        title: title,
        content: content
      });
    },

    /**
     * Event handler executed when the user clicks the "Send" button
     * @param {Event} e
     */
    _onClickSubmit: function (e) {
      var button = e.currentTarget;
      var form = button.closest('form');
      var message = form.querySelector('.js-message');

      // If the form is invalid, we return
      if (!form.checkValidity()) return;

      e.preventDefault();

      // Loading state
      button.innerHTML = '<span></span><span></span><span></span>';

      $.ajax({
        type: 'POST',
        url: form.action,
        data: $(form).serialize(),
        success: function () {
          button.textContent = 'Sent!';

          // We remove the message
          if (message) form.removeChild(message);

          var info = document.createElement('div');
          info.classList.add('message', '-info', 'js-message');
          info.textContent = 'Thank you! We will be in touch.';
          form.insertBefore(info, form.firstChild);

          setTimeout(function () {
            button.textContent = 'Send';
          }, 5000);
        },
        error: function () {
          // We remove the message
          if (message) form.removeChild(message);

          button.textContent = 'Send';

          var error = document.createElement('div');
          error.classList.add('message', '-error', 'js-message');
          error.textContent = 'Sorry there was an error sending your message. Please try again later.';
          form.insertBefore(error, form.firstChild);
        }
      });
    },

    /**
     * Fetch the list of countries and their last year with data
     */
    _fetchCountries: function () {
      this.countriesCollection.fetch()
        .done(this._updateCountriesLinks.bind(this));
    },

    /**
     * Update the link of the countries
     */
    _updateCountriesLinks: function () {
      var countryNodes = document.querySelectorAll('.js-country');
      Array.prototype.slice.call(countryNodes).forEach(function (countryNode) {
        var country = this.countriesCollection.toJSON().find(function (country) {
          return country.iso === countryNode.dataset.iso;
        });

        if (country) {
          countryNode.href = ['/data-portal', country.iso, country.latestYear].join('/');
        } else {
          countryNode.removeAttribute('href');
        }
      }, this);
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
