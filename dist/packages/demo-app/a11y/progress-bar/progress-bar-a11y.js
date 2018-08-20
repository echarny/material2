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
var ProgressBarAccessibilityDemo = /** @class */ (function () {
    function ProgressBarAccessibilityDemo() {
        this.surveyProgress = 30;
        this.videoPlayValue = 20;
        this.videoBufferValue = 60;
    }
    ProgressBarAccessibilityDemo = __decorate([
        core_1.Component({selector: 'progress-bar-a11y',
            template: "<section> <h2>Survey progress (Determinate progress bar)</h2> <mat-progress-bar mode=\"determinate\" [value]=\"surveyProgress\" color=\"primary\" aria-label=\"Survey progress\"> </mat-progress-bar> </section> <section> <h2>Video progress (Progress bar with buffer) </h2> <mat-progress-bar [value]=\"videoPlayValue\" [bufferValue]=\"videoBufferValue\" mode=\"buffer\" color=\"primary\" aria-label=\"Video progress\"> </mat-progress-bar> </section> <section> <h2>Loading content progress (Indeterminate progress bar)</h2> <mat-progress-bar mode=\"indeterminate\" color=\"warn\" aria-label=\"Loading content\"> </mat-progress-bar> </section> <section> <h2>Search progress (Query progress bar)</h2> <mat-progress-bar mode=\"query\" color=\"accent\" aria-label=\"Searching\"></mat-progress-bar> </section> ",
        })
    ], ProgressBarAccessibilityDemo);
    return ProgressBarAccessibilityDemo;
}());
exports.ProgressBarAccessibilityDemo = ProgressBarAccessibilityDemo;
//# sourceMappingURL=progress-bar-a11y.js.map