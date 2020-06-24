(function (App) {
  'use strict';

  var INDICATORS = [    
    { id: 'own_phone', name: 'Own a phone', category: 'Common indicators', visible: false },
    { id: 'who_phone', name: 'Phone ownership', category: 'Common indicators', visible: false },
    { id: 'phone_use', name: 'Independent phone use', category: 'Common indicators', visible: false },
    { id: 'phone_use_financial', name: 'Informal financial usage', category: 'Common indicators', visible: false },
    
    { id: 'children_decission', name: 'Children decision maker', category: 'Decission making', visible: false },
    { id: 'land_owner', name: 'Land ownership', category: 'Decission making', visible: false },
    { id: 'land_decission', name: 'Land decision maker', category: 'Decission making', visible: false },
    { id: 'spending_decission', name: 'Spending decision maker', category: 'Decission making', visible: false },
    { id: 'saving_goal_deccision', name: 'Savings goal decision maker', category: 'Decission making', visible: false },
    { id: 'saving_goal_influence', name: 'Savings goal influence', category: 'Decission making', visible: false },
    
    { id: 'allow_spouse_work', name: 'Allow spouse to work', category: 'Work', visible: false },
    { id: 'permission_work', name: 'Permission to work', category: 'Work', visible: false },
    { id: 'migrant_work', name: 'Migrant worker identity', category: 'Work', visible: false },
    { id: 'earning_freq', name: 'Earning frequency', category: 'Work', visible: false },
    { id: 'freq_inconme_spouse', name: 'Income frequency of spouse', category: 'Work', visible: false },
    { id: 'main_income_earned', name: 'Main income earner', category: 'Work', visible: false },

    { id: 'fas_strand', name: 'Financial services uptake', category: 'Financial access', visible: true },
    { id: 'savings_strand', name: 'Savings', category: 'Financial access', visible: true },
    { id: 'credit_strand', name: 'Credit', category: 'Financial access', visible: true },
    { id: 'remittances_strand', name: 'Send and receive money', category: 'Financial access', visible: false },
    { id: 'insurance_strand', name: 'Insurance', category: 'Financial access', visible: false },
    { id: 'bank', name: 'Bank', category: 'Financial access', visible: false },
    { id: 'bank_permission', name: 'Permission to open bank', category: 'Financial access', visible: false },
    { id: 'account_money_taken', name: 'Money taken from account', category: 'Financial access', visible: false },
    { id: 'mobile_money', name: 'Mobile money', category: 'Financial access', visible: false },

    { id: 'total_fas_strand', name: 'Financial access strands', category: 'Strands', visible: false },
    { id: 'total_saving_strand', name: 'Savings strands', category: 'Strands', visible: false },
    { id: 'total_remittances_strand', name: 'Remittances strands', category: 'Strands', visible: false },
    { id: 'total_insurance_strand', name: 'Insurance strands', category: 'Strands', visible: false },
    { id: 'total_credit_strand', name: 'Credit strands', category: 'Strands', visible: false },

    { id: 'asset_strand', name: 'Comfortable assets', category: 'Asset', visible: false },
    { id: 'asset_strand', name: 'Basic assets', category: 'Asset', visible: false },
    { id: 'asset_strand', name: 'Average assets', category: 'Asset', visible: false },
    { id: 'total_asset_strand', name: 'Asset ladder', category: 'Asset', visible: false },

    { id: 'sdgs_strand', name: 'Health symptom', category: 'SDGs', visible: false },
    { id: 'sdgs_strand', name: 'Hunger symptom', category: 'SDGs', visible: false },
    { id: 'sdgs_strand', name: 'Education symptom', category: 'SDGs', visible: false },
    { id: 'sdgs_strand', name: 'Formally employed', category: 'SDGs', visible: false },

    { id: 'poverty_line', name: 'Poverty line', category: 'Poverty', visible: false },
    { id: 'raise_gni', name: 'Possibility to raise 1/20 GNI (Gross National Income)', category: 'Poverty', visible: false },
    { id: 'usd_per_day', name: 'USD per day', category: 'Poverty', visible: false }
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
