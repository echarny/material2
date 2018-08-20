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
var SlideToggleDemo = /** @class */ (function () {
    function SlideToggleDemo() {
    }
    SlideToggleDemo.prototype.onFormSubmit = function () {
        alert("You submitted the form.");
    };
    SlideToggleDemo = __decorate([
        core_1.Component({selector: 'slide-toggle-demo',
            template: "<div class=\"demo-slide-toggle\"> <mat-slide-toggle color=\"primary\" [(ngModel)]=\"firstToggle\"> Default Slide Toggle </mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"firstToggle\" disabled> Disabled Slide Toggle </mat-slide-toggle> <mat-slide-toggle [disabled]=\"firstToggle\"> Disable Bound </mat-slide-toggle> <p>Example where the slide toggle is required inside of a form.</p> <form #form=\"ngForm\" (ngSubmit)=\"onFormSubmit()\" ngNativeValidate> <mat-slide-toggle name=\"slideToggle\" required ngModel> Slide Toggle </mat-slide-toggle> <p> <button mat-raised-button type=\"submit\">Submit Form</button> </p> </form> </div> ",
            styles: [".demo-slide-toggle { display: flex; flex-direction: column; align-items: flex-start; } .demo-slide-toggle mat-slide-toggle { margin: 6px 0; } "],
        })
    ], SlideToggleDemo);
    return SlideToggleDemo;
}());
exports.SlideToggleDemo = SlideToggleDemo;
//# sourceMappingURL=slide-toggle-demo.js.map