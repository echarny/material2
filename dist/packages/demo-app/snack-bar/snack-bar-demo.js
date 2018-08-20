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
var bidi_1 = require("@angular/cdk/bidi");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var SnackBarDemo = /** @class */ (function () {
    function SnackBarDemo(snackBar, dir) {
        this.snackBar = snackBar;
        this.dir = dir;
        this.message = 'Snack Bar opened.';
        this.actionButtonLabel = 'Retry';
        this.action = false;
        this.setAutoHide = true;
        this.autoHide = 10000;
        this.addExtraClass = false;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'bottom';
    }
    SnackBarDemo.prototype.open = function () {
        var config = this._createConfig();
        this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    };
    SnackBarDemo.prototype.openTemplate = function () {
        var config = this._createConfig();
        this.snackBar.openFromTemplate(this.template, config);
    };
    SnackBarDemo.prototype._createConfig = function () {
        var config = new material_1.MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
        config.direction = this.dir.value;
        return config;
    };
    __decorate([
        core_1.ViewChild('template'),
        __metadata("design:type", core_1.TemplateRef)
    ], SnackBarDemo.prototype, "template", void 0);
    SnackBarDemo = __decorate([
        core_1.Component({selector: 'snack-bar-demo',
            styles: [".demo-party { animation: demo-party 5000ms infinite; } @keyframes demo-party { 0% { background: #00f; } 10% { background: #8e44ad; } 20% { background: #1abc9c; } 30% { background: #d35400; } 40% { background: #00f; } 50% { background: #34495e; } 60% { background: #00f; } 70% { background: #2980b9; } 80% { background: #f1c40f; } 90% { background: #2980b9; } 100% { background: #0ff; } } "],
            template: "<h1>SnackBar demo</h1> <div> <div> Message: <mat-form-field><input matInput type=\"text\" [(ngModel)]=\"message\"></mat-form-field> </div> <div> <div>Position in page: </div> <mat-form-field> <mat-select [(ngModel)]=\"horizontalPosition\"> <mat-option value=\"start\">Start</mat-option> <mat-option value=\"end\">End</mat-option> <mat-option value=\"left\">Left</mat-option> <mat-option value=\"right\">Right</mat-option> <mat-option value=\"center\">Center</mat-option> </mat-select> </mat-form-field> <mat-form-field> <mat-select [(ngModel)]=\"verticalPosition\"> <mat-option value=\"top\">Top</mat-option> <mat-option value=\"bottom\">Bottom</mat-option> </mat-select> </mat-form-field> </div> <div> <mat-checkbox [(ngModel)]=\"action\"> <p *ngIf=\"!action\">Show button on snack bar</p> <mat-form-field *ngIf=\"action\"> <mat-label>Snack bar action label</mat-label> <input matInput type=\"text\" [(ngModel)]=\"actionButtonLabel\"> </mat-form-field> </mat-checkbox> </div> <div> <mat-checkbox [(ngModel)]=\"setAutoHide\"> <p *ngIf=\"!setAutoHide\">Auto hide after duration</p> <mat-form-field *ngIf=\"setAutoHide\"> <mat-label>Auto hide duration in ms</mat-label> <input matInput type=\"number\" [(ngModel)]=\"autoHide\"> </mat-form-field> </mat-checkbox> </div> <p> <mat-checkbox [(ngModel)]=\"addExtraClass\">Add extra class to container</mat-checkbox> </p> </div> <p> <button mat-raised-button (click)=\"open()\">OPEN</button> </p> <button mat-raised-button (click)=\"openTemplate()\">OPEN TEMPLATE</button> <ng-template #template> Template snack bar: {{message}} </ng-template> ",
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar, bidi_1.Dir])
    ], SnackBarDemo);
    return SnackBarDemo;
}());
exports.SnackBarDemo = SnackBarDemo;
//# sourceMappingURL=snack-bar-demo.js.map