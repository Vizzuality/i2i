(function (App) {
  'use strict';

  // TMP FOR MOCKS
  var mobileSurveyIDS = [
    "geographic_area",
    "gender",
    "age",
    "access_to_resources",
    "dwelling_type",
    "i2i_Marital_Status",
    "i2i_Education",
    "i2i_Income_Sources",
    "fas_strand",
    "savings_strand",
    "remittances_strand",
    "insurance_strand",
    "credit_strand",
    "total_fas_strand",
    "total_saving_strand",
    "total_remittances_strand",
    "total_insurance_strand",
    "total_credit_strand",
    "toilet_type",
    "cooking_energy_type",
    "electricity_access_type",
    "usd_per_day",
    "poverty_line",
    "mobile_money",
    "asset_strand",
    "total_asset_strand",
    "sdgs_strand",
    "water_source_type"
  ]

  App.Model.IndicatorModel = Backbone.Model.extend({

    // Check the default values in the initialize method
    // The values can't be placed here because Backbone.Model
    // will interprate them as the default model data
    defaults: {},

    initialize: function (attributes, options) {
      this.options = _.extend({}, {
        // Indicator id
        id: null,
        // Country ISO
        iso: null,
        // Year
        year: null,
        // Information about the indicator
        // This property is mandatory when fetching the expanded data of an indicator
        indicator: null,
        // List of filters
        // See _filters in App.Page.DataPortalCountryPage to see their format
        filters: [],
        // Whether or not the detailed data must be fetch
        expanded: false,
        isRegion: false,
        isMSME: false,
      }, options);
    },

    url: function() {
      var pathname = this.options.isRegion ? 'indicator-region' : 'indicator';
      var apiUrl = this.options.isMSME ? MSME_API_URL : API_URL;
      var url =  apiUrl + '/' + pathname + '/' + this.options.id + (this.options.expanded ? '/expanded' : '') + '?' + this.options.iso + '=' + this.options.year;

      if (this.options.filters.length) {
        var filters = this.options.filters.map(function (filter) {
          return {
            indicatorId: filter.id,
            value: filter.options
          };
        }.bind(this));
        url += '&filters=' + JSON.stringify(filters);
      }

      return url;
    },

    /**
     * Parse the data of an expanded indicator
     * The format return is compatible with App.View.TableView
     * @param {object} data
     * @return {object}
     */
    _parseExpandedData: function (data) {
      var isComplex = this.options.indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS
        || this.options.indicator.category === App.Helper.Indicators.CATEGORIES.STRANDS;
      var parsedData;

      if (isComplex) {
        var rows = _.groupBy(data.data, function (row) { return row.row_id; });
        var rowsKeys = Object.keys(rows);
        var headersCount = rowsKeys[0].length;

        // We retrieve the mapping between the ids and the name of the columns
        var idToName = {};
        for (var i = 0, j = rowsKeys.length; i < j; i++) {
          var row = rows[rowsKeys[i]];
          row.forEach(function (cell) {
            if (cell.value.length && Object.keys(idToName).indexOf(cell.answerId) === -1) {
              idToName[cell.answerId] = cell.value;
            }
          });

          // We break when we have all the names
          if (Object.keys(idToName).length === headersCount) break;
        }

        parsedData = rowsKeys.map(function (key) {
          var row = rows[key];
          return {
            row: row.map(function (cell) {
              return {
                name: idToName[cell.answerId],
                value: cell.value.length ? 'Yes' : 'No',
                sortable: true
              };
            }).concat([{
              name: 'Weight',
              value: row[0].weight,
              sortable: true
            }])
          };
        });
      } else {
        parsedData = data.data.map(function (row) {
          return {
            row: [
              { name: data.title, value: row.value, sortable: true },
              { name: 'Weight', value: row.weight, sortable: true }
            ]
          };
        });
      }

      return { title: data.title, data: parsedData };
    },

    // XXX: Tmp data generator
    tmpGenerateMock: function (title, defs) {
      var randFromArr = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
  
      function randomIntFromInterval(min, max, floor) {
        if (floor) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        return Math.random();
      }
      
      var mock = new Array(randomIntFromInterval(defs.minDataCount, defs.minDataCount * 2, true)).fill().map(function () {
        if (Array.isArray(defs.status)) {
          return {
            'category': randFromArr(defs.category),
            'position': randFromArr(defs.position),
            'status': randFromArr(defs.status),
            'value': randomIntFromInterval(0, 70, true)
          }
        }
        return {
          'category': randFromArr(defs.category),
          'position': randFromArr(defs.position),
          'value': randomIntFromInterval(0, 1, false)
        }
      })

      return {
        title: title,
        data: mock
      };
    },

    parse: function (data) {
      if (this.options.expanded) return this._parseExpandedData(data);

      if (mobileSurveyIDS.indexOf(this.options.id) > -1) {
        console.log('opt', this.options)
        return this.tmpGenerateMock(this.options.indicator.name, {
          category: ['Married', 'Not married'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      // if (this.options.id === 'mobile_survey_mock_heatmap') {
      //   return this.tmpGenerateMock('Urbanicity and age groups', {
      //     category: ['rural', 'urban'],
      //     position: ["18-24", "25-34", "35-44", "45-54", "55 +"],
      //     status: ["male", "female"],
      //     minDataCount: 400
      //   })
      // }

      return {
        title: data.title,
        data: data.data.map(function (answer) {
          return {
            id: answer.answerId,
            label: answer.value,
            count: answer.count,
            total: answer.sum,
            percentage: answer.percentage
          };
        })
      };
    }

  });

}).call(this, this.App);
