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
var SlideToggleAccessibilityDemo = /** @class */ (function () {
    function SlideToggleAccessibilityDemo(snackBar) {
        this.snackBar = snackBar;
        this.emailToggle = true;
        this.termsToggle = false;
        this.musicToggle = false;
    }
    SlideToggleAccessibilityDemo.prototype.onFormSubmit = function () {
        this.snackBar.open('Terms and condistions accepted!', '', { duration: 2000 });
    };
    SlideToggleAccessibilityDemo = __decorate([
        core_1.Component({selector: 'slide-toggle-a11y',
            template: "<section> <h2>Receive email update</h2> <p>Showing a toggle to manage whether receive email update.</p> <mat-slide-toggle color=\"primary\" [(ngModel)]=\"emailToggle\"> Receive email update </mat-slide-toggle> </section> <section> <h2>Music</h2> <p>Showing a disabled toggle to control music on/off status.</p> <mat-slide-toggle color=\"accent\" [disabled]=\"true\" [(ngModel)]=\"musicToggle\"> Music {{musicToggle ? 'on' : 'off'}}   (disabled) </mat-slide-toggle> </section> <section> <h2>Terms and conditions</h2> <p>Showing a required toggle to accept terms and conditions in a form.</p> <form #form=\"ngForm\" (ngSubmit)=\"onFormSubmit()\" ngNativeValidate> <mat-slide-toggle name=\"termsToggle\" required ngModel> I agree to terms and conditions </mat-slide-toggle> <p> <button mat-raised-button type=\"submit\">Submit</button> </p> </form> </section> ",
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], SlideToggleAccessibilityDemo);
    return SlideToggleAccessibilityDemo;
}());
exports.SlideToggleAccessibilityDemo = SlideToggleAccessibilityDemo;
//# sourceMappingURL=slide-toggle-a11y.js.map