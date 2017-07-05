App.Helper.Utils = {

  /**
   * Return whether the browser supports passive event listeners
   * @return {boolean}
   */
  supportsPassiveListeners: (function () {
    if (typeof document === 'undefined') return false

    // Source: https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
    var supports = false;
    document.createElement('div')
      .addEventListener('test', function () {}, {
        get passive () {
          supports = true
          return false
        }
      })
    return supports
  })()

};
