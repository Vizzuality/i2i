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
  })(),

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  replace: function (str, data) {
    if (typeof str === 'string' && (data instanceof Array)) {
      return str.replace(/({\d})/g, i => data[i.replace(/{/, '').replace(/}/, '')]);
    } else if (typeof str === 'string' && (data instanceof Object)) {
      for (const key in data) {
        return str.replace(/({([^}]+)})/g, (i) => {
          const key = i.replace(/{/, '').replace(/}/, '');
          if (!data[key]) {
            return i;
          }

          return data[key];
        });
      }
    } else {
      return false;
    }
  }
};
