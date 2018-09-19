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
  }

  // substitution: function(string, params) {
  //   // Params should have this format => { key:'xxx', key2:'xxx' }
  //   // Keys to search should be in this format {{key}}
  //   var params = params || {}
  //   var str = string;

  //   Object.keys(params).forEach((key) => {
  //     str = str.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  //     str = str.replace(new RegExp(`{${key}}`, 'g'), params[key]);
  //   });
  //   return str;
  // },

  // concatenation: function(string, params) {
  //   // Params should have this format => { where1: { { key:'xxx', key2:'xxx' } }},
  //   // Keys to search should be in this format {{key}}
  //   var params = params || {};
  //   var str = string;
  //   var sql;

  //   Object.keys(params).forEach((key) => {
  //     sql = `${compact(Object.keys(params[key]).map((k) => {
  //       const value = params[key][k];

  //       if (value) {
  //         /* eslint-disable-next-line */
  //         return (isNaN(value)) ? `${k} = '${value}'` : `${k} = ${value}`;
  //       }
  //       return null;
  //     })).join(' AND ')}`;

  //     if (sql && key.startsWith('where')) sql = `WHERE ${sql}`;
  //     else if (sql && key.startsWith('and')) sql = `AND ${sql}`;
  //     else sql = '';

  //     str = str.replace(new RegExp(`{{${key}}}`, 'g'), sql);
  //     str = str.replace(new RegExp(`{${key}}`, 'g'), sql);
  //   });

  //   return str;
  // },

  // replace: function(string, params, sqlParams) {
  //   var params = params || {};
  //   var sqlParams = sqlParams || {};
  //   var str = string;

  //   if (typeof str === 'string') {
  //     str = App.Helper.Utils.substitution(str, params);
  //     str = App.Helper.Utils.concatenation(str, sqlParams);
  //   }

  //   return str;
  // }
};
