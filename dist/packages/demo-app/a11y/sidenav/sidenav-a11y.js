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
var SidenavAccessibilityDemo = /** @class */ (function () {
    function SidenavAccessibilityDemo() {
    }
    SidenavAccessibilityDemo = __decorate([
        core_1.Component({selector: 'sidenav-a11y',
            template: "<section> <h2>Basic sidenav (e.g. desktop app with hamburger menu)</h2> <a mat-raised-button aria-label=\"View basic sidenav example\" color=\"primary\" routerLink=\"basic\"> View example </a> </section> <section> <h2>Mobile sidenav (e.g. responsive design hamburger menu)</h2> <a mat-raised-button aria-label=\"View mobile sidenav example\" color=\"primary\" routerLink=\"mobile\"> View example </a> </section> <section> <h2>Dual sidenavs (e.g. music app with hamburger menu and playlist sidenav)</h2> <a mat-raised-button aria-label=\"View dual sidenav example\" color=\"primary\" routerLink=\"dual\"> View example </a> </section> ",
        })
    ], SidenavAccessibilityDemo);
    return SidenavAccessibilityDemo;
}());
exports.SidenavAccessibilityDemo = SidenavAccessibilityDemo;
//# sourceMappingURL=sidenav-a11y.js.map