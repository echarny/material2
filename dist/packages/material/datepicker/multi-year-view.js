"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var bidi_1 = require("@angular/cdk/bidi");
var calendar_body_1 = require("./calendar-body");
var datepicker_errors_1 = require("./datepicker-errors");
exports.yearsPerPage = 24;
exports.yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
var MatMultiYearView = /** @class */ (function () {
    function MatMultiYearView(_changeDetectorRef, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /** Emits when a new year is selected. */
        this.selectedChange = new core_1.EventEmitter();
        /** Emits the selected year. This doesn't imply a change on the selected date */
        this.yearSelected = new core_1.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core_1.EventEmitter();
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this._dateAdapter.today();
    }
    Object.defineProperty(MatMultiYearView.prototype, "activeDate", {
        get: /** The date to display in this multi-year view (everything other than the year is ignored). */
        function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
            this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (Math.floor(this._dateAdapter.getYear(oldActiveDate) / exports.yearsPerPage) !=
                Math.floor(this._dateAdapter.getYear(this._activeDate) / exports.yearsPerPage)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMultiYearView.prototype, "selected", {
        get: /** The currently selected date. */
        function () { return this._selected; },
        set: function (value) {
            this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMultiYearView.prototype, "minDate", {
        get: /** The minimum selectable date. */
        function () { return this._minDate; },
        set: function (value) {
            this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMultiYearView.prototype, "maxDate", {
        get: /** The maximum selectable date. */
        function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    MatMultiYearView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Initializes this multi-year view. */
    /** Initializes this multi-year view. */
    MatMultiYearView.prototype._init = /** Initializes this multi-year view. */
    function () {
        var _this = this;
        this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
        var activeYear = this._dateAdapter.getYear(this._activeDate);
        var activeOffset = activeYear % exports.yearsPerPage;
        this._years = [];
        for (var i = 0, row = []; i < exports.yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length == exports.yearsPerRow) {
                this._years.push(row.map(function (year) { return _this._createCellForYear(year); }));
                row = [];
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /** Handles when a new year is selected. */
    /** Handles when a new year is selected. */
    MatMultiYearView.prototype._yearSelected = /** Handles when a new year is selected. */
    function (year) {
        this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
        var month = this._dateAdapter.getMonth(this.activeDate);
        var daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    MatMultiYearView.prototype._handleCalendarBodyKeydown = /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this._isRtl();
        switch (event.keyCode) {
            case keycodes_1.LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes_1.RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes_1.UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -exports.yearsPerRow);
                break;
            case keycodes_1.DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, exports.yearsPerRow);
                break;
            case keycodes_1.HOME:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -this._dateAdapter.getYear(this._activeDate) % exports.yearsPerPage);
                break;
            case keycodes_1.END:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, exports.yearsPerPage - this._dateAdapter.getYear(this._activeDate) % exports.yearsPerPage - 1);
                break;
            case keycodes_1.PAGE_UP:
                this.activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -exports.yearsPerPage * 10 : -exports.yearsPerPage);
                break;
            case keycodes_1.PAGE_DOWN:
                this.activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? exports.yearsPerPage * 10 : exports.yearsPerPage);
                break;
            case keycodes_1.ENTER:
                this._yearSelected(this._dateAdapter.getYear(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    MatMultiYearView.prototype._getActiveCell = function () {
        return this._dateAdapter.getYear(this.activeDate) % exports.yearsPerPage;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /** Focuses the active cell after the microtask queue is empty. */
    MatMultiYearView.prototype._focusActiveCell = /** Focuses the active cell after the microtask queue is empty. */
    function () {
        this._matCalendarBody._focusActiveCell();
    };
    /** Creates an MatCalendarCell for the given year. */
    /** Creates an MatCalendarCell for the given year. */
    MatMultiYearView.prototype._createCellForYear = /** Creates an MatCalendarCell for the given year. */
    function (year) {
        var yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
        return new calendar_body_1.MatCalendarCell(year, yearName, yearName, this._shouldEnableYear(year));
    };
    /** Whether the given year is enabled. */
    /** Whether the given year is enabled. */
    MatMultiYearView.prototype._shouldEnableYear = /** Whether the given year is enabled. */
    function (year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined || year === null ||
            (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this._dateAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        var firstOfYear = this._dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (var date = firstOfYear; this._dateAdapter.getYear(date) == year; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    MatMultiYearView.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /** Determines whether the user has the RTL layout direction. */
    MatMultiYearView.prototype._isRtl = /** Determines whether the user has the RTL layout direction. */
    function () {
        return this._dir && this._dir.value === 'rtl';
    };
    MatMultiYearView.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-multi-year-view',
                    template: "<table class=\"mat-calendar-table\"><thead class=\"mat-calendar-table-header\"><tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mat-calendar-body allowDisabledSelection=\"true\" [rows]=\"_years\" [todayValue]=\"_todayYear\" [selectedValue]=\"_selectedYear\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"_getActiveCell()\" (selectedValueChange)=\"_yearSelected($event)\" (keydown)=\"_handleCalendarBodyKeydown($event)\"></tbody></table>",
                    exportAs: 'matMultiYearView',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatMultiYearView.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatMultiYearView.propDecorators = {
        "activeDate": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "dateFilter": [{ type: core_1.Input },],
        "selectedChange": [{ type: core_1.Output },],
        "yearSelected": [{ type: core_1.Output },],
        "activeDateChange": [{ type: core_1.Output },],
        "_matCalendarBody": [{ type: core_1.ViewChild, args: [calendar_body_1.MatCalendarBody,] },],
    };
    return MatMultiYearView;
}());
exports.MatMultiYearView = MatMultiYearView;
//# sourceMappingURL=multi-year-view.js.map