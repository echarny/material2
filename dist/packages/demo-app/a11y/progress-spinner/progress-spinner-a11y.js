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
var ProgressSpinnerAccessibilityDemo = /** @class */ (function () {
    function ProgressSpinnerAccessibilityDemo() {
        this.portionValue = 60;
    }
    ProgressSpinnerAccessibilityDemo = __decorate([
        core_1.Component({selector: 'progress-spinner-a11y',
            template: "<section> <h2>Loading indicator (Indeterminate progress spinner)</h2> <mat-spinner color=\"indeterminate\" [strokeWidth]=\"1\" aria-label=\"Loading\"></mat-spinner> <mat-spinner color=\"accent\" aria-label=\"Loading\"></mat-spinner> </section> <section> <h2>Portion of pizza eaten (Determinate progress spinner) </h2> <mat-progress-spinner [strokeWidth]=\"1\" color=\"primary\" [value]=\"portionValue\" aria-label=\"Portion of pizza eaten\"> </mat-progress-spinner> <mat-progress-spinner color=\"warn\" [value]=\"portionValue\" aria-label=\"Portion of pizza eaten\"> </mat-progress-spinner> </section> ",
        })
    ], ProgressSpinnerAccessibilityDemo);
    return ProgressSpinnerAccessibilityDemo;
}());
exports.ProgressSpinnerAccessibilityDemo = ProgressSpinnerAccessibilityDemo;
//# sourceMappingURL=progress-spinner-a11y.js.map