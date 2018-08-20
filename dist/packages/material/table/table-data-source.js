"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var table_1 = require("@angular/cdk/table");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
var /**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
MatTableDataSource = /** @class */ (function (_super) {
    __extends(MatTableDataSource, _super);
    function MatTableDataSource(initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        /** Stream emitting render data to the table (depends on ordered data changes). */
        _this._renderData = new rxjs_1.BehaviorSubject([]);
        /** Stream that emits when a new filter string is set on the data source. */
        _this._filter = new rxjs_1.BehaviorSubject('');
        /**
           * Subscription to the changes that should trigger an update to the table's rendered rows, such
           * as filtering, sorting, pagination, or base data changes.
           */
        _this._renderChangesSubscription = rxjs_1.Subscription.EMPTY;
        /**
           * Data accessor function that is used for accessing data properties for sorting through
           * the default sortData function.
           * This default function assumes that the sort header IDs (which defaults to the column name)
           * matches the data's properties (e.g. column Xyz represents data['Xyz']).
           * May be set to a custom function for different behavior.
           * @param data Data object that is being accessed.
           * @param sortHeaderId The name of the column that represents the data.
           */
        _this.sortingDataAccessor = function (data, sortHeaderId) {
            var value = data[sortHeaderId];
            if (coercion_1._isNumberValue(value)) {
                var numberValue = Number(value);
                // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
                // leave them as strings. For more info: https://goo.gl/y5vbSg
                return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
            }
            return value;
        };
        /**
           * Gets a sorted copy of the data array based on the state of the MatSort. Called
           * after changes are made to the filtered data or when sort changes are emitted from MatSort.
           * By default, the function retrieves the active sort and its direction and compares data
           * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
           * of data ordering.
           * @param data The array of data that should be sorted.
           * @param sort The connected MatSort that holds the current sort state.
           */
        _this.sortData = function (data, sort) {
            var active = sort.active;
            var direction = sort.direction;
            if (!active || direction == '') {
                return data;
            }
            return data.sort(function (a, b) {
                var valueA = _this.sortingDataAccessor(a, active);
                var valueB = _this.sortingDataAccessor(b, active);
                // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
                // one value exists while the other doesn't. In this case, existing value should come first.
                // This avoids inconsistent results when comparing values to undefined/null.
                // If neither value exists, return 0 (equal).
                var comparatorResult = 0;
                if (valueA != null && valueB != null) {
                    // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
                    if (valueA > valueB) {
                        comparatorResult = 1;
                    }
                    else if (valueA < valueB) {
                        comparatorResult = -1;
                    }
                }
                else if (valueA != null) {
                    comparatorResult = 1;
                }
                else if (valueB != null) {
                    comparatorResult = -1;
                }
                return comparatorResult * (direction == 'asc' ? 1 : -1);
            });
        };
        /**
           * Checks if a data object matches the data source's filter string. By default, each data object
           * is converted to a string of its properties and returns true if the filter has
           * at least one occurrence in that string. By default, the filter string has its whitespace
           * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
           * filter matching.
           * @param data Data object used to check against the filter.
           * @param filter Filter string that has been set on the data source.
           * @returns Whether the filter matches against the data
           */
        _this.filterPredicate = function (data, filter) {
            // Transform the data into a lowercase string of all property values.
            var accumulator = function (currentTerm, key) { return currentTerm + data[key]; };
            var dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            var transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) != -1;
        };
        _this._data = new rxjs_1.BehaviorSubject(initialData);
        _this._updateChangeSubscription();
        return _this;
    }
    Object.defineProperty(MatTableDataSource.prototype, "data", {
        /** Array of data that should be rendered by the table, where each object represents one row. */
        get: /** Array of data that should be rendered by the table, where each object represents one row. */
        function () { return this._data.value; },
        set: function (data) { this._data.next(data); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "filter", {
        /**
         * Filter term that should be used to filter out objects from the data array. To override how
         * data objects match to this filter string, provide a custom function for filterPredicate.
         */
        get: /**
           * Filter term that should be used to filter out objects from the data array. To override how
           * data objects match to this filter string, provide a custom function for filterPredicate.
           */
        function () { return this._filter.value; },
        set: function (filter) { this._filter.next(filter); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "sort", {
        /**
         * Instance of the MatSort directive used by the table to control its sorting. Sort changes
         * emitted by the MatSort will trigger an update to the table's rendered data.
         */
        get: /**
           * Instance of the MatSort directive used by the table to control its sorting. Sort changes
           * emitted by the MatSort will trigger an update to the table's rendered data.
           */
        function () { return this._sort; },
        set: function (sort) {
            this._sort = sort;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTableDataSource.prototype, "paginator", {
        /**
         * Instance of the MatPaginator component used by the table to control what page of the data is
         * displayed. Page changes emitted by the MatPaginator will trigger an update to the
         * table's rendered data.
         *
         * Note that the data source uses the paginator's properties to calculate which page of data
         * should be displayed. If the paginator receives its properties as template inputs,
         * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
         * initialized before assigning it to this data source.
         */
        get: /**
           * Instance of the MatPaginator component used by the table to control what page of the data is
           * displayed. Page changes emitted by the MatPaginator will trigger an update to the
           * table's rendered data.
           *
           * Note that the data source uses the paginator's properties to calculate which page of data
           * should be displayed. If the paginator receives its properties as template inputs,
           * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
           * initialized before assigning it to this data source.
           */
        function () { return this._paginator; },
        set: function (paginator) {
            this._paginator = paginator;
            this._updateChangeSubscription();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     */
    /**
       * Subscribe to changes that should trigger an update to the table's rendered rows. When the
       * changes occur, process the current state of the filter, sort, and pagination along with
       * the provided base data and send it to the table for rendering.
       */
    MatTableDataSource.prototype._updateChangeSubscription = /**
       * Subscribe to changes that should trigger an update to the table's rendered rows. When the
       * changes occur, process the current state of the filter, sort, and pagination along with
       * the provided base data and send it to the table for rendering.
       */
    function () {
        var _this = this;
        // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
        // The events should emit whenever the component emits a change or initializes, or if no
        // component is provided, a stream with just a null event should be provided.
        // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
        // pipeline can progress to the next step. Note that the value from these streams are not used,
        // they purely act as a signal to progress in the pipeline.
        var sortChange = this._sort ?
            rxjs_1.merge(this._sort.sortChange, this._sort.initialized) :
            rxjs_1.of(null);
        var pageChange = this._paginator ?
            rxjs_1.merge(this._paginator.page, this._paginator.initialized) :
            rxjs_1.of(null);
        var dataStream = this._data;
        // Watch for base data or filter changes to provide a filtered set of data.
        var filteredData = rxjs_1.combineLatest(dataStream, this._filter)
            .pipe(operators_1.map(function (_a) {
            var data = _a[0];
            return _this._filterData(data);
        }));
        // Watch for filtered data or sort changes to provide an ordered set of data.
        var orderedData = rxjs_1.combineLatest(filteredData, sortChange)
            .pipe(operators_1.map(function (_a) {
            var data = _a[0];
            return _this._orderData(data);
        }));
        // Watch for ordered data or page changes to provide a paged set of data.
        var paginatedData = rxjs_1.combineLatest(orderedData, pageChange)
            .pipe(operators_1.map(function (_a) {
            var data = _a[0];
            return _this._pageData(data);
        }));
        // Watched for paged data changes and send the result to the table to render.
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = paginatedData.subscribe(function (data) { return _this._renderData.next(data); });
    };
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     */
    /**
       * Returns a filtered data array where each filter object contains the filter string within
       * the result of the filterTermAccessor function. If no filter is set, returns the data array
       * as provided.
       */
    MatTableDataSource.prototype._filterData = /**
       * Returns a filtered data array where each filter object contains the filter string within
       * the result of the filterTermAccessor function. If no filter is set, returns the data array
       * as provided.
       */
    function (data) {
        var _this = this;
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overridden for customization.
        this.filteredData =
            !this.filter ? data : data.filter(function (obj) { return _this.filterPredicate(obj, _this.filter); });
        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }
        return this.filteredData;
    };
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     */
    /**
       * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
       * data array as provided. Uses the default data accessor for data lookup, unless a
       * sortDataAccessor function is defined.
       */
    MatTableDataSource.prototype._orderData = /**
       * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
       * data array as provided. Uses the default data accessor for data lookup, unless a
       * sortDataAccessor function is defined.
       */
    function (data) {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort) {
            return data;
        }
        return this.sortData(data.slice(), this.sort);
    };
    /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     */
    /**
       * Returns a paged splice of the provided data array according to the provided MatPaginator's page
       * index and length. If there is no paginator provided, returns the data array as provided.
       */
    MatTableDataSource.prototype._pageData = /**
       * Returns a paged splice of the provided data array according to the provided MatPaginator's page
       * index and length. If there is no paginator provided, returns the data array as provided.
       */
    function (data) {
        if (!this.paginator) {
            return data;
        }
        var startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    };
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     */
    /**
       * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
       * index does not exceed the paginator's last page. Values are changed in a resolved promise to
       * guard against making property changes within a round of change detection.
       */
    MatTableDataSource.prototype._updatePaginator = /**
       * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
       * index does not exceed the paginator's last page. Values are changed in a resolved promise to
       * guard against making property changes within a round of change detection.
       */
    function (filteredDataLength) {
        var _this = this;
        Promise.resolve().then(function () {
            if (!_this.paginator) {
                return;
            }
            _this.paginator.length = filteredDataLength;
            // If the page index is set beyond the page, reduce it to the last page.
            if (_this.paginator.pageIndex > 0) {
                var lastPageIndex = Math.ceil(_this.paginator.length / _this.paginator.pageSize) - 1 || 0;
                _this.paginator.pageIndex = Math.min(_this.paginator.pageIndex, lastPageIndex);
            }
        });
    };
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * @docs-private
     */
    /**
       * Used by the MatTable. Called when it connects to the data source.
       * @docs-private
       */
    MatTableDataSource.prototype.connect = /**
       * Used by the MatTable. Called when it connects to the data source.
       * @docs-private
       */
    function () { return this._renderData; };
    /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * @docs-private
     */
    /**
       * Used by the MatTable. Called when it is destroyed. No-op.
       * @docs-private
       */
    MatTableDataSource.prototype.disconnect = /**
       * Used by the MatTable. Called when it is destroyed. No-op.
       * @docs-private
       */
    function () { };
    return MatTableDataSource;
}(table_1.DataSource));
exports.MatTableDataSource = MatTableDataSource;
//# sourceMappingURL=table-data-source.js.map