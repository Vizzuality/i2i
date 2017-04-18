((function (App) {
  App.Helper.Indicators = {
    // List of the categories of indicators
    CATEGORIES: {
      COMMON: 'Common Indicators',
      ACCESS: 'Financial Access',
      STRANDS: 'Strands'
    },

    // Description for the categories
    CATEGORIES_DESC: {
      COMMON: null,
      ACCESS: 'Based on total % of adults who have financial products independent of other products.',
      STRANDS: 'Based on total % of adults who have financial products in a hierarchical priority of formal over informal products.'
    },

    // Map for the ISO and country names
    COUNTRIES: {
      UGA: 'Uganda',
      TZA: 'Tanzania',
      ZMB: 'Zambia',
      RWA: 'Rwanda',
      GHA: 'Ghana',
      KEN: 'Kenya',
      MOZ: 'Mozambique',
      PAK: 'Pakistan'
    },

    /**
     * Serialize an indicator
     * @param {{ id: string, iso: string, year: number, chart: string, filters: {}[], analysisIndicator: string, compareIndicators: {}[] }} indicator
     * @return {{ id: string, i: string, y: number, c: string, f: {}[], an: string, cp: {}[] }}
     */
    serialize: function (indicator) {
      return {
        id: indicator.id,
        i: indicator.iso,
        y: indicator.year,
        c: indicator.chart || null,
        f: indicator.filters
          ? indicator.filters.map(function (filter) { return App.Helper.Filters.serialize(filter); })
          : [],
        an: indicator.analysisIndicator || null,
        cp: indicator.compareIndicators
          ? indicator.compareIndicators.map(function (compareIndicator) {
              return {
                id: compareIndicator.id,
                i: compareIndicator.iso,
                y: compareIndicator.year,
                f: compareIndicator.filters
                  ? compareIndicator.filters.map(function (filter) {
                      return App.Helper.Filters.serialize(filter);
                    })
                  : null
              };
            })
          : null
      };
    },

    /**
     * Deserialize an indicator
     * @param {{ id: string, i: string, y: number, c: string, f: {}[], an: string, cp: {}[] }} serializedIndicator
     * @return {{ id: string, iso: string, year: number, chart: string, filters: {}[], analysisIndicator: string, compareIndicators: {}[] }}
     */
    deserialize: function (serializedIndicator) {
      return {
        id: serializedIndicator.id,
        iso: serializedIndicator.i,
        year: serializedIndicator.y,
        chart: serializedIndicator.c || null,
        filters: serializedIndicator.f
          ? serializedIndicator.f.map(function (f) { return App.Helper.Filters.deserialize(f); })
          : [],
        analysisIndicator: serializedIndicator.an || null,
        compareIndicators: serializedIndicator.cp
          ? serializedIndicator.cp.map(function (cp) {
            return {
              id: cp.id,
              iso: cp.i,
              year: cp.y,
              filters: cp.f
                ? cp.f.map(function (f) {
                    return App.Helper.Filters.deserialize(f);
                  })
                : null
            };
          })
          : null
      };
    }
  };
})(this.App));
