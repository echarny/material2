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
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
var MatYearView = /** @class */ (function () {
    function MatYearView(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateFormats = _dateFormats;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /** Emits when a new month is selected. */
        this.selectedChange = new core_1.EventEmitter();
        /** Emits the selected month. This doesn't imply a change on the selected date */
        this.monthSelected = new core_1.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core_1.EventEmitter();
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw datepicker_errors_1.createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this._activeDate = this._dateAdapter.today();
    }
    Object.defineProperty(MatYearView.prototype, "activeDate", {
        get: /** The date to display in this year view (everything other than the year is ignored). */
        function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
            this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearView.prototype, "selected", {
        get: /** The currently selected date. */
        function () { return this._selected; },
        set: function (value) {
            this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._selectedMonth = this._getMonthInCurrentYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearView.prototype, "minDate", {
        get: /** The minimum selectable date. */
        function () { return this._minDate; },
        set: function (value) {
            this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearView.prototype, "maxDate", {
        get: /** The maximum selectable date. */
        function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    MatYearView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    /** Handles when a new month is selected. */
    MatYearView.prototype._monthSelected = /** Handles when a new month is selected. */
    function (month) {
        var normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        var daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    /** Handles keydown events on the calendar body when calendar is in year view. */
    MatYearView.prototype._handleCalendarBodyKeydown = /** Handles keydown events on the calendar body when calendar is in year view. */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this._isRtl();
        switch (event.keyCode) {
            case keycodes_1.LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes_1.RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes_1.UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
                break;
            case keycodes_1.DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
                break;
            case keycodes_1.HOME:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -this._dateAdapter.getMonth(this._activeDate));
                break;
            case keycodes_1.END:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
                break;
            case keycodes_1.PAGE_UP:
                this.activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case keycodes_1.PAGE_DOWN:
                this.activeDate =
                    this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case keycodes_1.ENTER:
                this._monthSelected(this._dateAdapter.getMonth(this._activeDate));
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
    /** Initializes this year view. */
    /** Initializes this year view. */
    MatYearView.prototype._init = /** Initializes this year view. */
    function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        this._yearLabel = this._dateAdapter.getYearName(this.activeDate);
        var monthNames = this._dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map(function (row) {
            return row.map(function (month) { return _this._createCellForMonth(month, monthNames[month]); });
        });
        this._changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /** Focuses the active cell after the microtask queue is empty. */
    MatYearView.prototype._focusActiveCell = /** Focuses the active cell after the microtask queue is empty. */
    function () {
        this._matCalendarBody._focusActiveCell();
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    /**
       * Gets the month in this year that the given Date falls on.
       * Returns null if the given Date is in another year.
       */
    MatYearView.prototype._getMonthInCurrentYear = /**
       * Gets the month in this year that the given Date falls on.
       * Returns null if the given Date is in another year.
       */
    function (date) {
        return date && this._dateAdapter.getYear(date) == this._dateAdapter.getYear(this.activeDate) ?
            this._dateAdapter.getMonth(date) : null;
    };
    /** Creates an MatCalendarCell for the given month. */
    /** Creates an MatCalendarCell for the given month. */
    MatYearView.prototype._createCellForMonth = /** Creates an MatCalendarCell for the given month. */
    function (month, monthName) {
        var ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
        return new calendar_body_1.MatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
    };
    /** Whether the given month is enabled. */
    /** Whether the given month is enabled. */
    MatYearView.prototype._shouldEnableMonth = /** Whether the given month is enabled. */
    function (month) {
        var activeYear = this._dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this._isYearAndMonthAfterMaxDate(activeYear, month) ||
            this._isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        var firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this._dateAdapter.getMonth(date) == month; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    /**
       * Tests whether the combination month/year is after this.maxDate, considering
       * just the month and year of this.maxDate
       */
    MatYearView.prototype._isYearAndMonthAfterMaxDate = /**
       * Tests whether the combination month/year is after this.maxDate, considering
       * just the month and year of this.maxDate
       */
    function (year, month) {
        if (this.maxDate) {
            var maxYear = this._dateAdapter.getYear(this.maxDate);
            var maxMonth = this._dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    /**
       * Tests whether the combination month/year is before this.minDate, considering
       * just the month and year of this.minDate
       */
    MatYearView.prototype._isYearAndMonthBeforeMinDate = /**
       * Tests whether the combination month/year is before this.minDate, considering
       * just the month and year of this.minDate
       */
    function (year, month) {
        if (this.minDate) {
            var minYear = this._dateAdapter.getYear(this.minDate);
            var minMonth = this._dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
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
    MatYearView.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /** Determines whether the user has the RTL layout direction. */
    MatYearView.prototype._isRtl = /** Determines whether the user has the RTL layout direction. */
    function () {
        return this._dir && this._dir.value === 'rtl';
    };
    MatYearView.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-year-view',
                    template: "<table class=\"mat-calendar-table\"><thead class=\"mat-calendar-table-header\"><tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mat-calendar-body allowDisabledSelection=\"true\" [label]=\"_yearLabel\" [rows]=\"_months\" [todayValue]=\"_todayMonth\" [selectedValue]=\"_selectedMonth\" [labelMinRequiredCells]=\"2\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"_dateAdapter.getMonth(activeDate)\" (selectedValueChange)=\"_monthSelected($event)\" (keydown)=\"_handleCalendarBodyKeydown($event)\"></tbody></table>",
                    exportAs: 'matYearView',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatYearView.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatYearView.propDecorators = {
        "activeDate": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "dateFilter": [{ type: core_1.Input },],
        "selectedChange": [{ type: core_1.Output },],
        "monthSelected": [{ type: core_1.Output },],
        "activeDateChange": [{ type: core_1.Output },],
        "_matCalendarBody": [{ type: core_1.ViewChild, args: [calendar_body_1.MatCalendarBody,] },],
    };
    return MatYearView;
}());
exports.MatYearView = MatYearView;
//# sourceMappingURL=year-view.js.map