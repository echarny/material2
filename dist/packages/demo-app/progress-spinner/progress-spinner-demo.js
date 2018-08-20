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
var ProgressSpinnerDemo = /** @class */ (function () {
    function ProgressSpinnerDemo() {
        this.progressValue = 60;
        this.color = 'primary';
        this.isDeterminate = true;
    }
    ProgressSpinnerDemo.prototype.step = function (val) {
        this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
    };
    ProgressSpinnerDemo = __decorate([
        core_1.Component({selector: 'progress-spinner-demo',
            template: "<h1>Determinate</h1> <div class=\"demo-progress-spinner-controls\"> <p>Value: {{progressValue}}</p> <button mat-raised-button (click)=\"step(10)\">Increase</button> <button mat-raised-button (click)=\"step(-10)\">Decrease</button> <mat-checkbox [(ngModel)]=\"isDeterminate\">Is determinate</mat-checkbox> </div> <div class=\"demo-progress-spinner\"> <mat-progress-spinner [mode]=\"isDeterminate ? 'determinate' : 'indeterminate'\" [value]=\"progressValue\" color=\"warn\" [strokeWidth]=\"1.6\" [diameter]=\"16\"></mat-progress-spinner> <mat-progress-spinner [mode]=\"isDeterminate ? 'determinate' : 'indeterminate'\" [value]=\"progressValue\" color=\"accent\" [strokeWidth]=\"1\" [diameter]=\"32\"></mat-progress-spinner> <mat-progress-spinner [mode]=\"isDeterminate ? 'determinate' : 'indeterminate'\" [value]=\"progressValue\" color=\"primary\" [diameter]=\"50\"></mat-progress-spinner> </div> <h1>Indeterminate</h1> <mat-button-toggle-group class=\"demo-progress-spinner-controls\" [(ngModel)]=\"color\"> <mat-button-toggle value=\"primary\">Primary Color</mat-button-toggle> <mat-button-toggle value=\"accent\">Accent Color</mat-button-toggle> <mat-button-toggle value=\"warn\">Warn Color</mat-button-toggle> </mat-button-toggle-group> <div class=\"demo-progress-spinner\"> <mat-progress-spinner mode=\"indeterminate\" [color]=\"color\"></mat-progress-spinner> <mat-progress-spinner mode=\"indeterminate\" [color]=\"color\"></mat-progress-spinner> <mat-spinner [color]=\"color\"></mat-spinner> </div> ",
            styles: [".demo-progress-spinner { width: 100%; } .demo-progress-spinner .mat-progress-spinner, .demo-progress-spinner .mat-spinner { display: inline-block; } .demo-progress-spinner-controls { margin: 10px 0; } "],
        })
    ], ProgressSpinnerDemo);
    return ProgressSpinnerDemo;
}());
exports.ProgressSpinnerDemo = ProgressSpinnerDemo;
//# sourceMappingURL=progress-spinner-demo.js.map