((function (App) {
  App.Helper.Indicators = {
    // List of the categories of indicators
    CATEGORIES: {
      COMMON: 'Common Indicators',
      ACCESS: 'Financial Access'
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
     * @param {{ id: string, iso: string, year: number, chart: string, analysisIndicator: {}, compareIndicators: {}[] }} indicator
     * @return {{ id: string, i: string, y: number, c: string, an: {}, cp: {}[] }}
     */
    serialize: function (indicator) {
      return {
        id: indicator.id,
        i: indicator.iso,
        y: indicator.year,
        c: indicator.chart,
        an: indicator.analysisIndicator,
        cp: indicator.compareIndicators
      };
    },

    /**
     * Deserialize an indicator
     * @param {{ id: string, i: string, y: number, c: string, an: {}, cp: {}[] }} serializedIndicator
     * @return {{ id: string, iso: string, year: number, chart: string, analysisIndicator: {}, compareIndicators: {}[] }}
     */
    deserialize: function (serializedIndicator) {
      return {
        id: serializedIndicator.id,
        iso: serializedIndicator.i,
        year: serializedIndicator.y,
        chart: serializedIndicator.c,
        analysisIndicator: serializedIndicator.an,
        compareIndicators: serializedIndicator.cp
      };
    }
  };
})(this.App));
