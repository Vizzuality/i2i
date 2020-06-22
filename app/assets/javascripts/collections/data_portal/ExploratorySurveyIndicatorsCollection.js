(function (App) {
  'use strict';

  var categories = App.Helper.Indicators.CATEGORIES;

  var MOBILE_SURVEYS_INDICATORS = [
    { id: 'geographic_area', name: 'Geographic Area', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'gender', name: 'Gender', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'age', name: 'Age', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'i2i_Marital_Status', name: 'Marital Status', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'household_size', name: 'Mean household size', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'i2i_Education', name: 'Level of education', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    
    
    { id: 'main_lan', name: 'Main language', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'english_literacy', name: 'English literacy', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true }, 
    { id: 'interview_lan', name: 'Language of interview', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'land_owner', name: 'Land ownership', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'land_decission', name: 'Land decision maker', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'children_decission', name: 'Children decision maker', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'allow_spouse_work', name: 'Allow spouse to work', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'earning_freq', name: 'Earning frequency', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'spending_decission', name: 'Spending decision maker', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'poverty_line', name: 'Poverty line', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'raise_gni', name: 'Possibility to raise 1/20 GNI (Gross National Income)', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'permission_work', name: 'Permission to work', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'freq_inconme_spouse', name: 'Income frequency of spouse', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true }, 
    { id: 'main_income_earned', name: 'Main income earner', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'migrant_work', name: 'Migrant worker identity', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'own_phone', name: 'Own a phone', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'who_phone', name: 'Phone ownership', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'phone_use', name: 'Independent phone use', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'phone_use_financial', name: 'Informal financial usage', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'mobile_money', name: 'Mobile money', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'bank', name: 'Bank', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'bank_permission', name: 'Permission to open bank', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'account_money_taken', name: 'Money taken from account', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'saving_goal_deccision', name: 'Savings goal decision maker', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
    { id: 'saving_goal_influence', name: 'Savings goal influence', category: categories.EXPLORATORY_SURVEY, defaultChart: 'grouped bar', visible: true },
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
        return Object.assign(indicator, { isMobileSurvey: true });
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
