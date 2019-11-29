(function (App) {
  'use strict';

  var MSME_INDICATORS = [
    { id: 'age', name: 'Age', category: 'Common indicators', visible: false },
    { id: 'business_development_measure', name: 'Business development', category: 'Common indicators', visible: false },
    { id: 'business_age', name: 'Business duration', category: 'Common indicators', visible: false },
    { id: 'business_coaching', name: 'Business advisor', category: 'Common indicators', visible: false },
    { id: 'business_sector', name: 'Sector', category: 'Common indicators', visible: true },
    { id: 'business_size', name: 'Access to Resources', category: 'Common indicators', visible: false },
    { id: 'gender', name: 'Gender', category: 'Common indicators', visible: false },
    { id: 'geographic_area', name: 'Geographic Area', category: 'Common indicators', visible: false },
    { id: 'licensed_registered', name: 'License', category: 'Common indicators', visible: false },
    { id: 'n_of_employees', name: 'Number of employees', category: 'Common indicators', visible: false },
    { id: 'obstacle_to_growth', name: 'Biggest obstacle to growing business', category: 'Common indicators', visible: false },

    { id: 'capital_source_strand', name: 'Sources of capital', category: 'Strands', visible: false },
    { id: 'credit_strand', name: 'Credit', category: 'Strands', visible: true },
    { id: 'fas_strand', name: 'Financial services uptake', category: 'Strands', visible: true },
    { id: 'financial_records', name: '"Financial records available', category: 'Strands', visible: false },
    { id: 'infrastructure_strand', name: 'Infrastructure', category: 'Strands', visible: true },
    { id: 'insurance_strand', name: 'Insurance', category: 'Strands', visible: false },
    { id: 'mobile_money', name: 'Mobile Money', category: 'Strands', visible: true },
    { id: 'motive_strand', name: 'Motives to start a business', category: 'Strands', visible: false },
    { id: 'savings_strand', name: 'Savings', category: 'Strands', visible: false },
    { id: 'barrier_strand', name: 'Barriers', category: 'Strands', visible: true },
    { id: 'total_barrier_strand', name: 'Top 5 barriers to start a business', category: 'Strands', visible: false },
    { id: 'total_capital_source_strand', name: 'Top 5 sources of capital', category: 'Strands', visible: false },
    { id: 'total_motive_strand', name: 'Top 5 motives to start a buisness', category: 'Strands', visible: false },
    { id: 'total_source_of_skills_strand', name: 'Top 5 sources of skills', category: 'Strands', visible: false },
    { id: 'transaction_strand', name: 'Transactions', category: 'Strands', visible: false }
  ];

  App.Collection.MSMEIndicatorsCollection = Backbone.Collection.extend({

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
      var indicators = MSME_INDICATORS.map(function (indicator) {
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
