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
        expanded: false
      }, options);
    },

    url: function() {
      var url =  API_URL + '/indicator/' + this.options.id + (this.options.expanded ? '/expanded' : '') + '?' + this.options.iso + '=' + this.options.year;

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
      var isAccess = this.options.indicator.category === App.Helper.Indicators.CATEGORIES.ACCESS;
      var parsedData;

      if (isAccess) {
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

    parse: function (data) {
      if (this.options.expanded) return this._parseExpandedData(data);

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
