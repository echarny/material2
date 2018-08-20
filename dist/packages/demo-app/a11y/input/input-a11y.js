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
var USD_TO_JPY = 110.29;
var InputAccessibilityDemo = /** @class */ (function () {
    function InputAccessibilityDemo() {
        this.showPassword = false;
        this.commentMax = 200;
    }
    Object.defineProperty(InputAccessibilityDemo.prototype, "passwordType", {
        get: function () { return this.showPassword ? 'text' : 'password'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputAccessibilityDemo.prototype, "passwordToggleLabel", {
        get: function () { return this.showPassword ? 'Hide password' : 'Reveal password'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputAccessibilityDemo.prototype, "passwordToggleIcon", {
        get: function () { return this.showPassword ? 'visibility_off' : 'visibility'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputAccessibilityDemo.prototype, "jpy", {
        get: function () { return this.usd ? this.usd * USD_TO_JPY : this.usd; },
        set: function (value) { this.usd = value ? value / USD_TO_JPY : value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputAccessibilityDemo.prototype, "commentCount", {
        get: function () { return this.comment ? this.comment.length : 0; },
        enumerable: true,
        configurable: true
    });
    InputAccessibilityDemo = __decorate([
        core_1.Component({selector: 'input-a11y',
            template: "<section> <h2>Basic input box (e.g. name field)</h2> <mat-form-field floatLabel=\"never\"> <mat-label>First name</mat-label> <input matInput [(ngModel)]=\"firstName\"> </mat-form-field> <mat-form-field floatLabel=\"never\"> <mat-label>Last name</mat-label> <input matInput [(ngModel)]=\"lastName\"> </mat-form-field> </section> <section> <h2>Input with hint (e.g. password field)</h2> <mat-form-field hideRequiredMarker> <mat-label>Password</mat-label> <input matInput [type]=\"passwordType\" [(ngModel)]=\"password\" required #passwordModel=\"ngModel\"> <button mat-icon-button matSuffix [attr.aria-label]=\"passwordToggleLabel\" (click)=\"showPassword = !showPassword\"> <mat-icon>{{passwordToggleIcon}}</mat-icon> </button> <mat-hint>Hint: favorite color</mat-hint> <mat-error *ngIf=\"passwordModel.hasError('required')\">You must enter your password.</mat-error> </mat-form-field> </section> <section> <h2>Input with error message (e.g. email field)</h2> <mat-form-field> <mat-label>Email</mat-label> <input matInput type=\"email\" [(ngModel)]=\"email\" required email #emailModel=\"ngModel\"> <mat-error *ngIf=\"emailModel.hasError('required')\">You must enter your email.</mat-error> <mat-error *ngIf=\"emailModel.hasError('email')\">Not a valid email address.</mat-error> </mat-form-field> </section> <section> <h2>Input with prefix & suffix (e.g. currency converter)</h2> <mat-form-field floatLabel=\"always\"> <mat-label>USD</mat-label> <input matInput type=\"number\" [(ngModel)]=\"usd\"> <span matPrefix>$</span> </mat-form-field> = <mat-form-field floatLabel=\"always\"> <mat-label>JPY</mat-label> <input matInput type=\"number\" [(ngModel)]=\"jpy\"> <span matPrefix>‎¥‎</span> </mat-form-field> (as of 7/31/2017) </section> <section> <h2>Textarea input (e.g.  comment box)</h2> <mat-form-field> <textarea matInput aria-label=\"Comment\" [(ngModel)]=\"comment\" cdkTextareaAutosize [maxlength]=\"commentMax\" #commentModel=\"ngModel\"></textarea> <mat-hint>Leave us a comment!</mat-hint> <mat-hint align=\"end\">{{commentCount}}/{{commentMax}}</mat-hint> </mat-form-field> </section> ",
        })
    ], InputAccessibilityDemo);
    return InputAccessibilityDemo;
}());
exports.InputAccessibilityDemo = InputAccessibilityDemo;
//# sourceMappingURL=input-a11y.js.map