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
var ButtonToggleAccessibilityDemo = /** @class */ (function () {
    function ButtonToggleAccessibilityDemo() {
        this.favoritePie = 'Apple';
        this.pieOptions = [
            'Apple',
            'Cherry',
            'Pecan',
            'Lemon',
        ];
    }
    ButtonToggleAccessibilityDemo = __decorate([
        core_1.Component({selector: 'button-toggle-a11y',
            template: "<section> <h2>Single button toggle</h2> <mat-button-toggle>Yes</mat-button-toggle> </section> <section> <h2>Button toggles with icons</h2> <mat-button-toggle-group name=\"alignment\" aria-label=\"Alignments\"> <mat-button-toggle value=\"left\" aria-label=\"Align left\"> <mat-icon>format_align_left</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"center\" aria-label=\"Align center\"> <mat-icon>format_align_center</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"right\" aria-label=\"Align right\"> <mat-icon>format_align_right</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"justify\" aria-label=\"Align justify\"> <mat-icon>format_align_justify</mat-icon> </mat-button-toggle> </mat-button-toggle-group> </section> <section> <h2>Multi-selection button toggle group</h2> <mat-button-toggle-group multiple aria-label=\"Groceries\"> <mat-button-toggle>Flour</mat-button-toggle> <mat-button-toggle>Eggs</mat-button-toggle> <mat-button-toggle>Sugar</mat-button-toggle> <mat-button-toggle>Milk</mat-button-toggle> </mat-button-toggle-group> </section> <section> <h2>Exclusive selection button toggle group</h2> <mat-button-toggle-group name=\"pies\" [(ngModel)]=\"favoritePie\"  aria-label=\"Pies\"> <mat-button-toggle *ngFor=\"let pie of pieOptions\" [value]=\"pie\"> {{pie}} </mat-button-toggle> </mat-button-toggle-group> <p>Your favorite type of pie is: {{favoritePie}}</p> </section> <section> <h2>Disabled button toggle group</h2> <mat-button-toggle-group [disabled]=\"true\" aria-label=\"Groceries\"> <mat-button-toggle>Flour</mat-button-toggle> <mat-button-toggle>Eggs</mat-button-toggle> <mat-button-toggle>Sugar</mat-button-toggle> <mat-button-toggle>Milk</mat-button-toggle> </mat-button-toggle-group> </section> <section> <h2>Vertical button toggle group</h2> <mat-button-toggle-group multiple [vertical]=\"true\" aria-label=\"Groceries\"> <mat-button-toggle>Flour</mat-button-toggle> <mat-button-toggle>Eggs</mat-button-toggle> <mat-button-toggle>Sugar</mat-button-toggle> <mat-button-toggle>Milk</mat-button-toggle> </mat-button-toggle-group> </section>",
            styles: [""],
        })
    ], ButtonToggleAccessibilityDemo);
    return ButtonToggleAccessibilityDemo;
}());
exports.ButtonToggleAccessibilityDemo = ButtonToggleAccessibilityDemo;
//# sourceMappingURL=button-toggle-a11y.js.map