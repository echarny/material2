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
var TooltipAccessibilityDemo = /** @class */ (function () {
    function TooltipAccessibilityDemo() {
    }
    TooltipAccessibilityDemo = __decorate([
        core_1.Component({selector: 'tooltip-a11y',
            template: "<section> <h2>Mouse over or tab to trigger a tooltip</h2> <p>Mouse over or focus the button to show and hide the tooltip</p> <button mat-raised-button matTooltip=\"This is an example of a tooltip\">What is this?</button> </section> <section> <h2>Click to trigger a tooltip</h2> <button mat-raised-button (click)=\"tooltip.toggle(); $event.stopPropagation()\">Toggle the tooltip</button> <button mat-raised-button matTooltip=\"This is a tooltip that shows on click\" #tooltip=\"matTooltip\">I have a tooltip</button> </section> <section> <h2>Different tooltip positions</h2> <button mat-raised-button matTooltip=\"This tooltip appears below the trigger\" matTooltipPosition=\"below\">Below</button> <button mat-raised-button matTooltip=\"This tooltip appears above the trigger\" matTooltipPosition=\"above\">Above</button> <button mat-raised-button matTooltip=\"This tooltip appears to the left of the trigger\" matTooltipPosition=\"left\">Left</button> <button mat-raised-button matTooltip=\"This tooltip appears to the right of the trigger\" matTooltipPosition=\"right\">Right</button> </section> <section> <h2>Delayed tooltip</h2> <button mat-raised-button matTooltip=\"This tooltip will show up after a delay\" [matTooltipShowDelay]=\"2000\">What is this?</button> </section> ",
        })
    ], TooltipAccessibilityDemo);
    return TooltipAccessibilityDemo;
}());
exports.TooltipAccessibilityDemo = TooltipAccessibilityDemo;
//# sourceMappingURL=tooltip-a11y.js.map