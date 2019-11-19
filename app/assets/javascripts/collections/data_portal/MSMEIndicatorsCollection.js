(function (App) {
  'use strict';
  {
    "age": "Age",
    "barrier_strand": "Barriers",
    "business_Development_Measure": "Business development",
    "business_age": "Business duration",
    "business_coaching": "Business advisor",
    "business_sector": "Sector",
    "business_size": "Access to Resources",
    "capital_source_strand": "Sources of capital",
    "credit_strand": "Credit",
    "fas_strand": "Financial services uptake",
    "financial_records": "Financial records available",
    "gender": "Gender",
    "geographic_area": "Geographic Area",
    "infrastructure_strand": "Infrastructure",
    "insurance_strand": "Insurance",
    "licensed_registered": "License",
    "mobile_money": "Mobile Money",
    "motive_strand": "Motives to start a buisness",

    "n_of_employees": "Number of employees",
    "obstacle_to_growth": "Biggest obstacle to growing business",
    "savings_strand": "Savings",
    "total_barrier_strand": "Top 5 barriers to start a buisness",
    "total_capital_source_strand": "Top 5 sources of capital",
    "total_credit_strand": "Credit Strands",
    "total_fas_strand": "Financial Access Strands",
    "total_insurance_strand": "Insurance Strands",
    "total_motive_strand": "Top 5 motives to start a buisness",
    "total_saving_strand": "Saving Strands",
    "total_source_of_skills_strand": "Top 5 sources of skills",
    "total_transaction_strand": "Transaction Strands",
    "transaction_strand": "Transactions"
}

  var MSME_INDICATORS = [
    { id: 'age', name: 'Age', category: 'Common indicators', visible: false },
    { id: 'barrier_strand', name: 'Barriers', category: 'Common indicators', visible: false },
    { id: 'business_development_measure', name: 'Business development', category: 'Common indicators', visible: false },
    { id: 'business_age', name: 'Business duration', category: 'Common indicators', visible: false },
    { id: 'business_coaching', name: 'Business advisor', category: 'Common indicators', visible: true },
    { id: 'business_sector', name: 'Sector', category: 'Common indicators', visible: true },
    { id: 'business_size', name: 'Access to Resources', category: 'Financial access', visible: true },
    { id: 'capital_source_strand', name: 'Sources of capital', category: 'Financial access', visible: true },
    { id: 'credit_strand', name: 'Credit', category: 'Financial access', visible: true },
    { id: 'fas_strand', name: 'Financial services uptake', category: 'Financial access', visible: false },
    { id: 'financial_records', name: '"Financial records available', category: 'Financial access', visible: false },
    { id: 'gender', name: 'Gender', category: 'Strands', visible: false },
    { id: 'geographic_area', name: 'Geographic Area', category: 'Strands', visible: false },
    { id: 'infrastructure_strand', name: 'Infrastructure', category: 'Strands', visible: false },
    { id: 'insurance_strand', name: 'Insurance', category: 'Strands', visible: false },
    { id: 'licensed_registered', name: 'License', category: 'Strands', visible: false },

    { id: 'mobile_money', name: 'Mobile Money', category: 'Common indicators', visible: false },
    { id: 'n_of_employees', name: 'Toilet type', category: 'Common indicators', visible: false },
    { id: 'obstacle_to_growth', name: 'Cooking energy', category: 'Common indicators', visible: false },
    { id: 'savings_strand', name: 'Electricity access', category: 'Common indicators', visible: false },

    { id: 'total_barrier_strand', name: 'Comfortable assets', category: 'Asset', visible: false },
    { id: 'total_capital_source_strand', name: 'Top 5 sources of capital', category: 'Asset', visible: false },
    { id: 'total_credit_strand', name: 'Credit Strands', category: 'Asset', visible: false },
    { id: 'total_fas_strand', name: 'Financial Access Strands', category: 'Asset', visible: false },

    { id: 'total_insurance_strand', name: 'Insurance Strands', category: 'SDGs', visible: false },
    { id: 'total_motive_strand', name: 'Top 5 motives to start a buisness', category: 'SDGs', visible: false },
    { id: 'total_saving_strand', name: 'Saving Strands', category: 'SDGs', visible: false },
    { id: 'total_source_of_skills_strand', name: 'Top 5 sources of skills', category: 'SDGs', visible: false },

    { id: 'total_transaction_strand', name: 'Transaction Strands', category: 'Poverty', visible: false },
    { id: 'transaction_strand', name: 'Transactions', category: 'Poverty', visible: false }
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
      this.set(MSME_INDICATORS);
      deferred.resolve(MSME_INDICATORS);
      return deferred;
    },

    getVisibleIndicators: function () {
      return this.toJSON().filter(function (indicator) {
        return indicator.visible;
      });
    }
  });
}).call(this, this.App);
