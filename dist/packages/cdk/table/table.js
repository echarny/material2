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
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var cell_1 = require("./cell");
var row_1 = require("./row");
var table_errors_1 = require("./table-errors");
var coercion_1 = require("@angular/cdk/coercion");
var sticky_styler_1 = require("./sticky-styler");
var bidi_1 = require("@angular/cdk/bidi");
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
var DataRowOutlet = /** @class */ (function () {
    function DataRowOutlet(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    DataRowOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: '[rowOutlet]' },] },
    ];
    /** @nocollapse */
    DataRowOutlet.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ElementRef, },
    ]; };
    return DataRowOutlet;
}());
exports.DataRowOutlet = DataRowOutlet;
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
var HeaderRowOutlet = /** @class */ (function () {
    function HeaderRowOutlet(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    HeaderRowOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: '[headerRowOutlet]' },] },
    ];
    /** @nocollapse */
    HeaderRowOutlet.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ElementRef, },
    ]; };
    return HeaderRowOutlet;
}());
exports.HeaderRowOutlet = HeaderRowOutlet;
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the footer.
 * @docs-private
 */
var FooterRowOutlet = /** @class */ (function () {
    function FooterRowOutlet(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    FooterRowOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: '[footerRowOutlet]' },] },
    ];
    /** @nocollapse */
    FooterRowOutlet.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ElementRef, },
    ]; };
    return FooterRowOutlet;
}());
exports.FooterRowOutlet = FooterRowOutlet;
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 * @docs-private
 */
exports.CDK_TABLE_TEMPLATE = "\n  <ng-container headerRowOutlet></ng-container>\n  <ng-container rowOutlet></ng-container>\n  <ng-container footerRowOutlet></ng-container>";
/**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * @docs-private
 */
var /**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * @docs-private
 */
RowViewRef = /** @class */ (function (_super) {
    __extends(RowViewRef, _super);
    function RowViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowViewRef;
}(core_1.EmbeddedViewRef));
/**
 * A data table that can render a header row, data rows, and a footer row.
 * Uses the dataSource input to determine the data to be rendered. The data can be provided either
 * as a data array, an Observable stream that emits the data array to render, or a DataSource with a
 * connect function that will return an Observable stream that emits the data array to render.
 */
