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
var ToolbarAccessibilityDemo = /** @class */ (function () {
    function ToolbarAccessibilityDemo() {
    }
    ToolbarAccessibilityDemo = __decorate([
        core_1.Component({selector: 'toolbar-a11y',
            template: "<div class=\"demo-toolbar\"> <section> <h2>Basic Toolbar with Text  (e.g. Only display app’s name)</h2> <mat-toolbar role=\"heading\"> <h1>My App</h1> </mat-toolbar> <p>Hello World!</p> </section> <section> <h2>Multiple Lines Toolbar</h2> <mat-toolbar> <h1>Settings</h1> </mat-toolbar> <mat-toolbar> <h1>Profile</h1> </mat-toolbar> <p>My profile</p> </section> <section> <h2>Toolbar with favorite icon</h2> <mat-toolbar> <h1>My App</h1> <span class=\"demo-spacer\"></span> <button mat-button> <mat-icon aria-label=\"favorite\">favorite</mat-icon> </button> </mat-toolbar> <p>Hello World!</p> </section> <section> <h2>Toolbar colors</h2> <mat-toolbar color=\"primary\"> <h1>My App</h1> </mat-toolbar> <p>Hello World!</p> </section> </div> ",
            styles: [".demo-button button, .demo-button a { margin: 8px; text-transform: uppercase; } .demo-button section { display: flex; align-items: center; margin: 8px; } .demo-button p { padding: 5px 15px; } .demo-spacer { flex: 1 1 auto; } "],
        })
    ], ToolbarAccessibilityDemo);
    return ToolbarAccessibilityDemo;
}());
exports.ToolbarAccessibilityDemo = ToolbarAccessibilityDemo;
//# sourceMappingURL=toolbar-a11y.js.map