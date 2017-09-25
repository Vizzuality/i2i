(function (App) {

  'use strict';

  App.Page.NewsPage = Backbone.View.extend({

    el: 'body',

    initialize: function () {
      // Functions binding
      this._onScroll = this._onScroll.bind(this);

      this._setVars();
      this.setListeners();

      this._updateShareLinks();
    },

    setListeners: function () {
      if (App.Helper.Utils.supportsPassiveListeners) {
        document.addEventListener('scroll', this._onScroll, { passive: true });
      } else {
        document.addEventListener('scroll', this._onScroll);
      }
    },

    _setVars: function () {
      this.fixedHeader = document.querySelector('.js-fixed-header');
      this.fixedHeaderVisibility = false; // Is the header visible?
      this.progressBar = this.fixedHeader.querySelector('.js-progress-bar');
      this.progressBarHeight = 60;

      this.title = document.querySelector('.js-title');
      var titleRect = this.title.getBoundingClientRect()
      this.titleYPos = titleRect.top + titleRect.height;

      this.news = document.querySelector('.js-news');
    },

    /**
     * Return the absolute Y position of the end of the article
     * relative to the top of the screen
     * NOTE: we can't cache this variable because the content of
     * the article can load asynchronous (for example a Youtube video)
     * NOTE 2: this is bad for performance as it's call on the scroll
     * event handler
     * @return {number}
     */
    _getNewsYEndPosition: function () {
      var scroll = window.scrollY;
      var newsRect = this.news.getBoundingClientRect();
      return newsRect.top + newsRect.height + scroll;
    },

    /**
     * Return the reading percentage of the article
     * @return {number}
     */
    _getReadingPercentage: function () {
      var scroll = window.scrollY;
      // We subtract the position of the title because the bar doesn't
      // appear before it and we use as a reference the top of the window
      // We also subtract twice the height of the bar because we want to
      // reach 100% when the end of the article is hidden behind it and
      // because when the bar appears, there's a gap of its size
      var res = (scroll - this.titleYPos) / (this._getNewsYEndPosition() - 2 * this.progressBarHeight - this.titleYPos);
      return Math.min(1, res);
    },

    /**
     * Event handler for the scroll event on the body element
     * NOTE: we throttle the function to prevent a higher rate than
     * approximatively 60FPS
     */
    _onScroll: _.throttle(function () {
      var scroll = window.scrollY;

      // If the fixed header was invisible and the scrolling position
      // is greater than the vertical position of the title, then we
      // make it visible
      if (!this.fixedHeaderVisibility && scroll > this.titleYPos) {
        this.fixedHeader.classList.add('-visible');
        this.fixedHeaderVisibility = true;
      }

      // If the fixed header was visible and the scrolling position
      // is smaller than the vertical position of the title, then we
      // make it invisible
      if (this.fixedHeaderVisibility && scroll <= this.titleYPos) {
        this.fixedHeader.classList.remove('-visible');
        this.fixedHeaderVisibility = false;
      }

      if (this.fixedHeaderVisibility) {
        this.progressBar.style.transform = 'scaleX(' + this._getReadingPercentage() + ')';
      }
    }, 16),

    /**
     * Update the share links so they contain the URL
     * of the page
     */
    _updateShareLinks: function () {
      var links = this.el.querySelectorAll('.js-share');
      links = Array.prototype.slice.call(links);

      links.forEach(function (link) {
        link.href = link.href
          .replace(/{{URL}}/g, location.href)
          .replace(/{{TITLE}}/g, this.title.textContent);
      }, this);
    }

  });

}).call(this, this.App);
