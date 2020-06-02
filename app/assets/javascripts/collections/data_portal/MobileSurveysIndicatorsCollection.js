(function (App) {
  'use strict';

  var categories = App.Helper.Indicators.CATEGORIES;

  var MOBILE_SURVEYS_INDICATORS = [
    { id: 'age', name: 'Age', category: categories.COMMON, visible: false },
    { id: 'business_development_measure', name: 'Business development', category: categories.COMMON, visible: false },
    { id: 'business_age', name: 'Business duration', category: categories.COMMON, visible: false },
    { id: 'business_coaching', name: 'Business advisor', category: categories.COMMON, visible: false },
    { id: 'business_sector', name: 'Sector', category: categories.COMMON, visible: true, defaultChart: 'stacked bar', isFullWidth: true },
    { id: 'business_size', name: 'Access to Resources', category: categories.COMMON, visible: false },
    { id: 'gender', name: 'Gender', category: categories.COMMON, visible: false },
    { id: 'geographic_area', name: 'Geographic Area', category: categories.COMMON, visible: false },
    { id: 'licensed_registered', name: 'License', category: categories.COMMON, visible: false },
    { id: 'n_of_employees', name: 'Number of employees', category: categories.COMMON, visible: false },
    { id: 'obstacle_to_growth', name: 'Biggest obstacle to growing business', category: categories.COMMON, visible: false },

    { id: 'capital_source_strand', name: 'Sources of capital', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'credit_strand', name: 'Credit', category: categories.MOBILE_SURVEYS_STRANDS, visible: true, isFullWidth: true },
    { id: 'financial_records', name: 'Financial records available', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'infrastructure_strand', name: 'Infrastructure', category: categories.MOBILE_SURVEYS_STRANDS, visible: true, isFullWidth: true },
    { id: 'insurance_strand', name: 'Insurance', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'motive_strand', name: 'Motives to start a business', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'savings_strand', name: 'Savings', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'barrier_strand', name: 'Barriers', category: categories.MOBILE_SURVEYS_STRANDS, visible: true, isFullWidth: true },
    { id: 'total_barrier_strand', name: 'Top 5 barriers to start a business', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'total_capital_source_strand', name: 'Top 5 sources of capital', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'total_motive_strand', name: 'Top 5 motives to start a buisness', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'total_source_of_skills_strand', name: 'Top 5 sources of skills', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'transaction_strand', name: 'Transactions', category: categories.MOBILE_SURVEYS_STRANDS, visible: false },
    { id: 'fas_strand', name: 'Financial services uptake', category: categories.MOBILE_SURVEYS_STRANDS, visible: true },
    { id: 'mobile_money', name: 'Mobile Money', category: categories.MOBILE_SURVEYS_STRANDS, visible: true, defaultChart: 'radial' },
  ];

  App.Collection.MobileSurveysIndicatorsCollection = Backbone.Collection.extend({

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
        return Object.assign(indicator, { isMSME: true });
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
