((function (App) {
  App.Helper.Filters = {
    /**
     * Serialize a filter
     * @param {{ id: string, name: string, options: string[] }} filter
     * @return {{ id: string, n: string, o: string[] }}
     */
    serialize: function (filter) {
      var res = {
        id: filter.id,
        n: filter.name,
        o: filter.options
      };

      // The local storage removes the pairs which have a value equal to undefined
      // so to prevent inconsistencies, we make sure to not add the name if it's undefined
      if (res.n === undefined) {
        delete res.n;
      }

      return res;
    },

    /**
     * Deserialize a filter
     * @param {{ id: string, n: string, o: string[] }} filter
     * @return {{ id: string, name: string, options: string[] }}
     */
    deserialize: function (serializedFilter) {
      return {
        id: serializedFilter.id,
        name: serializedFilter.n,
        options: serializedFilter.o
      };
    }
  };
})(this.App));
