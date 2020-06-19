(function (App) {
  'use strict';

  var categories = App.Helper.Indicators.CATEGORIES;

  var MOBILE_SURVEYS_INDICATORS = [
    { id: 'geographic_area', name: 'Geographic Area', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'gender', name: 'Gender', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'age', name: 'Age', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'access_to_resources', name: 'Access to Resources', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'dwelling_type', name: 'Dwelling type: roof/dwelling', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'i2i_Marital_Status', name: 'Marital Status', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'i2i_Education', name: 'Level of education', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'i2i_Income_Sources', name: 'Sources of income', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'fas_strand', name: 'Financial services uptake', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'savings_strand', name: 'Savings', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'remittances_strand', name: 'Send and receive money', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'insurance_strand', name: 'Insurance', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'credit_strand', name: 'Credit', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_fas_strand', name: 'Financial Access Strands', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_saving_strand', name: 'Saving Strands', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_remittances_strand', name: 'Remittances Strands', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_insurance_strand', name: 'Insurance Strands', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_credit_strand', name: 'Credit Strands', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'toilet_type', name: 'Sanitation type', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'cooking_energy_type', name: 'Cooking energy source', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'electricity_access_type', name: 'Electricity access', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'usd_per_day', name: 'USD per day', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'poverty_line', name: 'Poverty line', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'mobile_money', name: 'Relationship status', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'asset_strand', name: 'Assets type', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'total_asset_strand', name: 'Asset status', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'sdgs_strand', name: 'Sustainable development goals', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'water_source_type', name: 'Water source type', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true }
  ];

  App.Collection.ExploratorySurveyIndicatorsCollection = Backbone.Collection.extend({

    comparator: function (a, b) {
      var aIsAComplex = a.get('category') === App.Helper.Indicators.CATEGORIES.ACCESS
        || a.get('category') === App.Helper.Indicators.CATEGORIES.STRANDS;
      var bIsComplex = b.get('category') === App.Helper.Indicators.CATEGORIES.ACCESS
        || b.get('category') === App.Helper.Indicators.CATEGORIES.STRANDS;
      if (aIsAComplex && !bIsComplex) return -1;
      if (!aIsAComplex && bIsComplex) return 1;
      return 0;
    },

    fetch: function () {
      var deferred = $.Deferred();
      var indicators = MOBILE_SURVEYS_INDICATORS.map(function (indicator) {
        return Object.assign(indicator, { isMoblieSurvey: true });
      });
      this.set(indicators);
      deferred.resolve(indicators);
      return deferred;
    },

    getVisibleIndicators: function () {
      return this.toJSON().filter(function (indicator) {
        return indicator.visible;
      });
    }
  });
}).call(this, this.App);
