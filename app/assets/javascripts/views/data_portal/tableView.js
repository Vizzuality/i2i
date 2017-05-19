((function (App) {
  'use strict';

  var HeadersCollection = Backbone.Collection.extend({

    model: Backbone.Model.extend({

      /**
       * Return whether the header is searchable
       * @returns {Boolean}
       */
      isSearchable: function () {
        return this.attributes.searchable;
      },

      /**
       * Return whether the header is sortable
       * @returns {Boolean}
       */
      isSortable: function () {
        return this.attributes.sortable;
      }

    }),

    parse: function (data) {
      if (data.length) {
        return data[0].row
          .map(function (cell) {
            return {
              name: cell.name,
              searchable: !!cell.searchable,
              sortable: !!cell.sortable
            };
          });
      }

      return [];
    }

  });

  App.View.TableView = Backbone.View.extend({

    defaults: {
      // Number of results per page
      resultsPerPage: 10,
      // Options for the results per page
      // If the value is null or the array is empty, the selector is not shown
      resultsPerPageOptions: [10, 25, 50, 100],
      // Current pagination index
      paginationIndex: 0,
      // Collection representing the table (not a Backone collection)
      // Each row can contain the name of the column, the value of the cell or an html content,
      // an attribute to tell if the column can be searchable and another to tell if it's sortable
      // The value attribute can have an array of strings
      // An optional link attribute can be present, it contains its url and an attribute to tell
      // if the link is external or not (this is not built for multi-value cells)
      // An example of the format can be:
      // [
      //   {
      //     row: [
      //       { name: 'Price', value: '$3', searchable: true },
      //       { name: 'Countries', value: ['Spain', 'France'], searchable: true, sortable: false },
      //       { name: null, html: '<button type="button">Delete</button>', searchable: false },
      //       { name: Device, value: 'iPhone 6', link: { url: 'https://www.apple.com', external: true }, searchable: false }
      //     ]
      //   }
      // ]
      // NOTE: don't directly call this value, use _getCollection instead
      collection: null,
      // List of headers
      // This is computed at instantiation, do not set it from outside
      headers: null,
      // Column index used for sorting the table
      // -1 for no sorting
      sortColumnIndex: -1,
      // Sort order: 1 for ASC, -1 for DESC
      sortOrder: 1,
      // Table name used by screen readers
      tableName: null,
      // Search field: must be a empty div DOM element with class "c-input-search" (to get the styles)
      // If let to null, the search feature will be disabled
      searchFieldContainer: null,
      // Search query. Do not set from outside.
      searchQuery: null,
      // Number of values displayed by cell
      // Once the number is reached, a button lets the user see the rest of the list
      valuesPerCell: 5
    },

    template: JST['templates/data_portal/table'],

    // This is temporarly disabled as it's not used
    // modalTemplate: JST['templates/data_portal/table-modal'],
    modalTemplate: function() { return ''; },

    initialize: function (settings) {
      this.options = Object.assign({}, this.defaults, settings);

      if (!this.options.collection || !this.options.collection.length) {
        throw new Error('Please provide a collection to the table component.');
      }

      if (!this.options.tableName || !this.options.tableName.length) {
        throw new Error('Please provide a name to the table component.');
      }

      this.options.headers = new HeadersCollection(this._getCollection(), { parse: true });
      this._initSort();
      if (this.options.searchFieldContainer) this._initSearch();
      this.render();
    },

    /**
     * Set global variables
     */
    _setVars: function () {
      this.$headersContainer = this.$('.js-header');
      this.$headers = this.$headersContainer.children();
    },

    /**
     * Set the listeners on the rendered DOM
     */
    _setListeners: function () {
      this.$headersContainer.on('click', function (e) {
        // We need to move the user to the first page of results
        // NOTE: it needs to be placed before the actual sort so that when the table
        // is rendered, the page is resetted
        this.options.paginationIndex = 0;

        var column = e.target.textContent;
        if (column) this._sortTable(column);
      }.bind(this));

      this.$headersContainer.on('keydown', this._onKeydownHeader.bind(this));

      this.$('.js-more').on('click', this._onClickMore.bind(this));

      this.$('.js-results-per-page').on('change', this._onChangeResultsPerPage.bind(this));

      this.$('.js-prev-page').on('click', function () {
        this.options.paginationIndex = Math.max(this.options.paginationIndex - 1, 0);
        this.render();
      }.bind(this));

      this.$('.js-next-page').on('click', function () {
        this.options.paginationIndex = Math.min(
          this.options.paginationIndex + 1,
          Math.floor(this.options.collection.length / this.options.resultsPerPage)
        );
        this.render();
      }.bind(this));
    },

    /**
     * Listener for the key events on the header
     * @param {Object} event
     */
    _onKeydownHeader: function (e) {
      var currentHeaderIndex = this.$headers.index($(e.target));

      switch (e.keyCode) {
        case 13: // enter key
        case 32: // space key
          // We need to move the user to the first page of results
          // NOTE: it needs to be placed before the actual sort so that when the table
          // is rendered, the page is resetted
          this.options.paginationIndex = 0;
          this._sortTable(e.target.textContent);
          this._focusOnHeaderAtIndex(currentHeaderIndex);
          break;

        case 37: // left arrow
        case 38: // top arrow
          var previousHeaderIndex = currentHeaderIndex;
          // We search for the previous sortable column's header
          do {
            previousHeaderIndex = (previousHeaderIndex - 1) % this.options.headers.length;
            if (previousHeaderIndex < 0) previousHeaderIndex = this.options.headers.length - 1;
          } while (!this.options.headers.at(previousHeaderIndex).isSortable());
          this._focusOnHeaderAtIndex(previousHeaderIndex);
          break;

        case 39: // right arrow
        case 40: // down arrow
          var nextHeaderIndex = currentHeaderIndex;
          // We search for the next sortable column's header
          do {
            nextHeaderIndex = (nextHeaderIndex + 1) % this.options.headers.length;
          } while (!this.options.headers.at(nextHeaderIndex).isSortable());
          this._focusOnHeaderAtIndex(nextHeaderIndex);
          break;

        default:
      }
    },

    /**
     * Listener for the click on the "and more" buttons
     * @param {Event} e - event
     */
    _onClickMore: function (e) {
      var tooltipContainer = e.target;
      var columnName = tooltipContainer.dataset.column;
      var values = tooltipContainer.dataset.values.split(',');

      var modal = new (App.View.ModalView.extend({
        render: function () {
          return this.modalTemplate({
            columnName: columnName,
            values: values
          });
        }.bind(this)
      }))();

      modal.open();
    },

    /**
     * Listener for the change of the "results per page" selector
     * @param {Event} e - event
     */
    _onChangeResultsPerPage: function (e) {
      var value = +e.target.selectedOptions[0].value;
      this.options.resultsPerPage = value;
      this.options.paginationIndex = 0;
      this.render();
    },

    /**
     * Focus on the header at the specified index
     * @param {Number} index
     */
    _focusOnHeaderAtIndex: function (index) {
      this.$headers.filter('[tabindex="0"]').attr('tabindex', '-1');
      this.$headers.eq(index)
        .attr('tabindex', '0')
        .focus();
    },

    /**
     * Set the comparator to the table's first column and sort the collection
     */
    _initSort: function () {
      var collator = new Intl.Collator([], { sensitivity: 'base' });

      this.options.compareFunction = function (modelA, modelB) {
        var cellA = modelA.row[this.options.sortColumnIndex];
        var cellB = modelB.row[this.options.sortColumnIndex];

        var valA = Array.isArray(cellA.value) ? cellA.value[0] : cellA.value;
        var valB = Array.isArray(cellB.value) ? cellB.value[0] : cellB.value;

        if ((valA === undefined || valA === null) && (valB === undefined || valB === null)) {
          return 0;
        } else if ((valA === undefined || valB === null) && valB) {
          return -1 * this.options.sortOrder;
        } else if (valA && (valB === undefined || valB === null)) {
          return this.options.sortOrder;
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          if (valA < valB) return -1 * this.options.sortOrder;
          if (valA > valB) return this.options.sortOrder;
          return 0;
        } else if (typeof valA === 'number' && typeof valB !== 'number') {
          return -1 * this.options.sortOrder;
        } else if (typeof valA !== 'number' && typeof valB === 'number') {
          return this.options.sortOrder;
        }

        return collator.compare(valA, valB) * this.options.sortOrder;
      }.bind(this);

      if (this.options.sortColumnIndex !== -1) this.options.collection.sort(this.options.compareFunction);
    },

    /**
     * Return the value of the collection
     * @returns {object[]}
     */
    _getCollection: function () {
      var collection = this.options.collection;
      if (!this.options.searchQuery || !this.options.searchQuery.length) return collection;

      // Each time, we need to recreate an instance of Fuse to maintain the sorting of the table
      var searchableColumns = this.options.headers.toJSON()
        .filter(function (header) { return header.searchable; })
        .map(function (header) { return header.name; });

      // We need to format the data for Fuse
      // The basic idea is that Fuse has a direct access to the searchable columns and their value.
      // We maintain a reference to the original row so we can display it later
      // Example of the format:
      // [
      //   {
      //     row: [
      //      { name: 'Title', value: 'Vizzuality' },
      //      { name: 'Price', value: '100€' }
      //     ],
      //     Title: 'Vizzuality',
      //     Price: '100€'
      //   }
      // ]
      var fuseCollection = collection.map(function (row) {
        var o = {};
        o.row = row;
        for (var i = 0, j = searchableColumns.length; i < j; i++) {
          var value = _.findWhere(row.row, { name: searchableColumns[i] }).value;
          o[searchableColumns[i]] = value;
        }
        return o;
      });

      var fuse = new Fuse(fuseCollection, {
        include: ['matches'],
        keys: searchableColumns,
        tokenize: true,
        threshold: 0.1,
        matchAllTokens: true,
        shouldSort: false
      });

      var searchResults = fuse.search(this.options.searchQuery);

      return searchResults.map(function (result) {
        return result.item.row;
      });
    },

    /**
     *  Adds a search input and a submit button into the searchField container
     */
    _initSearch: function () {
      var searchField = document.createElement('input');
      searchField.setAttribute('type', 'input');
      searchField.setAttribute('placeholder', 'Search');

      var searchButton = document.createElement('button');
      searchButton.textContent = 'Search';

      // We attach the event listeners
      searchField.addEventListener('input', function (e) {
        // We need to move the user to the first page of results
        // NOTE: it needs to be placed before the actual search so that when the table
        // is rendered, the page is resetted
        this.options.paginationIndex = 0;

        this._search(e.target.value);
      }.bind(this));
      searchButton.addEventListener('click', function () {
        // We need to move the user to the first page of results
        // NOTE: it needs to be placed before the actual search so that when the table
        // is rendered, the page is resetted
        this.options.paginationIndex = 0;

        this._search(searchField.value);
      }.bind(this));

      // We bind the elements to the DOM
      this.options.searchFieldContainer.innerHTML = ''; // We make sure the container is empty
      this.options.searchFieldContainer.appendChild(searchField);
      this.options.searchFieldContainer.appendChild(searchButton);
    },

    /**
     * Sort the table ASC by the column the user clicked on or DESC if the table was already
     * sorted ASC by the same column
     * @param {String} columnName
     */
    _sortTable: function (columnName) {
      if (!columnName.length) return;

      var column = this.options.headers.findWhere({ name: columnName });
      if (!column || !column.isSortable()) return;

      var columnIndex = this.options.headers.indexOf(column);
      if (this.options.sortColumnIndex === columnIndex) {
        this.options.sortOrder *= -1;
      } else {
        this.options.sortOrder = 1;
        this.options.sortColumnIndex = columnIndex;
      }

      this.options.collection.sort(this.options.compareFunction);
      this.render();
    },

    /**
     * Render the table with the result of the search
     * @param {String} query
     */
    _search: function (query) {
      this.options.searchQuery = query;
      this.render();
    },

    /**
     * Return the list of rows, ready for being rendered
     * @returns {object[]} rows
     */
    _getRenderableRows: function () {
      var start = this.options.resultsPerPage * this.options.paginationIndex;
      var end = this.options.resultsPerPage * (this.options.paginationIndex + 1);

      return this._getCollection()
        .slice(start, end)
        .map(function (row, index) {
          // The rowIndex value is used for accessibility
          // The index needs to start at 2 because the header row is 1
          return Object.assign({}, row.row, { rowIndex: index + 2 });
        });
    },

    render: function () {
      var sortColumn;
      if (this.options.sortColumnIndex !== -1) {
        sortColumn = this.options.headers.at(this.options.sortColumnIndex).attributes.name;
      }

      var headers;
      if (this.options.collection.length) {
        headers = this.options.headers.toJSON()
          .map(function (column) {
            var sort;
            if (sortColumn && column.name === sortColumn) {
              sort = this.options.sortOrder === 1 ? 'ascending' : 'descending';
            }

            return {
              name: column.name,
              sort: sort
            };
          }, this);
      }

      this.el.classList.add('c-table');

      this.$el.html(this.template({
        tableName: this.options.tableName,
        tableId: btoa(this.options.tableName),
        headers: headers,
        columnCount: headers.length,
        resultsPerPage: this.options.resultsPerPage,
        resultsPerPageOptions: this.options.resultsPerPageOptions,
        firstResultIndex: this._getCollection().length ? (this.options.resultsPerPage * this.options.paginationIndex) + 1 : 0,
        lastResultIndex: Math.min(this.options.resultsPerPage * (this.options.paginationIndex + 1), this._getCollection().length),
        totalResults: this._getCollection().length,
        rows: this._getRenderableRows(),
        sortColumn: sortColumn,
        sortOrder: this.options.sortOrder === 1 ? 'ascending' : 'descending',
        error: this.error,
        isSearchResult: this.options.searchQuery && !!this.options.searchQuery.length,
        valuesPerCell: this.options.valuesPerCell
      }));

      this._setVars();
      this._setListeners();
    }

  });
})(this.App));
