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
var core_1 = require("@angular/core");
var paginator_intl_1 = require("./paginator-intl");
var core_2 = require("@angular/material/core");
/** The default page size if there is no page size and there are no provided page size options. */
var DEFAULT_PAGE_SIZE = 50;
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
var /**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
PageEvent = /** @class */ (function () {
    function PageEvent() {
    }
    return PageEvent;
}());
exports.PageEvent = PageEvent;
// Boilerplate for applying mixins to MatPaginator.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatPaginator.
/** @docs-private */
MatPaginatorBase = /** @class */ (function () {
    function MatPaginatorBase() {
    }
    return MatPaginatorBase;
}());
exports.MatPaginatorBase = MatPaginatorBase;
exports._MatPaginatorBase = core_2.mixinInitialized(MatPaginatorBase);
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
var MatPaginator = /** @class */ (function (_super) {
    __extends(MatPaginator, _super);
    function MatPaginator(_intl, _changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this._intl = _intl;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._pageIndex = 0;
        _this._length = 0;
        _this._pageSizeOptions = [];
        _this._hidePageSize = false;
        _this._showFirstLastButtons = false;
        /** Event emitted when the paginator changes the page size or page index. */
        _this.page = new core_1.EventEmitter();
        _this._intlChanges = _intl.changes.subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        return _this;
    }
    Object.defineProperty(MatPaginator.prototype, "pageIndex", {
        get: /** The zero-based page index of the displayed list of items. Defaulted to 0. */
        function () { return this._pageIndex; },
        set: function (value) {
            this._pageIndex = Math.max(coercion_1.coerceNumberProperty(value), 0);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "length", {
        get: /** The length of the total number of items that are being paginated. Defaulted to 0. */
        function () { return this._length; },
        set: function (value) {
            this._length = coercion_1.coerceNumberProperty(value);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "pageSize", {
        get: /** Number of items to display on a page. By default set to 50. */
        function () { return this._pageSize; },
        set: function (value) {
            this._pageSize = Math.max(coercion_1.coerceNumberProperty(value), 0);
            this._updateDisplayedPageSizeOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "pageSizeOptions", {
        get: /** The set of provided page size options to display to the user. */
        function () { return this._pageSizeOptions; },
        set: function (value) {
            this._pageSizeOptions = (value || []).map(function (p) { return coercion_1.coerceNumberProperty(p); });
            this._updateDisplayedPageSizeOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "hidePageSize", {
        get: /** Whether to hide the page size selection UI from the user. */
        function () { return this._hidePageSize; },
        set: function (value) {
            this._hidePageSize = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "showFirstLastButtons", {
        get: /** Whether to show the first/last buttons UI to the user. */
        function () { return this._showFirstLastButtons; },
        set: function (value) {
            this._showFirstLastButtons = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatPaginator.prototype.ngOnInit = function () {
        this._initialized = true;
        this._updateDisplayedPageSizeOptions();
        this._markInitialized();
    };
    MatPaginator.prototype.ngOnDestroy = function () {
        this._intlChanges.unsubscribe();
    };
    /** Advances to the next page if it exists. */
    /** Advances to the next page if it exists. */
    MatPaginator.prototype.nextPage = /** Advances to the next page if it exists. */
    function () {
        if (!this.hasNextPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex++;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move back to the previous page if it exists. */
    /** Move back to the previous page if it exists. */
    MatPaginator.prototype.previousPage = /** Move back to the previous page if it exists. */
    function () {
        if (!this.hasPreviousPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex--;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move to the first page if not already there. */
    /** Move to the first page if not already there. */
    MatPaginator.prototype.firstPage = /** Move to the first page if not already there. */
    function () {
        // hasPreviousPage being false implies at the start
        if (!this.hasPreviousPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex = 0;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move to the last page if not already there. */
    /** Move to the last page if not already there. */
    MatPaginator.prototype.lastPage = /** Move to the last page if not already there. */
    function () {
        // hasNextPage being false implies at the end
        if (!this.hasNextPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex = this.getNumberOfPages();
        this._emitPageEvent(previousPageIndex);
    };
    /** Whether there is a previous page. */
    /** Whether there is a previous page. */
    MatPaginator.prototype.hasPreviousPage = /** Whether there is a previous page. */
    function () {
        return this.pageIndex >= 1 && this.pageSize != 0;
    };
    /** Whether there is a next page. */
    /** Whether there is a next page. */
    MatPaginator.prototype.hasNextPage = /** Whether there is a next page. */
    function () {
        var numberOfPages = this.getNumberOfPages();
        return this.pageIndex < numberOfPages && this.pageSize != 0;
    };
    /** Calculate the number of pages */
    /** Calculate the number of pages */
    MatPaginator.prototype.getNumberOfPages = /** Calculate the number of pages */
    function () {
        return Math.ceil(this.length / this.pageSize) - 1;
    };
    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 10-19) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 10th item will still be displayed.
     */
    /**
       * Changes the page size so that the first item displayed on the page will still be
       * displayed using the new page size.
       *
       * For example, if the page size is 10 and on the second page (items indexed 10-19) then
       * switching so that the page size is 5 will set the third page as the current page so
       * that the 10th item will still be displayed.
       */
    MatPaginator.prototype._changePageSize = /**
       * Changes the page size so that the first item displayed on the page will still be
       * displayed using the new page size.
       *
       * For example, if the page size is 10 and on the second page (items indexed 10-19) then
       * switching so that the page size is 5 will set the third page as the current page so
       * that the 10th item will still be displayed.
       */
    function (pageSize) {
        // Current page needs to be updated to reflect the new page size. Navigate to the page
        // containing the previous page's first item.
        var startIndex = this.pageIndex * this.pageSize;
        var previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this._emitPageEvent(previousPageIndex);
    };
    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    /**
       * Updates the list of page size options to display to the user. Includes making sure that
       * the page size is an option and that the list is sorted.
       */
    MatPaginator.prototype._updateDisplayedPageSizeOptions = /**
       * Updates the list of page size options to display to the user. Includes making sure that
       * the page size is an option and that the list is sorted.
       */
    function () {
        if (!this._initialized) {
            return;
        }
        // If no page size is provided, use the first page size option or the default page size.
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length != 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
        }
        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }
        // Sort the numbers using a number-specific sort function.
        this._displayedPageSizeOptions.sort(function (a, b) { return a - b; });
        this._changeDetectorRef.markForCheck();
    };
    /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    MatPaginator.prototype._emitPageEvent = /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    function (previousPageIndex) {
        this.page.emit({
            previousPageIndex: previousPageIndex,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    };
    MatPaginator.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-paginator',
                    exportAs: 'matPaginator',
                    template: "<div class=\"mat-paginator-container\"><div class=\"mat-paginator-page-size\" *ngIf=\"!hidePageSize\"><div class=\"mat-paginator-page-size-label\">{{_intl.itemsPerPageLabel}}</div><mat-form-field *ngIf=\"_displayedPageSizeOptions.length > 1\" class=\"mat-paginator-page-size-select\"><mat-select [value]=\"pageSize\" [aria-label]=\"_intl.itemsPerPageLabel\" (selectionChange)=\"_changePageSize($event.value)\"><mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">{{pageSizeOption}}</mat-option></mat-select></mat-form-field><div *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div></div><div class=\"mat-paginator-range-actions\"><div class=\"mat-paginator-range-label\">{{_intl.getRangeLabel(pageIndex, pageSize, length)}}</div><button mat-icon-button type=\"button\" class=\"mat-paginator-navigation-first\" (click)=\"firstPage()\" [attr.aria-label]=\"_intl.firstPageLabel\" [matTooltip]=\"_intl.firstPageLabel\" [matTooltipDisabled]=\"!hasPreviousPage()\" [matTooltipPosition]=\"'above'\" [disabled]=\"!hasPreviousPage()\" *ngIf=\"showFirstLastButtons\"><svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\"><path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/></svg></button> <button mat-icon-button type=\"button\" class=\"mat-paginator-navigation-previous\" (click)=\"previousPage()\" [attr.aria-label]=\"_intl.previousPageLabel\" [matTooltip]=\"_intl.previousPageLabel\" [matTooltipDisabled]=\"!hasPreviousPage()\" [matTooltipPosition]=\"'above'\" [disabled]=\"!hasPreviousPage()\"><svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg></button> <button mat-icon-button type=\"button\" class=\"mat-paginator-navigation-next\" (click)=\"nextPage()\" [attr.aria-label]=\"_intl.nextPageLabel\" [matTooltip]=\"_intl.nextPageLabel\" [matTooltipDisabled]=\"!hasNextPage()\" [matTooltipPosition]=\"'above'\" [disabled]=\"!hasNextPage()\"><svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg></button> <button mat-icon-button type=\"button\" class=\"mat-paginator-navigation-last\" (click)=\"lastPage()\" [attr.aria-label]=\"_intl.lastPageLabel\" [matTooltip]=\"_intl.lastPageLabel\" [matTooltipDisabled]=\"!hasNextPage()\" [matTooltipPosition]=\"'above'\" [disabled]=\"!hasNextPage()\" *ngIf=\"showFirstLastButtons\"><svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\"><path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/></svg></button></div></div>",
                    styles: [".mat-paginator{display:block}.mat-paginator-container{display:flex;align-items:center;justify-content:flex-end;min-height:56px;padding:0 8px;flex-wrap:wrap-reverse}.mat-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-paginator-page-size{margin-right:0;margin-left:8px}.mat-paginator-page-size-label{margin:0 4px}.mat-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.mat-paginator-page-size-select.mat-form-field-appearance-outline{width:64px}.mat-paginator-page-size-select.mat-form-field-appearance-fill{width:64px}.mat-paginator-range-label{margin:0 32px 0 24px}.mat-paginator-range-actions{display:flex;align-items:center;min-height:48px}.mat-paginator-icon{width:28px;fill:currentColor}[dir=rtl] .mat-paginator-icon{transform:rotate(180deg)}"],
                    host: {
                        'class': 'mat-paginator',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatPaginator.ctorParameters = function () { return [
        { type: paginator_intl_1.MatPaginatorIntl, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatPaginator.propDecorators = {
        "pageIndex": [{ type: core_1.Input },],
        "length": [{ type: core_1.Input },],
        "pageSize": [{ type: core_1.Input },],
        "pageSizeOptions": [{ type: core_1.Input },],
        "hidePageSize": [{ type: core_1.Input },],
        "showFirstLastButtons": [{ type: core_1.Input },],
        "page": [{ type: core_1.Output },],
    };
    return MatPaginator;
}(exports._MatPaginatorBase));
exports.MatPaginator = MatPaginator;
//# sourceMappingURL=paginator.js.map