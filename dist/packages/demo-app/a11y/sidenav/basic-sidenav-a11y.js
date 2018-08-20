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
var SidenavBasicAccessibilityDemo = /** @class */ (function () {
    function SidenavBasicAccessibilityDemo() {
    }
    SidenavBasicAccessibilityDemo = __decorate([
        core_1.Component({selector: 'basic-sidenav-a11y',
            template: "<mat-toolbar color=\"primary\" role=\"header\" aria-label=\"Basic sidenav app\"> <button mat-icon-button aria-label=\"Navigation menu\" (click)=\"snav.toggle()\"> <mat-icon aria-hidden=\"true\">menu</mat-icon> </button> <h1 class=\"demo-a11y-sidenav-app-name\">Basic Sidenav App</h1> </mat-toolbar> <mat-sidenav-container class=\"demo-a11y-sidenav-container\"> <mat-sidenav #snav mode=\"side\" role=\"navigation\"> <mat-nav-list> <a mat-list-item routerLink=\"..\">Home</a> <a mat-list-item routerLink=\"../basic\">Basic sidenav example</a> <a mat-list-item routerLink=\"../mobile\">Responsive sidenav example</a> <a mat-list-item routerLink=\"../dual\">Dual sidenavs example</a> </mat-nav-list> </mat-sidenav> <mat-sidenav-content role=\"region\"> <button mat-raised-button aria-label=\"Close basic sidenav example\" color=\"primary\" class=\"demo-a11y-sidenav-close\" routerLink=\"..\"> Close example </button> </mat-sidenav-content> </mat-sidenav-container> ",
            styles: [".demo-a11y-sidenav-app { display: flex; flex-direction: column; position: absolute; top: 0; bottom: 0; left: 0; right: 0; } .demo-a11y-sidenav-container { flex: 1; } .demo-a11y-sidenav-container-fixed { flex: none; } h1.demo-a11y-sidenav-app-name { margin-left: 8px; } button.demo-a11y-sidenav-close { margin: 20px; } .demo-a11y-sidenav-filler { margin: 100px 20px; } "],
            host: { 'class': 'demo-a11y-sidenav-app' },
        })
    ], SidenavBasicAccessibilityDemo);
    return SidenavBasicAccessibilityDemo;
}());
exports.SidenavBasicAccessibilityDemo = SidenavBasicAccessibilityDemo;
//# sourceMappingURL=basic-sidenav-a11y.js.map