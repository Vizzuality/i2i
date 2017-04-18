(function (App) {
  'use strict';

  var INDICATORS = [
    { id: 'geographic_area', name: 'Geographic Area', category: 'Common Indicators', visible: false },
    { id: 'gender', name: 'Gender', category: 'Common Indicators', visible: false },
    { id: 'age',name: 'Age', category: 'Common Indicators', visible: false },
    // { id: 'access_to_resources', name: 'Access to Resources', category: 'Common Indicators', visible: false },
    // { id: 'dwelling_type', name: 'Dwelling type: roof/dwelling', category: 'Common Indicators', visible: false },
    { id: 'i2i_Marital_Status', name: 'Marital Status', category: 'Common Indicators', visible: false },
    { id: 'i2i_Education', name: 'Level of education', category: 'Common Indicators', visible: true },
    { id: 'i2i_Income_Sources', name: 'Sources of income', category: 'Common Indicators', visible: true },
    { id: 'fas_strand', name: 'Financial services uptake', category: 'Financial Access', visible: true },
    { id: 'savings_strand', name: 'Savings', category: 'Financial Access', visible: true },
    { id: 'credit_strand', name: 'Credit', category: 'Financial Access', visible: true },
    { id: 'remittances_strand', name: 'Send and receive money', category: 'Financial Access', visible: false },
    { id: 'insurance_strand', name: 'Insurance', category: 'Financial Access', visible: false },
    { id: 'total_fas_strand', name: 'Financial Acces Strands', category: 'Financial Access', visible: false },
    { id: 'total_saving_strand', name: 'Saving Strands', category: 'Financial Access', visible: false },
    { id: 'total_remittances_strand', name: 'Remittances Strands', category: 'Financial Access', visible: false },
    { id: 'total_insurance_strand', name: 'Insurance Strands', category: 'Financial Access', visible: false },
    { id: 'total_credit_strand', name: 'Credit Strands', category: 'Financial Access', visible: false }
  ];

  App.Collection.IndicatorsCollection = Backbone.Collection.extend({

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
      this.set(INDICATORS);
      deferred.resolve(INDICATORS);
      return deferred;
    },

    getVisibleIndicators: function () {
      return this.toJSON().filter(function (indicator) {
        return indicator.visible;
      });
    }
  });
}).call(this, this.App);
