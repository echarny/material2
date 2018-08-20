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
var RadioAccessibilityDemo = /** @class */ (function () {
    function RadioAccessibilityDemo() {
        this.favoriteSeason = 'Autumn';
        this.seasonOptions = [
            'Winter',
            'Spring',
            'Summer',
            'Autumn',
        ];
    }
    RadioAccessibilityDemo = __decorate([
        core_1.Component({selector: 'radio-a11y',
            template: "<section> <h2>Radio buttons in group</h2> <mat-radio-group name=\"seasons\" [(ngModel)]=\"favoriteSeason\" aria-label=\"Seasons\"> <mat-radio-button *ngFor=\"let season of seasonOptions\" [value]=\"season\"> {{season}} </mat-radio-button> </mat-radio-group> </section> <section> <h2>Radio buttons with align-end label position</h2> <mat-radio-group name=\"bread\" align=\"end\" aria-label=\"Breads\"> <mat-radio-button value=\"toast\">Toast</mat-radio-button> <mat-radio-button value=\"biscuit\">Biscuit</mat-radio-button> <mat-radio-button value=\"bagel\">Bagel</mat-radio-button> </mat-radio-group> </section> <section> <h2>Disabled radio buttons</h2> <p> This section contains three radio buttons for \"Yes\", \"No\", and \"Maybe\". The \"Maybe\" radio button is disabled. </p> <mat-radio-button name=\"disable\">Yes</mat-radio-button> <mat-radio-button name=\"disable\">No</mat-radio-button> <mat-radio-button name=\"disable\" [disabled]=\"true\">Maybe</mat-radio-button> </section> <section> <h2>Radio buttons with different colors</h2> <mat-radio-button name=\"color\">Default (accent)</mat-radio-button> <mat-radio-button name=\"color\" color=\"primary\">Primary</mat-radio-button> <mat-radio-button name=\"color\" color=\"accent\">Accent</mat-radio-button> <mat-radio-button name=\"color\" color=\"warn\">Warn</mat-radio-button> </section> ",
            styles: [""],
        })
    ], RadioAccessibilityDemo);
    return RadioAccessibilityDemo;
}());
exports.RadioAccessibilityDemo = RadioAccessibilityDemo;
//# sourceMappingURL=radio-a11y.js.map