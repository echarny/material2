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
var material_1 = require("@angular/material");
var SnackBarAccessibilityDemo = /** @class */ (function () {
    function SnackBarAccessibilityDemo(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarAccessibilityDemo.prototype.openDiscoPartySnackBar = function () {
        this.snackBar.open('Disco party!', 'Dismiss', { duration: 5000 });
    };
    SnackBarAccessibilityDemo.prototype.openNotificationSnackBar = function () {
        this.snackBar.open('Thank you for your support!', '', { duration: 2000 });
    };
    SnackBarAccessibilityDemo = __decorate([
        core_1.Component({selector: 'snack-bar-a11y',
            template: "<section> <h2>Notification</h2> <p>Showing a notification by snack bar without showing actions</p> <button mat-raised-button color=\"primary\" (click)=\"openNotificationSnackBar()\"> Support </button> </section> <section> <h2>Disco party </h2> <p>Showing a notification by snack bar with a dismiss button</p> <button mat-button (click)=\"openDiscoPartySnackBar()\">Disco</button> </section> ",
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], SnackBarAccessibilityDemo);
    return SnackBarAccessibilityDemo;
}());
exports.SnackBarAccessibilityDemo = SnackBarAccessibilityDemo;
//# sourceMappingURL=snack-bar-a11y.js.map