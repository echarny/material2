"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/** @title Datepicker with custom calendar header */
var DatepickerCustomHeaderExample = /** @class */ (function () {
    function DatepickerCustomHeaderExample() {
        this.exampleHeader = ExampleHeader;
    }
    DatepickerCustomHeaderExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datepicker-custom-header-example',
                    template: "<mat-form-field><mat-label>Custom calendar header</mat-label><input matInput [matDatepicker]=\"picker\"><mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle><mat-datepicker #picker [calendarHeaderComponent]=\"exampleHeader\"></mat-datepicker></mat-form-field>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    return DatepickerCustomHeaderExample;
}());
exports.DatepickerCustomHeaderExample = DatepickerCustomHeaderExample;
/** Custom header component for datepicker. */
var ExampleHeader = /** @class */ (function () {
    function ExampleHeader(calendar, dateAdapter, dateFormats, cdr) {
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.destroyed = new rxjs_1.Subject();
        calendar.stateChanges
            .pipe(operators_1.takeUntil(this.destroyed))
            .subscribe(function () { return cdr.markForCheck(); });
    }
    ExampleHeader.prototype.ngOnDestroy = function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    Object.defineProperty(ExampleHeader.prototype, "periodLabel", {
        get: function () {
            return this.dateAdapter
                .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
                .toLocaleUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    ExampleHeader.prototype.previousClicked = function (mode) {
        this.calendar.activeDate = mode === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
    };
    ExampleHeader.prototype.nextClicked = function (mode) {
        this.calendar.activeDate = mode === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
    };
    ExampleHeader.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-header',
                    styles: ["\n    .example-header {\n      display: flex;\n      align-items: center;\n      padding: 0.5em;\n    }\n\n    .example-header-label {\n      flex: 1;\n      height: 1em;\n      font-weight: 500;\n      text-align: center;\n    }\n\n    .example-double-arrow .mat-icon {\n      margin: -22%;\n    }\n  "],
                    template: "\n    <div class=\"example-header\">\n      <button mat-icon-button class=\"example-double-arrow\" (click)=\"previousClicked('year')\">\n        <mat-icon>keyboard_arrow_left</mat-icon>\n        <mat-icon>keyboard_arrow_left</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"previousClicked('month')\">\n        <mat-icon>keyboard_arrow_left</mat-icon>\n      </button>\n      <span class=\"example-header-label\">{{periodLabel}}</span>\n      <button mat-icon-button (click)=\"nextClicked('month')\">\n        <mat-icon>keyboard_arrow_right</mat-icon>\n      </button>\n      <button mat-icon-button class=\"example-double-arrow\" (click)=\"nextClicked('year')\">\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n      </button>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    ExampleHeader.ctorParameters = function () { return [
        { type: material_1.MatCalendar, decorators: [{ type: core_1.Host },] },
        { type: core_2.DateAdapter, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return ExampleHeader;
}());
exports.ExampleHeader = ExampleHeader;
//# sourceMappingURL=datepicker-custom-header-example.js.map