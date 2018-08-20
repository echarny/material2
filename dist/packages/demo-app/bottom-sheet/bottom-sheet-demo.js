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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var defaultConfig = new bottom_sheet_1.MatBottomSheetConfig();
var BottomSheetDemo = /** @class */ (function () {
    function BottomSheetDemo(_bottomSheet) {
        this._bottomSheet = _bottomSheet;
        this.config = {
            hasBackdrop: defaultConfig.hasBackdrop,
            disableClose: defaultConfig.disableClose,
            backdropClass: defaultConfig.backdropClass,
            direction: 'ltr'
        };
    }
    BottomSheetDemo.prototype.openComponent = function () {
        this._bottomSheet.open(ExampleBottomSheet, this.config);
    };
    BottomSheetDemo.prototype.openTemplate = function () {
        this._bottomSheet.open(this.template, this.config);
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], BottomSheetDemo.prototype, "template", void 0);
    BottomSheetDemo = __decorate([
        core_1.Component({selector: 'bottom-sheet-demo',
            styles: [".demo-dialog-card { max-width: 405px; margin: 20px 0; } .mat-raised-button { margin-right: 5px; } "],
            template: "<h1>Bottom sheet demo</h1> <button mat-raised-button color=\"primary\" (click)=\"openComponent()\">Open component sheet</button> <button mat-raised-button color=\"accent\" (click)=\"openTemplate()\">Open template sheet</button> <mat-card class=\"demo-dialog-card\"> <mat-card-content> <h2>Options</h2> <p> <mat-checkbox [(ngModel)]=\"config.hasBackdrop\">Has backdrop</mat-checkbox> </p> <p> <mat-checkbox [(ngModel)]=\"config.disableClose\">Disable close</mat-checkbox> </p> <p> <mat-form-field> <input matInput [(ngModel)]=\"config.backdropClass\" placeholder=\"Backdrop class\"> </mat-form-field> </p> <p> <mat-form-field> <mat-select placeholder=\"Direction\" [(ngModel)]=\"config.direction\"> <mat-option value=\"ltr\">LTR</mat-option> <mat-option value=\"rtl\">RTL</mat-option> </mat-select> </mat-form-field> </p> </mat-card-content> </mat-card> <ng-template let-bottomSheetRef=\"bottomSheetRef\"> <mat-nav-list> <mat-list-item (click)=\"bottomSheetRef.dismiss()\" *ngFor=\"let action of [1, 2, 3]\"> <mat-icon mat-list-icon>folder</mat-icon> <span mat-line>Action {{ action }}</span> <span mat-line>Description</span> </mat-list-item> </mat-nav-list> </ng-template> ",
        }),
        __metadata("design:paramtypes", [bottom_sheet_1.MatBottomSheet])
    ], BottomSheetDemo);
    return BottomSheetDemo;
}());
exports.BottomSheetDemo = BottomSheetDemo;
var ExampleBottomSheet = /** @class */ (function () {
    function ExampleBottomSheet(sheet) {
        this.sheet = sheet;
    }
    ExampleBottomSheet.prototype.handleClick = function (event) {
        event.preventDefault();
        this.sheet.dismiss();
    };
    ExampleBottomSheet = __decorate([
        core_1.Component({
            template: "\n    <mat-nav-list>\n      <a href=\"#\" mat-list-item (click)=\"handleClick($event)\" *ngFor=\"let action of [1, 2, 3]\">\n        <span mat-line>Action {{ action }}</span>\n        <span mat-line>Description</span>\n      </a>\n    </mat-nav-list>\n  "
        }),
        __metadata("design:paramtypes", [bottom_sheet_1.MatBottomSheetRef])
    ], ExampleBottomSheet);
    return ExampleBottomSheet;
}());
exports.ExampleBottomSheet = ExampleBottomSheet;
//# sourceMappingURL=bottom-sheet-demo.js.map