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
    { id: 'insurance_strand', name: 'Insurance', category: 'Financial Access', visible: false }
    // { id: 'total_strands', name: 'Strands', category: 'Financial Access', visible: false }
  ];

  App.Collection.IndicatorsCollection = Backbone.Collection.extend({

    fetch: function () {
      var deferred = $.Deferred();
      this.set(INDICATORS);
      deferred.resolve(INDICATORS);
      return deferred;
    },

  });

}).call(this, this.App);