var CdkTable = /** @class */ (function () {
    function CdkTable(_differs, _changeDetectorRef, _elementRef, role, _dir) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        /**
           * Map of all the user's defined columns (header, data, and footer cell template) identified by
           * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
           * any custom column definitions added to `_customColumnDefs`.
           */
        this._columnDefsByName = new Map();
        /**
           * Column definitions that were defined outside of the direct content children of the table.
           * These will be defined when, e.g., creating a wrapper around the cdkTable that has
           * column definitions as *it's* content child.
           */
        this._customColumnDefs = new Set();
        /**
           * Data row definitions that were defined outside of the direct content children of the table.
           * These will be defined when, e.g., creating a wrapper around the cdkTable that has
           * built-in data rows as *it's* content child.
           */
        this._customRowDefs = new Set();
        /**
           * Header row definitions that were defined outside of the direct content children of the table.
           * These will be defined when, e.g., creating a wrapper around the cdkTable that has
           * built-in header rows as *it's* content child.
           */
        this._customHeaderRowDefs = new Set();
        /**
           * Footer row definitions that were defined outside of the direct content children of the table.
           * These will be defined when, e.g., creating a wrapper around the cdkTable that has a
           * built-in footer row as *it's* content child.
           */
        this._customFooterRowDefs = new Set();
        /**
           * Whether the header row definition has been changed. Triggers an update to the header row after
           * content is checked. Initialized as true so that the table renders the initial set of rows.
           */
        this._headerRowDefChanged = true;
        /**
           * Whether the footer row definition has been changed. Triggers an update to the footer row after
           * content is checked. Initialized as true so that the table renders the initial set of rows.
           */
        this._footerRowDefChanged = true;
        /**
           * Cache of the latest rendered `RenderRow` objects as a map for easy retrieval when constructing
           * a new list of `RenderRow` objects for rendering rows. Since the new list is constructed with
           * the cached `RenderRow` objects when possible, the row identity is preserved when the data
           * and row template matches, which allows the `IterableDiffer` to check rows by reference
           * and understand which rows are added/moved/removed.
           *
           * Implemented as a map of maps where the first key is the `data: T` object and the second is the
           * `CdkRowDef<T>` object. With the two keys, the cache points to a `RenderRow<T>` object that
           * contains an array of created pairs. The array is necessary to handle cases where the data
           * array contains multiple duplicate data objects and each instantiated `RenderRow` must be
           * stored.
           */
        this._cachedRenderRowsMap = new Map();
        /**
           * CSS class added to any row or cell that has sticky positioning applied. May be overriden by
           * table subclasses.
           */
        this.stickyCssClass = 'cdk-table-sticky';
        this._multiTemplateDataRows = false;
        // TODO(andrewseguin): Remove max value as the end index
        //   and instead calculate the view on init and scroll.
        /**
           * Stream containing the latest information on what rows are being displayed on screen.
           * Can be used by the data source to as a heuristic of what data should be provided.
           */
        this.viewChange = new rxjs_1.BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        if (!role) {
            this._elementRef.nativeElement.setAttribute('role', 'grid');
        }
        this._isNativeHtmlTable = this._elementRef.nativeElement.nodeName === 'TABLE';
    }
    Object.defineProperty(CdkTable.prototype, "trackBy", {
        get: /**
           * Tracking function that will be used to check the differences in data changes. Used similarly
           * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
           * relative to the function to know if a row should be added/removed/moved.
           * Accepts a function that takes two parameters, `index` and `item`.
           */
        function () { return this._trackByFn; },
        set: function (fn) {
            if (core_1.isDevMode() &&
                fn != null && typeof fn !== 'function' && console && console.warn) {
                console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTable.prototype, "dataSource", {
        get: /**
           * The table's source of data, which can be provided in three ways (in order of complexity):
           *   - Simple data array (each object represents one table row)
           *   - Stream that emits a data array each time the array changes
           *   - `DataSource` object that implements the connect/disconnect interface.
           *
           * If a data array is provided, the table must be notified when the array's objects are
           * added, removed, or moved. This can be done by calling the `renderRows()` function which will
           * render the diff since the last table render. If the data array reference is changed, the table
           * will automatically trigger an update to the rows.
           *
           * When providing an Observable stream, the table will trigger an update automatically when the
           * stream emits a new array of data.
           *
           * Finally, when providing a `DataSource` object, the table will use the Observable stream
           * provided by the connect function and trigger updates when that stream emits new data array
           * values. During the table's ngOnDestroy or when the data source is removed from the table, the
           * table will call the DataSource's `disconnect` function (may be useful for cleaning up any
           * subscriptions registered during the connect process).
           */
        function () { return this._dataSource; },
        set: function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTable.prototype, "multiTemplateDataRows", {
        get: /**
           * Whether to allow multiple rows per data object by evaluating which rows evaluate their 'when'
           * predicate to true. If `multiTemplateDataRows` is false, which is the default value, then each
           * dataobject will render the first row that evaluates its when predicate to true, in the order
           * defined in the table, or otherwise the default row which does not have a when predicate.
           */
        function () { return this._multiTemplateDataRows; },
        set: function (v) {
            this._multiTemplateDataRows = coercion_1.coerceBooleanProperty(v);
            if (this._rowOutlet.viewContainer.length) {
                this._forceRenderDataRows();
            }
        },
        enumerable: true,
        configurable: true
    });
    CdkTable.prototype.ngOnInit = function () {
        var _this = this;
        this._setupStickyStyler();
        if (this._isNativeHtmlTable) {
            this._applyNativeTableSections();
        }
        // Set up the trackBy function so that it uses the `RenderRow` as its identity by default. If
        // the user has provided a custom trackBy, return the result of that function as evaluated
        // with the values of the `RenderRow`'s data and index.
        this._dataDiffer = this._differs.find([]).create(function (_i, dataRow) {
            return _this.trackBy ? _this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
        });
    };
    CdkTable.prototype.ngAfterContentChecked = function () {
        // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
        this._cacheRowDefs();
        this._cacheColumnDefs();
        // Make sure that the user has at least added header, footer, or data row def.
        if (!this._headerRowDefs.length && !this._footerRowDefs.length && !this._rowDefs.length) {
            throw table_errors_1.getTableMissingRowDefsError();
        }
        // Render updates if the list of columns have been changed for the header, row, or footer defs.
        this._renderUpdatedColumns();
        // If the header row definition has been changed, trigger a render to the header row.
        if (this._headerRowDefChanged) {
            this._forceRenderHeaderRows();
            this._headerRowDefChanged = false;
        }
        // If the footer row definition has been changed, trigger a render to the footer row.
        if (this._footerRowDefChanged) {
            this._forceRenderFooterRows();
            this._footerRowDefChanged = false;
        }
        // If there is a data source and row definitions, connect to the data source unless a
        // connection has already been made.
        if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
        this._checkStickyStates();
    };
    CdkTable.prototype.ngOnDestroy = function () {
        this._rowOutlet.viewContainer.clear();
        this._headerRowOutlet.viewContainer.clear();
        this._footerRowOutlet.viewContainer.clear();
        this._cachedRenderRowsMap.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource instanceof collections_1.DataSource) {
            this.dataSource.disconnect(this);
        }
    };
    /**
     * Renders rows based on the table's latest set of data, which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary
     * changes (add/remove/move rows).
     *
     * If the table's data source is a DataSource or Observable, this will be invoked automatically
     * each time the provided Observable stream emits a new data array. Otherwise if your data is
     * an array, this function will need to be called to render any changes.
     */
    /**
       * Renders rows based on the table's latest set of data, which was either provided directly as an
       * input or retrieved through an Observable stream (directly or from a DataSource).
       * Checks for differences in the data since the last diff to perform only the necessary
       * changes (add/remove/move rows).
       *
       * If the table's data source is a DataSource or Observable, this will be invoked automatically
       * each time the provided Observable stream emits a new data array. Otherwise if your data is
       * an array, this function will need to be called to render any changes.
       */
    CdkTable.prototype.renderRows = /**
       * Renders rows based on the table's latest set of data, which was either provided directly as an
       * input or retrieved through an Observable stream (directly or from a DataSource).
       * Checks for differences in the data since the last diff to perform only the necessary
       * changes (add/remove/move rows).
       *
       * If the table's data source is a DataSource or Observable, this will be invoked automatically
       * each time the provided Observable stream emits a new data array. Otherwise if your data is
       * an array, this function will need to be called to render any changes.
       */
    function () {
        var _this = this;
        this._renderRows = this._getAllRenderRows();
        var changes = this._dataDiffer.diff(this._renderRows);
        if (!changes) {
            return;
        }
        var viewContainer = this._rowOutlet.viewContainer;
        changes.forEachOperation(function (record, prevIndex, currentIndex) {
            if (record.previousIndex == null) {
                _this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(prevIndex);
            }
            else {
                var view = viewContainer.get(prevIndex);
                viewContainer.move((view), currentIndex);
            }
        });
        // Update the meta context of a row's context data (index, count, first, last, ...)
        this._updateRowIndexContext();
        // Update rows that did not get added/removed/moved but may have had their identity changed,
        // e.g. if trackBy matched data on some property but the actual data reference changed.
        changes.forEachIdentityChange(function (record) {
            var rowView = viewContainer.get((record.currentIndex));
            rowView.context.$implicit = record.item.data;
        });
        this.updateStickyColumnStyles();
    };
    /**
     * Sets the header row definition to be used. Overrides the header row definition gathered by
     * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
     * table's content is checked.
     * @docs-private
     * @deprecated Use `addHeaderRowDef` and `removeHeaderRowDef` instead
     * @breaking-change 8.0.0
     */
    /**
       * Sets the header row definition to be used. Overrides the header row definition gathered by
       * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
       * table's content is checked.
       * @docs-private
       * @deprecated Use `addHeaderRowDef` and `removeHeaderRowDef` instead
       * @breaking-change 8.0.0
       */
    CdkTable.prototype.setHeaderRowDef = /**
       * Sets the header row definition to be used. Overrides the header row definition gathered by
       * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
       * table's content is checked.
       * @docs-private
       * @deprecated Use `addHeaderRowDef` and `removeHeaderRowDef` instead
       * @breaking-change 8.0.0
       */
    function (headerRowDef) {
        this._customHeaderRowDefs = new Set([headerRowDef]);
        this._headerRowDefChanged = true;
    };
    /**
     * Sets the footer row definition to be used. Overrides the footer row definition gathered by
     * using `ContentChild`, if one exists. Sets a flag that will re-render the footer row after the
     * table's content is checked.
     * @docs-private
     * @deprecated Use `addFooterRowDef` and `removeFooterRowDef` instead
     * @breaking-change 8.0.0
     */
    /**
       * Sets the footer row definition to be used. Overrides the footer row definition gathered by
       * using `ContentChild`, if one exists. Sets a flag that will re-render the footer row after the
       * table's content is checked.
       * @docs-private
       * @deprecated Use `addFooterRowDef` and `removeFooterRowDef` instead
       * @breaking-change 8.0.0
       */
    CdkTable.prototype.setFooterRowDef = /**
       * Sets the footer row definition to be used. Overrides the footer row definition gathered by
       * using `ContentChild`, if one exists. Sets a flag that will re-render the footer row after the
       * table's content is checked.
       * @docs-private
       * @deprecated Use `addFooterRowDef` and `removeFooterRowDef` instead
       * @breaking-change 8.0.0
       */
    function (footerRowDef) {
        this._customFooterRowDefs = new Set([footerRowDef]);
        this._footerRowDefChanged = true;
    };
    /** Adds a column definition that was not included as part of the content children. */
    /** Adds a column definition that was not included as part of the content children. */
    CdkTable.prototype.addColumnDef = /** Adds a column definition that was not included as part of the content children. */
    function (columnDef) {
        this._customColumnDefs.add(columnDef);
    };
    /** Removes a column definition that was not included as part of the content children. */
    /** Removes a column definition that was not included as part of the content children. */
    CdkTable.prototype.removeColumnDef = /** Removes a column definition that was not included as part of the content children. */
    function (columnDef) {
        this._customColumnDefs.delete(columnDef);
    };
    /** Adds a row definition that was not included as part of the content children. */
    /** Adds a row definition that was not included as part of the content children. */
    CdkTable.prototype.addRowDef = /** Adds a row definition that was not included as part of the content children. */
    function (rowDef) {
        this._customRowDefs.add(rowDef);
    };
    /** Removes a row definition that was not included as part of the content children. */
    /** Removes a row definition that was not included as part of the content children. */
    CdkTable.prototype.removeRowDef = /** Removes a row definition that was not included as part of the content children. */
    function (rowDef) {
        this._customRowDefs.delete(rowDef);
    };
    /** Adds a header row definition that was not included as part of the content children. */
    /** Adds a header row definition that was not included as part of the content children. */
    CdkTable.prototype.addHeaderRowDef = /** Adds a header row definition that was not included as part of the content children. */
    function (headerRowDef) {
        this._customHeaderRowDefs.add(headerRowDef);
        this._headerRowDefChanged = true;
    };
    /** Removes a header row definition that was not included as part of the content children. */
    /** Removes a header row definition that was not included as part of the content children. */
    CdkTable.prototype.removeHeaderRowDef = /** Removes a header row definition that was not included as part of the content children. */
    function (headerRowDef) {
        this._customHeaderRowDefs.delete(headerRowDef);
        this._headerRowDefChanged = true;
    };
    /** Adds a footer row definition that was not included as part of the content children. */
    /** Adds a footer row definition that was not included as part of the content children. */
    CdkTable.prototype.addFooterRowDef = /** Adds a footer row definition that was not included as part of the content children. */
    function (footerRowDef) {
        this._customFooterRowDefs.add(footerRowDef);
        this._footerRowDefChanged = true;
    };
    /** Removes a footer row definition that was not included as part of the content children. */
    /** Removes a footer row definition that was not included as part of the content children. */
    CdkTable.prototype.removeFooterRowDef = /** Removes a footer row definition that was not included as part of the content children. */
    function (footerRowDef) {
        this._customFooterRowDefs.delete(footerRowDef);
        this._footerRowDefChanged = true;
    };
    /**
     * Updates the header sticky styles. First resets all applied styles with respect to the cells
     * sticking to the top. Then, evaluating which cells need to be stuck to the top. This is
     * automatically called when the header row changes its displayed set of columns, or if its
     * sticky input changes. May be called manually for cases where the cell content changes outside
     * of these events.
     */
    /**
       * Updates the header sticky styles. First resets all applied styles with respect to the cells
       * sticking to the top. Then, evaluating which cells need to be stuck to the top. This is
       * automatically called when the header row changes its displayed set of columns, or if its
       * sticky input changes. May be called manually for cases where the cell content changes outside
       * of these events.
       */
    CdkTable.prototype.updateStickyHeaderRowStyles = /**
       * Updates the header sticky styles. First resets all applied styles with respect to the cells
       * sticking to the top. Then, evaluating which cells need to be stuck to the top. This is
       * automatically called when the header row changes its displayed set of columns, or if its
       * sticky input changes. May be called manually for cases where the cell content changes outside
       * of these events.
       */
    function () {
        var headerRows = this._getRenderedRows(this._headerRowOutlet);
        this._stickyStyler.clearStickyPositioning(headerRows, ['top']);
        var stickyStates = this._headerRowDefs.map(function (def) { return def.sticky; });
        this._stickyStyler.stickRows(headerRows, stickyStates, 'top');
        // Reset the dirty state of the sticky input change since it has been used.
        this._headerRowDefs.forEach(function (def) { return def.resetStickyChanged(); });
    };
    /**
     * Updates the footer sticky styles. First resets all applied styles with respect to the cells
     * sticking to the bottom. Then, evaluating which cells need to be stuck to the bottom. This is
     * automatically called when the footer row changes its displayed set of columns, or if its
     * sticky input changes. May be called manually for cases where the cell content changes outside
     * of these events.
     */
    /**
       * Updates the footer sticky styles. First resets all applied styles with respect to the cells
       * sticking to the bottom. Then, evaluating which cells need to be stuck to the bottom. This is
       * automatically called when the footer row changes its displayed set of columns, or if its
       * sticky input changes. May be called manually for cases where the cell content changes outside
       * of these events.
       */
    CdkTable.prototype.updateStickyFooterRowStyles = /**
       * Updates the footer sticky styles. First resets all applied styles with respect to the cells
       * sticking to the bottom. Then, evaluating which cells need to be stuck to the bottom. This is
       * automatically called when the footer row changes its displayed set of columns, or if its
       * sticky input changes. May be called manually for cases where the cell content changes outside
       * of these events.
       */
    function () {
        var footerRows = this._getRenderedRows(this._footerRowOutlet);
        this._stickyStyler.clearStickyPositioning(footerRows, ['bottom']);
        var stickyStates = this._footerRowDefs.map(function (def) { return def.sticky; });
        this._stickyStyler.stickRows(footerRows, stickyStates, 'bottom');
        this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement, stickyStates);
        // Reset the dirty state of the sticky input change since it has been used.
        this._footerRowDefs.forEach(function (def) { return def.resetStickyChanged(); });
    };
    /**
     * Updates the column sticky styles. First resets all applied styles with respect to the cells
     * sticking to the left and right. Then sticky styles are added for the left and right according
     * to the column definitions for each cell in each row. This is automatically called when
     * the data source provides a new set of data or when a column definition changes its sticky
     * input. May be called manually for cases where the cell content changes outside of these events.
     */
    /**
       * Updates the column sticky styles. First resets all applied styles with respect to the cells
       * sticking to the left and right. Then sticky styles are added for the left and right according
       * to the column definitions for each cell in each row. This is automatically called when
       * the data source provides a new set of data or when a column definition changes its sticky
       * input. May be called manually for cases where the cell content changes outside of these events.
       */
    CdkTable.prototype.updateStickyColumnStyles = /**
       * Updates the column sticky styles. First resets all applied styles with respect to the cells
       * sticking to the left and right. Then sticky styles are added for the left and right according
       * to the column definitions for each cell in each row. This is automatically called when
       * the data source provides a new set of data or when a column definition changes its sticky
       * input. May be called manually for cases where the cell content changes outside of these events.
       */
    function () {
        var _this = this;
        var headerRows = this._getRenderedRows(this._headerRowOutlet);
        var dataRows = this._getRenderedRows(this._rowOutlet);
        var footerRows = this._getRenderedRows(this._footerRowOutlet);
        // Clear the left and right positioning from all columns in the table across all rows since
        // sticky columns span across all table sections (header, data, footer)
        this._stickyStyler.clearStickyPositioning(headerRows.concat(dataRows, footerRows), ['left', 'right']);
        // Update the sticky styles for each header row depending on the def's sticky state
        headerRows.forEach(function (headerRow, i) {
            _this._addStickyColumnStyles([headerRow], _this._headerRowDefs[i]);
        });
        // Update the sticky styles for each data row depending on its def's sticky state
        this._rowDefs.forEach(function (rowDef) {
            // Collect all the rows rendered with this row definition.
            var rows = [];
            for (var i = 0; i < dataRows.length; i++) {
                if (_this._renderRows[i].rowDef === rowDef) {
                    rows.push(dataRows[i]);
                }
            }
            _this._addStickyColumnStyles(rows, rowDef);
        });
        // Update the sticky styles for each footer row depending on the def's sticky state
        footerRows.forEach(function (footerRow, i) {
            _this._addStickyColumnStyles([footerRow], _this._footerRowDefs[i]);
        });
        // Reset the dirty state of the sticky input change since it has been used.
        Array.from(this._columnDefsByName.values()).forEach(function (def) { return def.resetStickyChanged(); });
    };
    /**
     * Get the list of RenderRow objects to render according to the current list of data and defined
     * row definitions. If the previous list already contained a particular pair, it should be reused
     * so that the differ equates their references.
     */
    /**
       * Get the list of RenderRow objects to render according to the current list of data and defined
       * row definitions. If the previous list already contained a particular pair, it should be reused
       * so that the differ equates their references.
       */
    CdkTable.prototype._getAllRenderRows = /**
       * Get the list of RenderRow objects to render according to the current list of data and defined
       * row definitions. If the previous list already contained a particular pair, it should be reused
       * so that the differ equates their references.
       */
    function () {
        var renderRows = [];
        // Store the cache and create a new one. Any re-used RenderRow objects will be moved into the
        // new cache while unused ones can be picked up by garbage collection.
        var prevCachedRenderRows = this._cachedRenderRowsMap;
        this._cachedRenderRowsMap = new Map();
        // For each data object, get the list of rows that should be rendered, represented by the
        // respective `RenderRow` object which is the pair of `data` and `CdkRowDef`.
        for (var i = 0; i < this._data.length; i++) {
            var data = this._data[i];
            var renderRowsForData = this._getRenderRowsForData(data, i, prevCachedRenderRows.get(data));
            if (!this._cachedRenderRowsMap.has(data)) {
                this._cachedRenderRowsMap.set(data, new WeakMap());
            }
            for (var j = 0; j < renderRowsForData.length; j++) {
                var renderRow = renderRowsForData[j];
                var cache = (this._cachedRenderRowsMap.get(renderRow.data));
                if (cache.has(renderRow.rowDef)) {
                    cache.get(renderRow.rowDef).push(renderRow);
                }
                else {
                    cache.set(renderRow.rowDef, [renderRow]);
                }
                renderRows.push(renderRow);
            }
        }
        return renderRows;
    };
    /**
     * Gets a list of `RenderRow<T>` for the provided data object and any `CdkRowDef` objects that
     * should be rendered for this data. Reuses the cached RenderRow objects if they match the same
     * `(T, CdkRowDef)` pair.
     */
    /**
       * Gets a list of `RenderRow<T>` for the provided data object and any `CdkRowDef` objects that
       * should be rendered for this data. Reuses the cached RenderRow objects if they match the same
       * `(T, CdkRowDef)` pair.
       */
    CdkTable.prototype._getRenderRowsForData = /**
       * Gets a list of `RenderRow<T>` for the provided data object and any `CdkRowDef` objects that
       * should be rendered for this data. Reuses the cached RenderRow objects if they match the same
       * `(T, CdkRowDef)` pair.
       */
    function (data, dataIndex, cache) {
        var rowDefs = this._getRowDefs(data, dataIndex);
        return rowDefs.map(function (rowDef) {
            var cachedRenderRows = (cache && cache.has(rowDef)) ? cache.get(rowDef) : [];
            if (cachedRenderRows.length) {
                var dataRow = (cachedRenderRows.shift());
                dataRow.dataIndex = dataIndex;
                return dataRow;
            }
            else {
                return { data: data, rowDef: rowDef, dataIndex: dataIndex };
            }
        });
    };
    /** Update the map containing the content's column definitions. */
    /** Update the map containing the content's column definitions. */
    CdkTable.prototype._cacheColumnDefs = /** Update the map containing the content's column definitions. */
    function () {
        var _this = this;
        this._columnDefsByName.clear();
        var columnDefs = mergeQueryListAndSet(this._contentColumnDefs, this._customColumnDefs);
        columnDefs.forEach(function (columnDef) {
            if (_this._columnDefsByName.has(columnDef.name)) {
                throw table_errors_1.getTableDuplicateColumnNameError(columnDef.name);
            }
            _this._columnDefsByName.set(columnDef.name, columnDef);
        });
    };
    /** Update the list of all available row definitions that can be used. */
    /** Update the list of all available row definitions that can be used. */
    CdkTable.prototype._cacheRowDefs = /** Update the list of all available row definitions that can be used. */
    function () {
        this._headerRowDefs =
            mergeQueryListAndSet(this._contentHeaderRowDefs, this._customHeaderRowDefs);
        this._footerRowDefs =
            mergeQueryListAndSet(this._contentFooterRowDefs, this._customFooterRowDefs);
        this._rowDefs =
            mergeQueryListAndSet(this._contentRowDefs, this._customRowDefs);
        // After all row definitions are determined, find the row definition to be considered default.
        var defaultRowDefs = this._rowDefs.filter(function (def) { return !def.when; });
        if (!this.multiTemplateDataRows && defaultRowDefs.length > 1) {
            throw table_errors_1.getTableMultipleDefaultRowDefsError();
        }
        this._defaultRowDef = defaultRowDefs[0];
    };
    /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     */
    /**
       * Check if the header, data, or footer rows have changed what columns they want to display or
       * whether the sticky states have changed for the header or footer. If there is a diff, then
       * re-render that section.
       */
    CdkTable.prototype._renderUpdatedColumns = /**
       * Check if the header, data, or footer rows have changed what columns they want to display or
       * whether the sticky states have changed for the header or footer. If there is a diff, then
       * re-render that section.
       */
    function () {
        var columnsDiffReducer = function (acc, def) { return acc || !!def.getColumnsDiff(); };
        // Force re-render data rows if the list of column definitions have changed.
        if (this._rowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderDataRows();
        }
        // Force re-render header/footer rows if the list of column definitions have changed..
        if (this._headerRowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderHeaderRows();
        }
        if (this._footerRowDefs.reduce(columnsDiffReducer, false)) {
            this._forceRenderFooterRows();
        }
    };
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
     */
    /**
       * Switch to the provided data source by resetting the data and unsubscribing from the current
       * render change subscription if one exists. If the data source is null, interpret this by
       * clearing the row outlet. Otherwise start listening for new data.
       */
    CdkTable.prototype._switchDataSource = /**
       * Switch to the provided data source by resetting the data and unsubscribing from the current
       * render change subscription if one exists. If the data source is null, interpret this by
       * clearing the row outlet. Otherwise start listening for new data.
       */
    function (dataSource) {
        this._data = [];
        if (this.dataSource instanceof collections_1.DataSource) {
            this.dataSource.disconnect(this);
        }
        // Stop listening for data from the previous data source.
        if (this._renderChangeSubscription) {
            this._renderChangeSubscription.unsubscribe();
            this._renderChangeSubscription = null;
        }
        if (!dataSource) {
            if (this._dataDiffer) {
                this._dataDiffer.diff([]);
            }
            this._rowOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
    };
    /** Set up a subscription for the data provided by the data source. */
    /** Set up a subscription for the data provided by the data source. */
    CdkTable.prototype._observeRenderChanges = /** Set up a subscription for the data provided by the data source. */
    function () {
        var _this = this;
        // If no data source has been set, there is nothing to observe for changes.
        if (!this.dataSource) {
            return;
        }
        var dataStream;
        // Check if the datasource is a DataSource object by observing if it has a connect function.
        // Cannot check this.dataSource['connect'] due to potential property renaming, nor can it
        // checked as an instanceof DataSource<T> since the table should allow for data sources
        // that did not explicitly extend DataSource<T>.
        if (this.dataSource.connect instanceof Function) {
            dataStream = this.dataSource.connect(this);
        }
        else if (this.dataSource instanceof rxjs_1.Observable) {
            dataStream = this.dataSource;
        }
        else if (Array.isArray(this.dataSource)) {
            dataStream = rxjs_1.of(this.dataSource);
        }
        if (dataStream === undefined) {
            throw table_errors_1.getTableUnknownDataSourceError();
        }
        this._renderChangeSubscription = dataStream
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function (data) {
            _this._data = data || [];
            _this.renderRows();
        });
    };
    /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     */
    /**
       * Clears any existing content in the header row outlet and creates a new embedded view
       * in the outlet using the header row definition.
       */
    CdkTable.prototype._forceRenderHeaderRows = /**
       * Clears any existing content in the header row outlet and creates a new embedded view
       * in the outlet using the header row definition.
       */
    function () {
        var _this = this;
        // Clear the header row outlet if any content exists.
        if (this._headerRowOutlet.viewContainer.length > 0) {
            this._headerRowOutlet.viewContainer.clear();
        }
        this._headerRowDefs.forEach(function (def, i) { return _this._renderRow(_this._headerRowOutlet, def, i); });
        this.updateStickyHeaderRowStyles();
        this.updateStickyColumnStyles();
    };
    /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     */
    /**
       * Clears any existing content in the footer row outlet and creates a new embedded view
       * in the outlet using the footer row definition.
       */
    CdkTable.prototype._forceRenderFooterRows = /**
       * Clears any existing content in the footer row outlet and creates a new embedded view
       * in the outlet using the footer row definition.
       */
    function () {
        var _this = this;
        // Clear the footer row outlet if any content exists.
        if (this._footerRowOutlet.viewContainer.length > 0) {
            this._footerRowOutlet.viewContainer.clear();
        }
        this._footerRowDefs.forEach(function (def, i) { return _this._renderRow(_this._footerRowOutlet, def, i); });
        this.updateStickyFooterRowStyles();
        this.updateStickyColumnStyles();
    };
    /** Adds the sticky column styles for the rows according to the columns' stick states. */
    /** Adds the sticky column styles for the rows according to the columns' stick states. */
    CdkTable.prototype._addStickyColumnStyles = /** Adds the sticky column styles for the rows according to the columns' stick states. */
    function (rows, rowDef) {
        var _this = this;
        var columnDefs = Array.from(rowDef.columns || []).map(function (c) { return _this._columnDefsByName.get(c); });
        var stickyStartStates = columnDefs.map(function (columnDef) { return columnDef.sticky; });
        var stickyEndStates = columnDefs.map(function (columnDef) { return columnDef.stickyEnd; });
        this._stickyStyler.updateStickyColumns(rows, stickyStartStates, stickyEndStates);
    };
    /** Gets the list of rows that have been rendered in the row outlet. */
    /** Gets the list of rows that have been rendered in the row outlet. */
    CdkTable.prototype._getRenderedRows = /** Gets the list of rows that have been rendered in the row outlet. */
    function (rowOutlet) {
        var renderedRows = [];
        for (var i = 0; i < rowOutlet.viewContainer.length; i++) {
            var viewRef = rowOutlet.viewContainer.get(i);
            renderedRows.push(viewRef.rootNodes[0]);
        }
        return renderedRows;
    };
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     */
    /**
       * Get the matching row definitions that should be used for this row data. If there is only
       * one row definition, it is returned. Otherwise, find the row definitions that has a when
       * predicate that returns true with the data. If none return true, return the default row
       * definition.
       */
    CdkTable.prototype._getRowDefs = /**
       * Get the matching row definitions that should be used for this row data. If there is only
       * one row definition, it is returned. Otherwise, find the row definitions that has a when
       * predicate that returns true with the data. If none return true, return the default row
       * definition.
       */
    function (data, dataIndex) {
        if (this._rowDefs.length == 1) {
            return [this._rowDefs[0]];
        }
        var rowDefs = [];
        if (this.multiTemplateDataRows) {
            rowDefs = this._rowDefs.filter(function (def) { return !def.when || def.when(dataIndex, data); });
        }
        else {
            var rowDef = this._rowDefs.find(function (def) { return def.when && def.when(dataIndex, data); }) || this._defaultRowDef;
            if (rowDef) {
                rowDefs.push(rowDef);
            }
        }
        if (!rowDefs.length) {
            throw table_errors_1.getTableMissingMatchingRowDefError(data);
        }
        return rowDefs;
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     */
    /**
       * Create the embedded view for the data row template and place it in the correct index location
       * within the data row view container.
       */
    CdkTable.prototype._insertRow = /**
       * Create the embedded view for the data row template and place it in the correct index location
       * within the data row view container.
       */
    function (renderRow, renderIndex) {
        var rowDef = renderRow.rowDef;
        var context = { $implicit: renderRow.data };
        this._renderRow(this._rowOutlet, rowDef, renderIndex, context);
    };
    /**
     * Creates a new row template in the outlet and fills it with the set of cell templates.
     * Optionally takes a context to provide to the row and cells, as well as an optional index
     * of where to place the new row template in the outlet.
     */
    /**
       * Creates a new row template in the outlet and fills it with the set of cell templates.
       * Optionally takes a context to provide to the row and cells, as well as an optional index
       * of where to place the new row template in the outlet.
       */
    CdkTable.prototype._renderRow = /**
       * Creates a new row template in the outlet and fills it with the set of cell templates.
       * Optionally takes a context to provide to the row and cells, as well as an optional index
       * of where to place the new row template in the outlet.
       */
    function (outlet, rowDef, index, context) {
        if (context === void 0) { context = {}; }
        // TODO(andrewseguin): enforce that one outlet was instantiated from createEmbeddedView
        outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);
        for (var _a = 0, _b = this._getCellTemplates(rowDef); _a < _b.length; _a++) {
            var cellTemplate = _b[_a];
            if (row_1.CdkCellOutlet.mostRecentCellOutlet) {
                row_1.CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cellTemplate, context);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     */
    /**
       * Updates the index-related context for each row to reflect any changes in the index of the rows,
       * e.g. first/last/even/odd.
       */
    CdkTable.prototype._updateRowIndexContext = /**
       * Updates the index-related context for each row to reflect any changes in the index of the rows,
       * e.g. first/last/even/odd.
       */
    function () {
        var viewContainer = this._rowOutlet.viewContainer;
        for (var renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            var viewRef = viewContainer.get(renderIndex);
            var context = viewRef.context;
            context.count = count;
            context.first = renderIndex === 0;
            context.last = renderIndex === count - 1;
            context.even = renderIndex % 2 === 0;
            context.odd = !context.even;
            if (this.multiTemplateDataRows) {
                context.dataIndex = this._renderRows[renderIndex].dataIndex;
                context.renderIndex = renderIndex;
            }
            else {
                context.index = this._renderRows[renderIndex].dataIndex;
            }
        }
    };
    /** Gets the column definitions for the provided row def. */
    /** Gets the column definitions for the provided row def. */
    CdkTable.prototype._getCellTemplates = /** Gets the column definitions for the provided row def. */
    function (rowDef) {
        var _this = this;
        if (!rowDef || !rowDef.columns) {
            return [];
        }
        return Array.from(rowDef.columns, function (columnId) {
            var column = _this._columnDefsByName.get(columnId);
            if (!column) {
                throw table_errors_1.getTableUnknownColumnError(columnId);
            }
            return rowDef.extractCellTemplate(column);
        });
    };
    /** Adds native table sections (e.g. tbody) and moves the row outlets into them. */
    /** Adds native table sections (e.g. tbody) and moves the row outlets into them. */
    CdkTable.prototype._applyNativeTableSections = /** Adds native table sections (e.g. tbody) and moves the row outlets into them. */
    function () {
        var sections = [
            { tag: 'thead', outlet: this._headerRowOutlet },
            { tag: 'tbody', outlet: this._rowOutlet },
            { tag: 'tfoot', outlet: this._footerRowOutlet },
        ];
        for (var _a = 0, sections_1 = sections; _a < sections_1.length; _a++) {
            var section = sections_1[_a];
            var element = document.createElement(section.tag);
            element.appendChild(section.outlet.elementRef.nativeElement);
            this._elementRef.nativeElement.appendChild(element);
        }
    };
    /**
     * Forces a re-render of the data rows. Should be called in cases where there has been an input
     * change that affects the evaluation of which rows should be rendered, e.g. toggling
     * `multiTemplateDataRows` or adding/removing row definitions.
     */
    /**
       * Forces a re-render of the data rows. Should be called in cases where there has been an input
       * change that affects the evaluation of which rows should be rendered, e.g. toggling
       * `multiTemplateDataRows` or adding/removing row definitions.
       */
    CdkTable.prototype._forceRenderDataRows = /**
       * Forces a re-render of the data rows. Should be called in cases where there has been an input
       * change that affects the evaluation of which rows should be rendered, e.g. toggling
       * `multiTemplateDataRows` or adding/removing row definitions.
       */
    function () {
        this._dataDiffer.diff([]);
        this._rowOutlet.viewContainer.clear();
        this.renderRows();
        this.updateStickyColumnStyles();
    };
    /**
     * Checks if there has been a change in sticky states since last check and applies the correct
     * sticky styles. Since checking resets the "dirty" state, this should only be performed once
     * during a change detection and after the inputs are settled (after content check).
     */
    /**
       * Checks if there has been a change in sticky states since last check and applies the correct
       * sticky styles. Since checking resets the "dirty" state, this should only be performed once
       * during a change detection and after the inputs are settled (after content check).
       */
    CdkTable.prototype._checkStickyStates = /**
       * Checks if there has been a change in sticky states since last check and applies the correct
       * sticky styles. Since checking resets the "dirty" state, this should only be performed once
       * during a change detection and after the inputs are settled (after content check).
       */
    function () {
        var stickyCheckReducer = function (acc, d) {
            return acc || d.hasStickyChanged();
        };
        // Note that the check needs to occur for every definition since it notifies the definition
        // that it can reset its dirty state. Using another operator like `some` may short-circuit
        // remaining definitions and leave them in an unchecked state.
        if (this._headerRowDefs.reduce(stickyCheckReducer, false)) {
            this.updateStickyHeaderRowStyles();
        }
        if (this._footerRowDefs.reduce(stickyCheckReducer, false)) {
            this.updateStickyFooterRowStyles();
        }
        if (Array.from(this._columnDefsByName.values()).reduce(stickyCheckReducer, false)) {
            this.updateStickyColumnStyles();
        }
    };
    /**
     * Creates the sticky styler that will be used for sticky rows and columns. Listens
     * for directionality changes and provides the latest direction to the styler. Re-applies column
     * stickiness when directionality changes.
     */
    /**
       * Creates the sticky styler that will be used for sticky rows and columns. Listens
       * for directionality changes and provides the latest direction to the styler. Re-applies column
       * stickiness when directionality changes.
       */
    CdkTable.prototype._setupStickyStyler = /**
       * Creates the sticky styler that will be used for sticky rows and columns. Listens
       * for directionality changes and provides the latest direction to the styler. Re-applies column
       * stickiness when directionality changes.
       */
    function () {
        var _this = this;
        var direction = this._dir ? this._dir.value : 'ltr';
        this._stickyStyler = new sticky_styler_1.StickyStyler(this._isNativeHtmlTable, this.stickyCssClass, direction);
        (this._dir ? this._dir.change : rxjs_1.of())
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function (value) {
            _this._stickyStyler.direction = value;
            _this.updateStickyColumnStyles();
        });
    };
    CdkTable.decorators = [
        { type: core_1.Component, args: [{selector: 'cdk-table, table[cdk-table]',
                    exportAs: 'cdkTable',
                    template: exports.CDK_TABLE_TEMPLATE,
                    host: {
                        'class': 'cdk-table',
                    },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkTable.ctorParameters = function () { return [
        { type: core_1.IterableDiffers, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['role',] },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    CdkTable.propDecorators = {
        "trackBy": [{ type: core_1.Input },],
        "dataSource": [{ type: core_1.Input },],
        "multiTemplateDataRows": [{ type: core_1.Input },],
        "_rowOutlet": [{ type: core_1.ViewChild, args: [DataRowOutlet,] },],
        "_headerRowOutlet": [{ type: core_1.ViewChild, args: [HeaderRowOutlet,] },],
        "_footerRowOutlet": [{ type: core_1.ViewChild, args: [FooterRowOutlet,] },],
        "_contentColumnDefs": [{ type: core_1.ContentChildren, args: [cell_1.CdkColumnDef,] },],
        "_contentRowDefs": [{ type: core_1.ContentChildren, args: [row_1.CdkRowDef,] },],
        "_contentHeaderRowDefs": [{ type: core_1.ContentChildren, args: [row_1.CdkHeaderRowDef,] },],
        "_contentFooterRowDefs": [{ type: core_1.ContentChildren, args: [row_1.CdkFooterRowDef,] },],
    };
    return CdkTable;
}());
exports.CdkTable = CdkTable;
/** Utility function that gets a merged list of the entries in a QueryList and values of a Set. */
function mergeQueryListAndSet(queryList, set) {
    return queryList.toArray().concat(Array.from(set));
}
//# sourceMappingURL=table.js.map