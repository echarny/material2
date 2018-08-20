"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var datepicker_errors_1 = require("./datepicker-errors");
var datepicker_intl_1 = require("./datepicker-intl");
var month_view_1 = require("./month-view");
var multi_year_view_1 = require("./multi-year-view");
var year_view_1 = require("./year-view");
/** Default header for MatCalendar */
var MatCalendarHeader = /** @class */ (function () {
    function MatCalendarHeader(_intl, calendar, _dateAdapter, _dateFormats, changeDetectorRef) {
        this._intl = _intl;
        this.calendar = calendar;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this.calendar.stateChanges.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(MatCalendarHeader.prototype, "periodButtonText", {
        /** The label for the current calendar view. */
        get: /** The label for the current calendar view. */
        function () {
            if (this.calendar.currentView == 'month') {
                return this._dateAdapter
                    .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
                    .toLocaleUpperCase();
            }
            if (this.calendar.currentView == 'year') {
                return this._dateAdapter.getYearName(this.calendar.activeDate);
            }
            var activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
            var firstYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear - activeYear % 24, 0, 1));
            var lastYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear + multi_year_view_1.yearsPerPage - 1 - activeYear % 24, 0, 1));
            return firstYearInView + " \u2013 " + lastYearInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendarHeader.prototype, "periodButtonLabel", {
        get: function () {
            return this.calendar.currentView == 'month' ?
                this._intl.switchToMultiYearViewLabel : this._intl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendarHeader.prototype, "prevButtonLabel", {
        /** The label for the the previous button. */
        get: /** The label for the the previous button. */
        function () {
            return {
                'month': this._intl.prevMonthLabel,
                'year': this._intl.prevYearLabel,
                'multi-year': this._intl.prevMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendarHeader.prototype, "nextButtonLabel", {
        /** The label for the the next button. */
        get: /** The label for the the next button. */
        function () {
            return {
                'month': this._intl.nextMonthLabel,
                'year': this._intl.nextYearLabel,
                'multi-year': this._intl.nextMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    /** Handles user clicks on the period label. */
    /** Handles user clicks on the period label. */
    MatCalendarHeader.prototype.currentPeriodClicked = /** Handles user clicks on the period label. */
    function () {
        this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
    };
    /** Handles user clicks on the previous button. */
    /** Handles user clicks on the previous button. */
    MatCalendarHeader.prototype.previousClicked = /** Handles user clicks on the previous button. */
    function () {
        this.calendar.activeDate = this.calendar.currentView == 'month' ?
            this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? -1 : -multi_year_view_1.yearsPerPage);
    };
    /** Handles user clicks on the next button. */
    /** Handles user clicks on the next button. */
    MatCalendarHeader.prototype.nextClicked = /** Handles user clicks on the next button. */
    function () {
        this.calendar.activeDate = this.calendar.currentView == 'month' ?
            this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? 1 : multi_year_view_1.yearsPerPage);
    };
    /** Whether the previous period button is enabled. */
    /** Whether the previous period button is enabled. */
    MatCalendarHeader.prototype.previousEnabled = /** Whether the previous period button is enabled. */
    function () {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate ||
            !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
    };
    /** Whether the next period button is enabled. */
    /** Whether the next period button is enabled. */
    MatCalendarHeader.prototype.nextEnabled = /** Whether the next period button is enabled. */
    function () {
        return !this.calendar.maxDate ||
            !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    MatCalendarHeader.prototype._isSameView = /** Whether the two dates represent the same view in the current view mode (month or year). */
    function (date1, date2) {
        if (this.calendar.currentView == 'month') {
            return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2);
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return Math.floor(this._dateAdapter.getYear(date1) / multi_year_view_1.yearsPerPage) ==
            Math.floor(this._dateAdapter.getYear(date2) / multi_year_view_1.yearsPerPage);
    };
    MatCalendarHeader.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-calendar-header',
                    template: "<div class=\"mat-calendar-header\"><div class=\"mat-calendar-controls\"><button mat-button type=\"button\" class=\"mat-calendar-period-button\" (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\" cdkAriaLive=\"polite\">{{periodButtonText}}<div class=\"mat-calendar-arrow\" [class.mat-calendar-invert]=\"calendar.currentView != 'month'\"></div></button><div class=\"mat-calendar-spacer\"></div><button mat-icon-button type=\"button\" class=\"mat-calendar-previous-button\" [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\" [attr.aria-label]=\"prevButtonLabel\"></button> <button mat-icon-button type=\"button\" class=\"mat-calendar-next-button\" [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\" [attr.aria-label]=\"nextButtonLabel\"></button></div></div>",
                    exportAs: 'matCalendarHeader',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatCalendarHeader.ctorParameters = function () { return [
        { type: datepicker_intl_1.MatDatepickerIntl, },
        { type: MatCalendar, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return MatCalendar; }),] },] },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return MatCalendarHeader;
}());
exports.MatCalendarHeader = MatCalendarHeader;
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var MatCalendar = /** @class */ (function () {
    function MatCalendar(_intl, _dateAdapter, _dateFormats, _changeDetectorRef) {
        var _this = this;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._changeDetectorRef = _changeDetectorRef;
        /**
           * Used for scheduling that focus should be moved to the active cell on the next tick.
           * We need to schedule it, rather than do it immediately, because we have to wait
           * for Angular to re-evaluate the view children.
           */
        this._moveFocusOnNextTick = false;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new core_1.EventEmitter();
        /**
           * Emits the year chosen in multiyear view.
           * This doesn't imply a change on the selected date.
           */
        this.yearSelected = new core_1.EventEmitter();
        /**
           * Emits the month chosen in year view.
           * This doesn't imply a change on the selected date.
           */
        this.monthSelected = new core_1.EventEmitter();
        /** Emits when any date is selected. */
        this._userSelection = new core_1.EventEmitter();
        /**
           * Emits whenever there is a state change that the header may need to respond to.
           */
        this.stateChanges = new rxjs_1.Subject();
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw datepicker_errors_1.createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this._intlChanges = _intl.changes.subscribe(function () {
            _changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        });
    }
    Object.defineProperty(MatCalendar.prototype, "startAt", {
        get: /** A date representing the period (month or year) to start the calendar in. */
        function () { return this._startAt; },
        set: function (value) {
            this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "selected", {
        get: /** The currently selected date. */
        function () { return this._selected; },
        set: function (value) {
            this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "minDate", {
        get: /** The minimum selectable date. */
        function () { return this._minDate; },
        set: function (value) {
            this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "maxDate", {
        get: /** The maximum selectable date. */
        function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: /**
           * The current active date. This determines which time period is shown and which date is
           * highlighted when using keyboard navigation.
           */
        function () { return this._clampedActiveDate; },
        set: function (value) {
            this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "currentView", {
        /** Whether the calendar is in month view. */
        get: /** Whether the calendar is in month view. */
        function () { return this._currentView; },
        set: function (value) {
            this._currentView = value;
            this._moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    MatCalendar.prototype.ngAfterContentInit = function () {
        this._calendarHeaderPortal = new portal_1.ComponentPortal(this.headerComponent || MatCalendarHeader);
        this.activeDate = this.startAt || this._dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    };
    MatCalendar.prototype.ngAfterViewChecked = function () {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    MatCalendar.prototype.ngOnDestroy = function () {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    };
    MatCalendar.prototype.ngOnChanges = function (changes) {
        var change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            var view = this._getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
                this._changeDetectorRef.detectChanges();
                view._init();
            }
        }
        this.stateChanges.next();
    };
    MatCalendar.prototype.focusActiveCell = function () {
        this._getCurrentViewComponent()._focusActiveCell();
    };
    /** Updates today's date after an update of the active date */
    /** Updates today's date after an update of the active date */
    MatCalendar.prototype.updateTodaysDate = /** Updates today's date after an update of the active date */
    function () {
        var view = this.currentView == 'month' ? this.monthView :
            (this.currentView == 'year' ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    };
    /** Handles date selection in the month view. */
    /** Handles date selection in the month view. */
    MatCalendar.prototype._dateSelected = /** Handles date selection in the month view. */
    function (date) {
        if (!this._dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles year selection in the multiyear view. */
    /** Handles year selection in the multiyear view. */
    MatCalendar.prototype._yearSelectedInMultiYearView = /** Handles year selection in the multiyear view. */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Handles month selection in the year view. */
    /** Handles month selection in the year view. */
    MatCalendar.prototype._monthSelectedInYearView = /** Handles month selection in the year view. */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    MatCalendar.prototype._userSelected = function () {
        this._userSelection.emit();
    };
    /** Handles year/month selection in the multi-year/year views. */
    /** Handles year/month selection in the multi-year/year views. */
    MatCalendar.prototype._goToDateInView = /** Handles year/month selection in the multi-year/year views. */
    function (date, view) {
        this.activeDate = date;
        this.currentView = view;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    MatCalendar.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Returns the component instance that corresponds to the current calendar view. */
    /** Returns the component instance that corresponds to the current calendar view. */
    MatCalendar.prototype._getCurrentViewComponent = /** Returns the component instance that corresponds to the current calendar view. */
    function () {
        return this.monthView || this.yearView || this.multiYearView;
    };
    MatCalendar.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-calendar',
                    template: "<ng-template [cdkPortalOutlet]=\"_calendarHeaderPortal\"></ng-template><div class=\"mat-calendar-content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\"><mat-month-view *ngSwitchCase=\"'month'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (selectedChange)=\"_dateSelected($event)\" (_userSelection)=\"_userSelected()\"></mat-month-view><mat-year-view *ngSwitchCase=\"'year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (monthSelected)=\"_monthSelectedInYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'month')\"></mat-year-view><mat-multi-year-view *ngSwitchCase=\"'multi-year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (yearSelected)=\"_yearSelectedInMultiYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'year')\"></mat-multi-year-view></div>",
                    styles: [".mat-calendar{display:block}.mat-calendar-header{padding:8px 8px 0 8px}.mat-calendar-content{padding:0 8px 8px 8px;outline:0}.mat-calendar-controls{display:flex;margin:5% calc(33% / 7 - 16px)}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0}.mat-calendar-arrow{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.mat-calendar-next-button,.mat-calendar-previous-button{position:relative}.mat-calendar-next-button::after,.mat-calendar-previous-button::after{top:0;left:0;right:0;bottom:0;position:absolute;content:'';margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-next-button,[dir=rtl] .mat-calendar-previous-button{transform:rotate(180deg)}.mat-calendar-previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mat-calendar-next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px 0}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider::after{content:'';position:absolute;top:0;left:-8px;right:-8px;height:1px}"],
                    host: {
                        'class': 'mat-calendar',
                    },
                    exportAs: 'matCalendar',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatCalendar.ctorParameters = function () { return [
        { type: datepicker_intl_1.MatDatepickerIntl, },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatCalendar.propDecorators = {
        "headerComponent": [{ type: core_1.Input },],
        "startAt": [{ type: core_1.Input },],
        "startView": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "dateFilter": [{ type: core_1.Input },],
        "selectedChange": [{ type: core_1.Output },],
        "yearSelected": [{ type: core_1.Output },],
        "monthSelected": [{ type: core_1.Output },],
        "_userSelection": [{ type: core_1.Output },],
        "monthView": [{ type: core_1.ViewChild, args: [month_view_1.MatMonthView,] },],
        "yearView": [{ type: core_1.ViewChild, args: [year_view_1.MatYearView,] },],
        "multiYearView": [{ type: core_1.ViewChild, args: [multi_year_view_1.MatMultiYearView,] },],
    };
    return MatCalendar;
}());
exports.MatCalendar = MatCalendar;
//# sourceMappingURL=calendar.js.map