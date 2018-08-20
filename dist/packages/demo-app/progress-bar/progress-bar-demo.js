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
// TODO(josephperrott): Add an automatically filling example progress bar.
var ProgressBarDemo = /** @class */ (function () {
    function ProgressBarDemo() {
        this.color = 'primary';
        this.determinateProgressValue = 30;
        this.bufferProgressValue = 30;
        this.bufferBufferValue = 40;
    }
    ProgressBarDemo.prototype.stepDeterminateProgressVal = function (val) {
        this.determinateProgressValue = this.clampValue(val + this.determinateProgressValue);
    };
    ProgressBarDemo.prototype.stepBufferProgressVal = function (val) {
        this.bufferProgressValue = this.clampValue(val + this.bufferProgressValue);
    };
    ProgressBarDemo.prototype.stepBufferBufferVal = function (val) {
        this.bufferBufferValue = this.clampValue(val + this.bufferBufferValue);
    };
    ProgressBarDemo.prototype.clampValue = function (value) {
        return Math.max(0, Math.min(100, value));
    };
    ProgressBarDemo = __decorate([
        core_1.Component({selector: 'progress-bar-demo',
            template: "<mat-button-toggle-group class=\"demo-progress-bar-controls\" [(ngModel)]=\"color\"> <mat-button-toggle value=\"primary\">Primary Color</mat-button-toggle> <mat-button-toggle value=\"accent\">Accent Color</mat-button-toggle> <mat-button-toggle value=\"warn\">Warn Color</mat-button-toggle> </mat-button-toggle-group> <h1>Determinate</h1> <div class=\"demo-progress-bar-controls\"> <span>Value: {{determinateProgressValue}}</span> <button mat-raised-button (click)=\"stepDeterminateProgressVal(10)\">Increase</button> <button mat-raised-button (click)=\"stepDeterminateProgressVal(-10)\">Decrease</button> </div> <div class=\"demo-progress-bar-container\"> <mat-progress-bar mode=\"determinate\" [value]=\"determinateProgressValue\" [color]=\"color\"> </mat-progress-bar> </div> <h1>Buffer</h1> <div class=\"demo-progress-bar-controls\"> <span>Value: {{bufferProgressValue}}</span> <button mat-raised-button (click)=\"stepBufferProgressVal(10)\">Increase</button> <button mat-raised-button (click)=\"stepBufferProgressVal(-10)\">Decrease</button> <span class=\"demo-progress-bar-spacer\"></span> <span>Buffer Value: {{bufferBufferValue}}</span> <button mat-raised-button (click)=\"stepBufferBufferVal(10)\">Increase</button> <button mat-raised-button (click)=\"stepBufferBufferVal(-10)\">Decrease</button> </div> <div class=\"demo-progress-bar-container\"> <mat-progress-bar [value]=\"bufferProgressValue\" [bufferValue]=\"bufferBufferValue\" mode=\"buffer\" [color]=\"color\"></mat-progress-bar> </div> <h1>Indeterminate</h1> <div class=\"demo-progress-bar-container\"> <mat-progress-bar mode=\"indeterminate\" [color]=\"color\"></mat-progress-bar> </div> <h1>Query</h1> <div class=\"demo-progress-bar-container\"> <mat-progress-bar mode=\"query\" [color]=\"color\"></mat-progress-bar> </div> ",
            styles: [".demo-progress-bar-container { width: 100%; } .demo-progress-bar-container mat-progress-bar { margin: 20px 0; } .demo-progress-bar-spacer { display: inline-block; width: 50px; } .demo-progress-bar-controls { margin: 10px 0; } "],
        })
    ], ProgressBarDemo);
    return ProgressBarDemo;
}());
exports.ProgressBarDemo = ProgressBarDemo;
//# sourceMappingURL=progress-bar-demo.js.map