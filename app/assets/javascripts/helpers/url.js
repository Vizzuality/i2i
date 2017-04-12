App.Helper.URL = {
  /**
   * Return an URL-ready encoded string representing any object
   * @param {object} state state to be saved in the URL
   * @returns {string} encodedState
   */
  encode: function (state) {
    return encodeURIComponent(btoa(JSON.stringify(state)));
  },

  /**
   * Return the state encoded as an URL
   * NOTE: return null if the state couldn't be decoded properly
   * @param {string} encodedState
   * @returns {object|null} state
   */
  decode: function (encodedState) {
    try {
      return JSON.parse(atob(decodeURIComponent(encodedState)));
    } catch (err) {
      // Couldn't be parsed as a JSON, we return null
      return null;
    }
  }
};
