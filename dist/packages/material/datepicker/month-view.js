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
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
var MatMonthView = /** @class */ (function () {
    function MatMonthView(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateFormats = _dateFormats;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /** Emits when a new date is selected. */
        this.selectedChange = new core_1.EventEmitter();
        /** Emits when any date is selected. */
        this._userSelection = new core_1.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core_1.EventEmitter();
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw datepicker_errors_1.createMissingDateImplError('MAT_DATE_FORMATS');
        }
        var firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        var narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        var longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._dateAdapter.today();
    }
    Object.defineProperty(MatMonthView.prototype, "activeDate", {
        get: /**
           * The date to display in this month view (everything other than the month and year is ignored).
           */
        function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
            this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMonthView.prototype, "selected", {
        get: /** The currently selected date. */
        function () { return this._selected; },
        set: function (value) {
            this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._selectedDate = this._getDateInCurrentMonth(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMonthView.prototype, "minDate", {
        get: /** The minimum selectable date. */
        function () { return this._minDate; },
        set: function (value) {
            this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMonthView.prototype, "maxDate", {
        get: /** The maximum selectable date. */
        function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    MatMonthView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Handles when a new date is selected. */
    /** Handles when a new date is selected. */
    MatMonthView.prototype._dateSelected = /** Handles when a new date is selected. */
    function (date) {
        if (this._selectedDate != date) {
            var selectedYear = this._dateAdapter.getYear(this.activeDate);
            var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
            var selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);
            this.selectedChange.emit(selectedDate);
        }
        this._userSelection.emit();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    /** Handles keydown events on the calendar body when calendar is in month view. */
    MatMonthView.prototype._handleCalendarBodyKeydown = /** Handles keydown events on the calendar body when calendar is in month view. */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this._isRtl();
        switch (event.keyCode) {
            case keycodes_1.LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes_1.RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes_1.UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case keycodes_1.DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case keycodes_1.HOME:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                break;
            case keycodes_1.END:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, (this._dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this._dateAdapter.getDate(this._activeDate)));
                break;
            case keycodes_1.PAGE_UP:
                this.activeDate = event.altKey ?
                    this._dateAdapter.addCalendarYears(this._activeDate, -1) :
                    this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case keycodes_1.PAGE_DOWN:
                this.activeDate = event.altKey ?
                    this._dateAdapter.addCalendarYears(this._activeDate, 1) :
                    this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case keycodes_1.ENTER:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this._dateSelected(this._dateAdapter.getDate(this._activeDate));
                    this._userSelection.emit();
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
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
    /** Initializes this month view. */
    /** Initializes this month view. */
    MatMonthView.prototype._init = /** Initializes this month view. */
    function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
        this._monthLabel =
            this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
                .toLocaleUpperCase();
        var firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
                this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
        this._changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    /** Focuses the active cell after the microtask queue is empty. */
    MatMonthView.prototype._focusActiveCell = /** Focuses the active cell after the microtask queue is empty. */
    function () {
        this._matCalendarBody._focusActiveCell();
    };
    /** Creates MatCalendarCells for the dates in this month. */
    /** Creates MatCalendarCells for the dates in this month. */
    MatMonthView.prototype._createWeekCells = /** Creates MatCalendarCells for the dates in this month. */
    function () {
        var daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        var dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            var enabled = this._shouldEnableDate(date);
            var ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new calendar_body_1.MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    };
    /** Date filter for the month */
    /** Date filter for the month */
    MatMonthView.prototype._shouldEnableDate = /** Date filter for the month */
    function (date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    /**
       * Gets the date in this month that the given Date falls on.
       * Returns null if the given Date is in another month.
       */
    MatMonthView.prototype._getDateInCurrentMonth = /**
       * Gets the date in this month that the given Date falls on.
       * Returns null if the given Date is in another month.
       */
    function (date) {
        return date && this._hasSameMonthAndYear(date, this.activeDate) ?
            this._dateAdapter.getDate(date) : null;
    };
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    MatMonthView.prototype._hasSameMonthAndYear = /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    function (d1, d2) {
        return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
            this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    MatMonthView.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /** Determines whether the user has the RTL layout direction. */
    MatMonthView.prototype._isRtl = /** Determines whether the user has the RTL layout direction. */
    function () {
        return this._dir && this._dir.value === 'rtl';
    };
    MatMonthView.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-month-view',
                    template: "<table class=\"mat-calendar-table\"><thead class=\"mat-calendar-table-header\"><tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr><tr><th class=\"mat-calendar-table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr></thead><tbody mat-calendar-body [label]=\"_monthLabel\" [rows]=\"_weeks\" [todayValue]=\"_todayDate\" [selectedValue]=\"_selectedDate\" [labelMinRequiredCells]=\"3\" [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\" (selectedValueChange)=\"_dateSelected($event)\" (keydown)=\"_handleCalendarBodyKeydown($event)\"></tbody></table>",
                    exportAs: 'matMonthView',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatMonthView.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatMonthView.propDecorators = {
        "activeDate": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "dateFilter": [{ type: core_1.Input },],
        "selectedChange": [{ type: core_1.Output },],
        "_userSelection": [{ type: core_1.Output },],
        "activeDateChange": [{ type: core_1.Output },],
        "_matCalendarBody": [{ type: core_1.ViewChild, args: [calendar_body_1.MatCalendarBody,] },],
    };
    return MatMonthView;
}());
exports.MatMonthView = MatMonthView;
//# sourceMappingURL=month-view.js.map