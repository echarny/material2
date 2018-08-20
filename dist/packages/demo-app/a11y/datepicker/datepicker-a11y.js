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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatepickerAccessibilityDemo = /** @class */ (function () {
    function DatepickerAccessibilityDemo() {
        this.maxBirthday = new Date();
        this.paymentDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
        this.minPaymentDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
        this.minTripDate = new Date();
        this.maxTripDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        this.startTripDate = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
        this.minAppointmentDate = new Date();
        this.maxAppointmentDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        this.weekdaysOnly = function (d) { return d.getDay() != 0 && d.getDay() != 6; };
    }
    DatepickerAccessibilityDemo = __decorate([
        core_1.Component({selector: 'datepicker-a11y',
            template: "<section> <h2>Choose a date (e.g. choose your date of birth)</h2> <mat-form-field> <mat-label>Date of birth</mat-label> <input matInput [matDatepicker]=\"birthdayPicker\" [(ngModel)]=\"birthday\" #birthdayModel=\"ngModel\" [max]=\"maxBirthday\" required> <mat-datepicker-toggle matSuffix [for]=\"birthdayPicker\"></mat-datepicker-toggle> <mat-datepicker #birthdayPicker startView=\"year\"></mat-datepicker> <mat-error *ngIf=\"birthdayModel.hasError('required')\"> Please choose a date. </mat-error> <mat-error *ngIf=\"birthdayModel.hasError('matDatepickerMax')\"> Please choose an earlier date. </mat-error> </mat-form-field> </section> <section> <h2>Choose a date with touch UI (e.g. choose a payment date on mobile)</h2> <p>When would you like to schedule your payment?</p> <mat-form-field> <input matInput [matDatepicker]=\"paymentPicker\" [(ngModel)]=\"paymentDate\" #paymentDateModel=\"ngModel\" [min]=\"minPaymentDate\" required aria-label=\"Payment date\"> <mat-datepicker-toggle matSuffix [for]=\"paymentPicker\"></mat-datepicker-toggle> <mat-datepicker #paymentPicker></mat-datepicker> <mat-error *ngIf=\"paymentDateModel.hasError('required')\"> Please choose a date. </mat-error> <mat-error *ngIf=\"paymentDateModel.hasError('matDatepickerMin')\"> Please choose a later date. </mat-error> </mat-form-field> </section> <section> <h2>Choose date with startAt, min and max (e.g. schedule a departing and returning flight)</h2> <mat-form-field> <mat-label>Departure date</mat-label> <input matInput [matDatepicker]=\"departPicker\" [(ngModel)]=\"departDate\" #departDateModel=\"ngModel\" [min]=\"minTripDate\" [max]=\"maxTripDate\" required> <mat-datepicker-toggle matSuffix [for]=\"departPicker\"></mat-datepicker-toggle> <mat-datepicker #departPicker [startAt]=\"startTripDate\"></mat-datepicker> <mat-error *ngIf=\"departDateModel.hasError('required')\"> Please choose a date. </mat-error> <mat-error *ngIf=\"departDateModel.hasError('matDatepickerMin')\"> Please choose a later date. </mat-error> <mat-error *ngIf=\"departDateModel.hasError('matDatepickerMax')\"> Please choose an earlier date. </mat-error> </mat-form-field> <mat-form-field> <mat-label>Return date</mat-label> <input matInput [matDatepicker]=\"returnPicker\" [(ngModel)]=\"returnDate\" #returnDateModel=\"ngModel\" [min]=\"departDate || minTripDate\" [max]=\"maxTripDate\"> <mat-datepicker-toggle matSuffix [for]=\"returnPicker\"></mat-datepicker-toggle> <mat-datepicker #returnPicker [startAt]=\"startTripDate\"></mat-datepicker> <mat-error *ngIf=\"returnDateModel.hasError('matDatepickerMin') && !departDate\"> Please choose a later date. </mat-error> <mat-error *ngIf=\"returnDateModel.hasError('matDatepickerMin') && departDate\"> Please choose a date after your departure. </mat-error> <mat-error *ngIf=\"returnDateModel.hasError('matDatepickerMax')\"> Please choose an earlier date. </mat-error> </mat-form-field> </section> <section> <h2>Choose date with date filter (e.g. schedule a doctor's appointment)</h2> <mat-form-field> <mat-label>Appointment date</mat-label> <input matInput [matDatepicker]=\"appointmentPicker\" [(ngModel)]=\"appointmentDate\" #appointmentDateModel=\"ngModel\" [min]=\"minAppointmentDate\" [max]=\"maxAppointmentDate\" [matDatepickerFilter]=\"weekdaysOnly\" required> <mat-datepicker-toggle matSuffix [for]=\"appointmentPicker\"></mat-datepicker-toggle> <mat-datepicker #appointmentPicker></mat-datepicker> <mat-error *ngIf=\"appointmentDateModel.hasError('required')\"> Please choose a date. </mat-error> <mat-error *ngIf=\"appointmentDateModel.hasError('matDatepickerMin') || appointmentDateModel.hasError('matDatepickerMax') || appointmentDateModel.hasError('matDatepickerFilter')\"> No appointments available on this date. </mat-error> </mat-form-field> </section> ",
            styles: [".mat-form-field { width: 250px; } "],
        })
    ], DatepickerAccessibilityDemo);
    return DatepickerAccessibilityDemo;
}());
exports.DatepickerAccessibilityDemo = DatepickerAccessibilityDemo;
//# sourceMappingURL=datepicker-a11y.js.map