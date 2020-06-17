(function (App) {
  'use strict';

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

      // XXX: TMP
      if (this.options.id === 'mobile_survey_mock1') {
        return this.tmpGenerateMock('Relationship Status', {
          category: ['Married', 'Not married'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock2') {
        return this.tmpGenerateMock('Urbanicity', {
          category: ['rural', 'not rural'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock_heatmap') {
        return this.tmpGenerateMock('Urbanicity and age groups', {
          category: ['rural', 'urban'],
          position: ["18-24", "25-34", "35-44", "45-54", "55 +"],
          status: ["male", "female"],
          minDataCount: 400
        })
      }

      if (this.options.id === 'mobile_survey_mock4') {
        return this.tmpGenerateMock('Mean household size', {
          category: ['Above mean size', 'Below mean size', 'Mean'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock5') {
        return this.tmpGenerateMock('2.50 PPP Poverty line', {
          category: ['Rural', 'Urban'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock6') {
        return this.tmpGenerateMock('Phone ownership', {
          category: ['Children', 'Dont use mobile phone', 'Husband/wifes', 'Other man/women', 'Parent', 'Sibling', 'Own phone buisness/employer'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock7') {
        return this.tmpGenerateMock('Bank', {
          category: ['Other', 'Other fam', 'Own bank', 'Spouse', 'Unbanked'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }

      if (this.options.id === 'mobile_survey_mock8') {
        return this.tmpGenerateMock('Mobile money', {
          category: ['Dont use MM', 'Dont use mobile phone', 'Own', 'Share use/others'],
          position: ['male', 'female'],
          minDataCount: 30
        })
      }
  

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
