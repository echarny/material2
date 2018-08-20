"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var DatepickerDemo = /** @class */ (function () {
    function DatepickerDemo() {
        var _this = this;
        this.dateCtrl = new forms_1.FormControl();
        this.dateFilter = function (date) { return !(date.getFullYear() % 2) && (date.getMonth() % 2) && !(date.getDate() % 2); };
        this.onDateInput = function (e) { return _this.lastDateInput = e.value; };
        this.onDateChange = function (e) { return _this.lastDateChange = e.value; };
        // pass custom header component type as input
        this.customHeader = CustomHeader;
    }
    DatepickerDemo = __decorate([
        core_1.Component({selector: 'datepicker-demo',
            template: "<h2>Options</h2> <p> <mat-checkbox [(ngModel)]=\"touch\">Use touch UI</mat-checkbox> <mat-checkbox [(ngModel)]=\"filterOdd\">Filter odd years, months and dates</mat-checkbox> <mat-checkbox [(ngModel)]=\"yearView\">Start in year view</mat-checkbox> <mat-checkbox [(ngModel)]=\"datepickerDisabled\">Disable datepicker</mat-checkbox> <mat-checkbox [(ngModel)]=\"inputDisabled\">Disable input</mat-checkbox> <mat-form-field> <mat-select [(ngModel)]=\"color\" placeholder=\"Color\"> <mat-option value=\"primary\">Primary</mat-option> <mat-option value=\"accent\">Accent</mat-option> <mat-option value=\"warn\">Warn</mat-option> </mat-select> </mat-form-field> </p> <p> <mat-form-field color=\"accent\"> <mat-label>Min date</mat-label> <input matInput [matDatepicker]=\"minDatePicker\" [(ngModel)]=\"minDate\" [disabled]=\"inputDisabled\" [max]=\"maxDate\"> <mat-datepicker-toggle matSuffix [for]=\"minDatePicker\"></mat-datepicker-toggle> <mat-datepicker #minDatePicker [touchUi]=\"touch\" [disabled]=\"datepickerDisabled\"></mat-datepicker> </mat-form-field> <mat-form-field color=\"accent\"> <mat-label>Max date</mat-label> <input matInput [matDatepicker]=\"maxDatePicker\" [(ngModel)]=\"maxDate\" [disabled]=\"inputDisabled\" [min]=\"minDate\"> <mat-datepicker-toggle matSuffix [for]=\"maxDatePicker\"></mat-datepicker-toggle> <mat-datepicker #maxDatePicker [touchUi]=\"touch\" [disabled]=\"datepickerDisabled\"></mat-datepicker> </mat-form-field> </p> <p> <mat-form-field color=\"accent\"> <mat-label>Start at date</mat-label> <input matInput [matDatepicker]=\"startAtPicker\" [(ngModel)]=\"startAt\" [disabled]=\"inputDisabled\"> <mat-datepicker-toggle matSuffix [for]=\"startAtPicker\"></mat-datepicker-toggle> <mat-datepicker #startAtPicker [touchUi]=\"touch\" [disabled]=\"datepickerDisabled\"></mat-datepicker> </mat-form-field> </p> <h2>Result</h2> <p> <mat-datepicker-toggle [for]=\"resultPicker\"></mat-datepicker-toggle> <mat-form-field> <mat-label>Pick a date</mat-label> <input matInput #resultPickerModel=\"ngModel\" [matDatepicker]=\"resultPicker\" [(ngModel)]=\"date\" [min]=\"minDate\" [max]=\"maxDate\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\" [disabled]=\"inputDisabled\" (dateInput)=\"onDateInput($event)\" (dateChange)=\"onDateChange($event)\"> <mat-datepicker #resultPicker [touchUi]=\"touch\" [disabled]=\"datepickerDisabled\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\" [color]=\"color\"> </mat-datepicker> <mat-error *ngIf=\"resultPickerModel.hasError('matDatepickerParse')\"> \"{{resultPickerModel.getError('matDatepickerParse').text}}\" is not a valid date! </mat-error> <mat-error *ngIf=\"resultPickerModel.hasError('matDatepickerMin')\">Too early!</mat-error> <mat-error *ngIf=\"resultPickerModel.hasError('matDatepickerMax')\">Too late!</mat-error> <mat-error *ngIf=\"resultPickerModel.hasError('matDatepickerFilter')\">Date unavailable!</mat-error> </mat-form-field> </p> <p>Last input: {{lastDateInput}}</p> <p>Last change: {{lastDateChange}}</p> <br> <p> <input #resultPickerModel2 [matDatepicker]=\"resultPicker2\" [(ngModel)]=\"date\" [min]=\"minDate\" [max]=\"maxDate\" [disabled]=\"inputDisabled\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\" placeholder=\"Pick a date\"> <mat-datepicker-toggle [for]=\"resultPicker2\"></mat-datepicker-toggle> <mat-datepicker #resultPicker2 [touchUi]=\"touch\" [disabled]=\"datepickerDisabled\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\"> </mat-datepicker> </p> <h2>Input disabled datepicker</h2> <p> <mat-datepicker-toggle [for]=\"datePicker1\"></mat-datepicker-toggle> <mat-form-field> <mat-label>Input disabled</mat-label> <input matInput [matDatepicker]=\"datePicker1\" [(ngModel)]=\"date\" [min]=\"minDate\" [max]=\"maxDate\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\" disabled> <mat-datepicker #datePicker1 [touchUi]=\"touch\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\"></mat-datepicker> </mat-form-field> </p> <h2>Input disabled via FormControl</h2> <p> <mat-datepicker-toggle [for]=\"datePicker2\"></mat-datepicker-toggle> <mat-form-field> <mat-label>FormControl disabled</mat-label> <input matInput [matDatepicker]=\"datePicker2\" [formControl]=\"dateCtrl\" [min]=\"minDate\" [max]=\"maxDate\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\"> <mat-datepicker #datePicker2 [touchUi]=\"touch\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\"></mat-datepicker> </mat-form-field> <button mat-button (click)=\"dateCtrl.disabled ? dateCtrl.enable() : dateCtrl.disable()\"> {{dateCtrl.disabled ? 'Enable' : 'Disable'}} FormControl </button> </p> <h2>Input disabled, datepicker popup enabled</h2> <p> <mat-datepicker-toggle [for]=\"datePicker3\"></mat-datepicker-toggle> <mat-form-field> <mat-label>Input disabled, datepicker enabled</mat-label> <input matInput disabled [matDatepicker]=\"datePicker3\" [(ngModel)]=\"date\" [min]=\"minDate\" [max]=\"maxDate\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\"> <mat-datepicker #datePicker3 [touchUi]=\"touch\" [disabled]=\"false\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\"></mat-datepicker> </mat-form-field> </p> <h2>Datepicker with value property binding</h2> <p> <mat-datepicker-toggle [for]=\"datePicker4\"></mat-datepicker-toggle> <mat-form-field> <mat-label>Value binding</mat-label> <input matInput [matDatepicker]=\"datePicker4\" [value]=\"date\" [min]=\"minDate\" [max]=\"maxDate\" [matDatepickerFilter]=\"filterOdd ? dateFilter : null\"> <mat-datepicker #datePicker4 [touchUi]=\"touch\" [startAt]=\"startAt\" [startView]=\"yearView ? 'year' : 'month'\"></mat-datepicker> </mat-form-field> </p> <h2>Datepicker with custom header</h2> <p> <mat-form-field> <mat-label>Custom calendar header</mat-label> <input matInput [matDatepicker]=\"customHeaderPicker\"> <mat-datepicker-toggle matSuffix [for]=\"customHeaderPicker\"></mat-datepicker-toggle> <mat-datepicker #customHeaderPicker [calendarHeaderComponent]=\"customHeader\"></mat-datepicker> </mat-form-field> </p> ",
            styles: ["mat-calendar { width: 300px; } "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], DatepickerDemo);
    return DatepickerDemo;
}());
exports.DatepickerDemo = DatepickerDemo;
// Custom header component for datepicker
var CustomHeader = /** @class */ (function () {
    function CustomHeader(_calendar, _dateAdapter, _dateFormats, cdr) {
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._destroyed = new rxjs_1.Subject();
        _calendar.stateChanges
            .pipe(operators_1.takeUntil(this._destroyed))
            .subscribe(function () { return cdr.markForCheck(); });
    }
    CustomHeader.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    Object.defineProperty(CustomHeader.prototype, "periodLabel", {
        get: function () {
            return this._dateAdapter
                .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
                .toLocaleUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    CustomHeader.prototype.previousClicked = function (mode) {
        this._calendar.activeDate = mode === 'month' ?
            this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
            this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
    };
    CustomHeader.prototype.nextClicked = function (mode) {
        this._calendar.activeDate = mode === 'month' ?
            this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
            this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    };
    CustomHeader = __decorate([
        core_1.Component({selector: 'custom-header',
            template: "<div class=\"demo-calendar-header\"> <button mat-icon-button class=\"demo-double-arrow\" (click)=\"previousClicked('year')\"> <mat-icon>keyboard_arrow_left</mat-icon> <mat-icon>keyboard_arrow_left</mat-icon> </button> <button mat-icon-button (click)=\"previousClicked('month')\"> <mat-icon>keyboard_arrow_left</mat-icon> </button> <span class=\"demo-calendar-header-label\">{{periodLabel}}</span> <button mat-icon-button (click)=\"nextClicked('month')\"> <mat-icon>keyboard_arrow_right</mat-icon> </button> <button mat-icon-button class=\"demo-double-arrow\" (click)=\"nextClicked('year')\"> <mat-icon>keyboard_arrow_right</mat-icon> <mat-icon>keyboard_arrow_right</mat-icon> </button> </div> ",
            styles: [".demo-calendar-header { display: flex; align-items: center; padding: 0.5em; } .demo-calendar-header-label { flex: 1; height: 1em; font-weight: bold; text-align: center; } .demo-double-arrow .mat-icon { margin: -22%; } "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __param(0, core_1.Host()),
        __param(2, core_1.Inject(core_2.MAT_DATE_FORMATS)),
        __metadata("design:paramtypes", [material_1.MatCalendar,
            core_2.DateAdapter, Object, core_1.ChangeDetectorRef])
    ], CustomHeader);
    return CustomHeader;
}());
exports.CustomHeader = CustomHeader;
//# sourceMappingURL=datepicker-demo.js.map