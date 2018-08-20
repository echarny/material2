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
var BaselineDemo = /** @class */ (function () {
    function BaselineDemo() {
    }
    BaselineDemo = __decorate([
        core_1.Component({selector: 'baseline-demo',
            template: "<mat-card class=\"demo-card demo-basic\"> <mat-toolbar color=\"primary\">Basic Forms</mat-toolbar> <mat-card-content> Text Before | <mat-checkbox>Checkbox Label</mat-checkbox> | Text 1 | <mat-radio-button value=\"option_1\">Radio 1</mat-radio-button> | Text 2 | <mat-radio-button value=\"option_2\">Radio 2</mat-radio-button> | Text 3 | <mat-radio-button value=\"option_3\">Radio 3</mat-radio-button> | Text 4 | <mat-form-field> <mat-label>Input</mat-label> <input matInput value=\"Text Input\"> </mat-form-field> | Text 5 | <mat-form-field> <mat-label>This label is really really really long</mat-label> <mat-select> <mat-option value=\"option\">Option</mat-option> <mat-option value=\"long\">This option is really really really long</mat-option> </mat-select> </mat-form-field> | Text 6 | <mat-form-field> <mat-label>Input</mat-label> <textarea matInput cdkTextareaAutosize>Textarea&#10;Line 2</textarea> </mat-form-field> | Text After </mat-card-content> </mat-card> <mat-card class=\"demo-card demo-basic\"> <mat-toolbar color=\"primary\">Headers</mat-toolbar> <mat-card-content> <h1> Text Before | <mat-checkbox>Checkbox Label</mat-checkbox> | Text 1 | <mat-radio-button value=\"option_1\">Radio 1</mat-radio-button> | Text 2 | <mat-radio-button value=\"option_2\">Radio 2</mat-radio-button> | Text 3 | <mat-radio-button value=\"option_3\">Radio 3</mat-radio-button> | Text 4 | <mat-form-field> <mat-label>Input</mat-label> <input matInput value=\"Text Input\"> </mat-form-field> | Text 5 | <mat-form-field> <mat-label>This label is really really really long</mat-label> <mat-select> <mat-option value=\"option\">Option</mat-option> <mat-option value=\"long\">This option is really really really long</mat-option> </mat-select> </mat-form-field> | Text 6 | <mat-form-field> <mat-label>Input</mat-label> <textarea matInput cdkTextareaAutosize>Textarea&#10;Line 2</textarea> </mat-form-field> | Text After </h1> </mat-card-content> </mat-card> ",
            styles: [".demo-basic { padding: 0; } .demo-basic .mat-card-content { padding: 16px; } .demo-full-width { width: 100%; } .demo-card { margin: 16px; } "],
        })
    ], BaselineDemo);
    return BaselineDemo;
}());
exports.BaselineDemo = BaselineDemo;
//# sourceMappingURL=baseline-demo.js.map