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
var RadioDemo = /** @class */ (function () {
    function RadioDemo() {
        this.isAlignEnd = false;
        this.isDisabled = false;
        this.isRequired = false;
        this.favoriteSeason = 'Autumn';
        this.seasonOptions = [
            'Winter',
            'Spring',
            'Summer',
            'Autumn',
        ];
    }
    RadioDemo = __decorate([
        core_1.Component({selector: 'radio-demo',
            template: "<h1>Basic Example</h1> <section class=\"demo-section\"> <mat-radio-button name=\"group1\" checked>Option 1</mat-radio-button> <mat-radio-button name=\"group1\">Option 2</mat-radio-button> <mat-radio-button name=\"group1\" disabled=\"true\">Option 3 (disabled)</mat-radio-button> </section> <h1>Color Example</h1> <section class=\"demo-section\"> <mat-radio-button name=\"group2\">Default (accent)</mat-radio-button> <mat-radio-button name=\"group2\" color=\"primary\">Primary</mat-radio-button> <mat-radio-button name=\"group2\" color=\"accent\">Accent</mat-radio-button> <mat-radio-button name=\"group2\" color=\"warn\">Warn</mat-radio-button> </section> <h1>Dynamic Example</h1> <section class=\"demo-section\"> <div> <span>isDisabled: {{isDisabled}}</span> <button mat-raised-button (click)=\"isDisabled=!isDisabled\" class=\"demo-button\"> Disable buttons </button> </div> <div> <span>isRequired: {{isRequired}}</span> <button mat-raised-button (click)=\"isRequired=!isRequired\" class=\"demo-button\"> Require buttons </button> </div> <div> <span><mat-checkbox [(ngModel)]=\"isAlignEnd\">Align end</mat-checkbox></span> </div> <mat-radio-group name=\"my_options\" [disabled]=\"isDisabled\" [required]=\"isRequired\" [labelPosition]=\"isAlignEnd ? 'end' : 'start'\"> <mat-radio-button value=\"option_1\">Option 1</mat-radio-button> <mat-radio-button value=\"option_2\">Option 2</mat-radio-button> <mat-radio-button value=\"option_3\">Option 3</mat-radio-button> </mat-radio-group> </section> <h1>Favorite Season Example</h1> <h2>Dynamic Example with two-way data-binding</h2> <section class=\"demo-section\"> <mat-radio-group name=\"more_options\" [(ngModel)]=\"favoriteSeason\"> <mat-radio-button *ngFor=\"let season of seasonOptions\" name=\"more_options\" [value]=\"season\"> {{season}} </mat-radio-button> </mat-radio-group> <p>Your favorite season is: {{favoriteSeason}}</p> </section> ",
            styles: [".demo-button { margin: 8px; text-transform: uppercase; } .demo-section { margin: 8px; padding: 16px; } .demo-section .mat-radio-button { margin: 8px; } "],
        })
    ], RadioDemo);
    return RadioDemo;
}());
exports.RadioDemo = RadioDemo;
//# sourceMappingURL=radio-demo.js.map