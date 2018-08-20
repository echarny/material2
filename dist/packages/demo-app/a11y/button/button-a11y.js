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
var ButtonAccessibilityDemo = /** @class */ (function () {
    function ButtonAccessibilityDemo(snackBar) {
        this.snackBar = snackBar;
        this.counter = 0;
    }
    ButtonAccessibilityDemo.prototype.openSnackBar = function (message) {
        this.snackBar.open(message, '', {
            duration: 2000,
        });
    };
    ButtonAccessibilityDemo.prototype.increase = function () {
        this.counter++;
        this.openSnackBar("Click counter is set to " + this.counter);
    };
    ButtonAccessibilityDemo = __decorate([
        core_1.Component({selector: 'button-a11y',
            template: "<div class=\"demo-button\"> <section> <h2>Button elements</h2> <p>Click on the buttons to increase the button counter.</p> <p>Current number of clicks: {{counter}}</p> <button mat-button (click)=\"increase()\">Check</button> <button mat-raised-button (click)=\"increase()\">Pitch</button> <button mat-fab (click)=\"increase()\" aria-label=\"Activate floating action style button to increase the button counter\"> <mat-icon>plus_one</mat-icon> </button> <button mat-mini-fab (click)=\"increase()\" aria-label=\"Mini floating action button to increase the button counter by 1\"> <mat-icon>plus_one</mat-icon> </button> <button mat-icon-button (click)=\"increase()\" aria-label=\"Icon button to increase the button counter by 1\"> <mat-icon>plus_one</mat-icon> </button> </section> <section> <h2>Anchor elements</h2> <a href=\"http://www.google.com\" mat-button color=\"primary\">Google search</a> <a href=\"https://www.youtube.com/\" mat-raised-button>YouTube</a> <a href=\"http://www.google.com\" mat-fab aria-label=\"Activate floating action style google search link\"> <mat-icon>search</mat-icon> </a> <a href=\"http://www.google.com\" mat-mini-fab aria-label=\"Activate mini floating action style google search link\"> <mat-icon>search</mat-icon> </a> <a href=\"http://www.google.com\" mat-icon-button aria-label=\"Activate icon style google search link\"> <mat-icon>search</mat-icon> </a> </section> <section> <h2>Buttons in different colors</h2> <button mat-button color=\"primary\" (click)=\"openSnackBar('Color is primary.')\">Primary</button> <button mat-button color=\"accent\" (click)=\"openSnackBar('Color is accent.')\">Accent</button> <button mat-button color=\"warn\" (click)=\"openSnackBar('Color is warn.')\">Warn</button> </section> <section> <h2>Disabled button</h2> <p>The following \"cancel\" button is disabled</p> <button mat-button [disabled]=\"true\">Cancel</button> </section> </div> ",
            styles: [".demo-button button, .demo-button a { margin: 8px; text-transform: uppercase; } "],
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], ButtonAccessibilityDemo);
    return ButtonAccessibilityDemo;
}());
exports.ButtonAccessibilityDemo = ButtonAccessibilityDemo;
//# sourceMappingURL=button-a11y.js.map