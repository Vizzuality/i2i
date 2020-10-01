(function (App) {
  'use strict';

  var categories = App.Helper.Indicators.CATEGORIES;

  var MOBILE_SURVEYS_INDICATORS = [
    { id: 'geographic_area', name: 'Geographic Area', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Rural', 'Urban'] },
    { id: 'region', name: 'Province / Region', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: false},
    { id: 'division', name: 'Division', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: false},
    { id: 'age', name: 'Age', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['18-24', '25-34', '35-44', '45-54', '55+'] },
    { id: 'gender', name: 'Gender', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true},
    { id: 'i2i_Marital_Status', name: 'Marital Status', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true },
    { id: 'household_size', name: 'Mean household size', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Above mean size', 'Below mean size', 'Mean'] },
    { id: 'i2i_Education', name: 'Level of education', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, isFullWidth: true, preferedOrder: ['Higher education', 'Primary education', 'Secondary education', 'No formal education', 'Other'] },
    { id: 'main_lan', name: 'Main language', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, isFullWidth: true },
    { id: 'english_literacy', name: 'English literacy', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Excellent', 'Fair', 'Good', 'Not at all', 'Poorly'] },
    { id: 'swahili_literacy', name: 'Swahili literacy', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: false},
    { id: 'language_literacy', name: 'Read & write in any language', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: false}, 
    { id: 'interview_lan', name: 'Language of interview', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true },
    { id: 'poverty_line', name: 'Poverty line', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Above poverty line', 'Below poverty line'] },
    { id: 'migrant_work', name: 'Migrant worker identity', category: categories.DEMOGRAPHICS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Me', 'No-one, all live together', 'Other family', 'Spouse'] },
  
    { id: 'land_decission', name: 'Land decision maker', category: categories.OWNERSHIP_AND_CONTROL, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Decide together with others', 'Family/Friends without me', 'Me only'] },
    { id: 'land_owner', name: 'Land ownership', category: categories.OWNERSHIP_AND_CONTROL, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Dont own', 'Own by self', 'Own with others'] },
    { id: 'own_phone', name: 'Own a phone', category: categories.OWNERSHIP_AND_CONTROL, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Dont own phone', 'Own phone', 'Own phone/Business/Employer'] },
    { id: 'who_phone', name: 'Phone ownership', category: categories.OWNERSHIP_AND_CONTROL, defaultChart: 'grouped bar', visible: true },
    { id: 'phone_use', name: 'Independent phone use', category: categories.OWNERSHIP_AND_CONTROL, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Dont use mobile phone', 'No', 'Yes', 'Somewhat'] },

    { id: 'saving_goal_deccision', name: 'Savings goal decision maker', category: categories.AGENCY_AND_DECISION_MAKING, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Decide together', 'No savings goal', 'Self alone', 'Spouse/Family/Others on behalf'] },
    { id: 'saving_goal_influence', name: 'Savings goal influence', category: categories.AGENCY_AND_DECISION_MAKING, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Always accepted', 'Always rejected', 'Dont consult', 'No savings goal', 'Sometimes accepted/Rejected'] },
    { id: 'spending_decission', name: 'Spending decision maker', category: categories.AGENCY_AND_DECISION_MAKING, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Fully on own', 'Help from someone else', 'Someone else decides for me'] },

    { id: 'raise_gni', name: 'Possibility to raise 1/20 GNI (Gross National Income)', category: categories.INCOME, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Not at all possible', 'Not very possible', 'Somewhat possible', 'Very possible'] },
    { id: 'freq_inconme_spouse', name: 'Income frequency of spouse', category: categories.INCOME, defaultChart: 'grouped bar', visible: true, isFullWidth: true, preferedOrder: ['Daily', 'Monthly', 'Weekly/Biweekly', 'Dont work', 'Don’t know', 'No spouse', 'Work unpaid', 'When they get work'] }, 
    { id: 'main_income_earned', name: 'Main income earner', category: categories.INCOME, defaultChart: 'grouped bar', visible: true },
    { id: 'earning_freq', name: 'Earning frequency', category: categories.INCOME, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Daily', 'I dont work', 'Monthly', 'Weekly/Biweekly', 'When i get work', 'Work unpaid'] },

    { id: 'allow_spouse_work', name: 'Allow spouse to work', category: categories.GENDER_NORMS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['No', 'Yes', 'Not married', 'Spouse already works for money'] },
    { id: 'permission_work', name: 'Permission to work', category: categories.GENDER_NORMS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Already working', 'No', 'Yes'] },
    { id: 'children_decission', name: 'Children decision maker', category: categories.GENDER_NORMS, defaultChart: 'grouped bar', visible: true, isFullWidth: true, preferedOrder: ['Decide alone', 'Decide together', 'Spouse decides', 'We do not talk about it', 'Others decide', 'Not in relationship'] },
    { id: 'bank_permission', name: 'Permission to open bank', category: categories.GENDER_NORMS, defaultChart: 'grouped bar', visible: true, preferedOrder: ['No', 'Yes'] },

    { id: 'phone_use_financial', name: 'Informal financial usage', category: categories.FINANCIAL_INC, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Yes', 'No'] },
    { id: 'mobile_money', name: 'Mobile Money', category: categories.FINANCIAL_INC, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Dont use mm', 'Dont use mobile phone', 'Own', 'Share/Use others'] },
    { id: 'bank', name: 'Bank', category: categories.FINANCIAL_INC, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Other', 'Other fam', 'Own', 'Spouse', 'Unbanked'] },
    { id: 'account_money_taken', name: 'Money taken from account', category: categories.FINANCIAL_INC, defaultChart: 'grouped bar', visible: true, preferedOrder: ['Dont have account', 'Money not taken', 'Money taken'] }
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
