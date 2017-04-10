((function (App) {
  App.Helper.Filters = {
    /**
     * Serialize a filter
     * @param {{ id: string, name: string, options: string[] }} filter
     * @return {{ id: string, n: string, o: string[] }}
     */
    serialize: function (filter) {
      return {
        id: filter.id,
        n: filter.name,
        o: filter.options
      };
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
