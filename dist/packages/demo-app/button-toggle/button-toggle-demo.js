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
var ButtonToggleDemo = /** @class */ (function () {
    function ButtonToggleDemo() {
        this.isVertical = false;
        this.isDisabled = false;
        this.favoritePie = 'Apple';
        this.pieOptions = [
            'Apple',
            'Cherry',
            'Pecan',
            'Lemon',
        ];
    }
    ButtonToggleDemo = __decorate([
        core_1.Component({selector: 'button-toggle-demo',
            template: "<p> <mat-checkbox (change)=\"isVertical = $event.checked\">Show Button Toggles Vertical</mat-checkbox> </p> <p> <mat-checkbox (change)=\"isDisabled = $event.checked\">Disable Button Toggle Items</mat-checkbox> </p> <h1>Exclusive Selection</h1> <section> <mat-button-toggle-group name=\"alignment\" [vertical]=\"isVertical\"> <mat-button-toggle value=\"left\"[disabled]=\"isDisabled\"> <mat-icon>format_align_left</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"center\" [disabled]=\"isDisabled\"> <mat-icon>format_align_center</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"right\" [disabled]=\"isDisabled\"> <mat-icon>format_align_right</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"justify\" [disabled]=\"isDisabled\"> <mat-icon>format_align_justify</mat-icon> </mat-button-toggle> </mat-button-toggle-group> </section> <h1>Disabled Group</h1> <section> <mat-button-toggle-group name=\"checkbox\" [vertical]=\"isVertical\" [disabled]=\"isDisabled\"> <mat-button-toggle value=\"bold\"> <mat-icon>format_bold</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"italic\"> <mat-icon>format_italic</mat-icon> </mat-button-toggle> <mat-button-toggle value=\"underline\"> <mat-icon>format_underline</mat-icon> </mat-button-toggle> </mat-button-toggle-group> </section> <h1>Multiple Selection</h1> <section> <mat-button-toggle-group multiple [vertical]=\"isVertical\"> <mat-button-toggle>Flour</mat-button-toggle> <mat-button-toggle>Eggs</mat-button-toggle> <mat-button-toggle>Sugar</mat-button-toggle> <mat-button-toggle [disabled]=\"isDisabled\">Milk</mat-button-toggle> </mat-button-toggle-group> </section> <h1>Single Toggle</h1> <mat-button-toggle>Yes</mat-button-toggle> <h1>Dynamic Exclusive Selection</h1> <section> <mat-button-toggle-group name=\"pies\" [(ngModel)]=\"favoritePie\" [vertical]=\"isVertical\"> <mat-button-toggle *ngFor=\"let pie of pieOptions\" [value]=\"pie\"> {{pie}} </mat-button-toggle> </mat-button-toggle-group> <p>Your favorite type of pie is: {{favoritePie}}</p> </section> ",
        })
    ], ButtonToggleDemo);
    return ButtonToggleDemo;
}());
exports.ButtonToggleDemo = ButtonToggleDemo;
//# sourceMappingURL=button-toggle-demo.js.map