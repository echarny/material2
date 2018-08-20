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
var MenuAccessibilityDemo = /** @class */ (function () {
    function MenuAccessibilityDemo() {
    }
    MenuAccessibilityDemo = __decorate([
        core_1.Component({selector: 'menu-a11y',
            template: "<div class=\"demo-menu\"> <section> <h2>Icon Trigger</h2> <mat-menu #menu1=\"matMenu\"> <button mat-menu-item> Settings </button> <button mat-menu-item> Help </button> </mat-menu> <button mat-icon-button [matMenuTriggerFor]=\"menu1\" aria-label=\"Open Menu\"> <mat-icon>more_vert</mat-icon> </button> </section> <section> <h2>Menu with Icons</h2> <button mat-icon-button [matMenuTriggerFor]=\"menu2\" aria-label=\"Open Menu\"> <mat-icon>more_vert</mat-icon> </button> <mat-menu #menu2=\"matMenu\"> <button mat-menu-item> <mat-icon>dialpad</mat-icon> <span>Redial</span> </button> <button mat-menu-item> <mat-icon>voicemail</mat-icon> <span>Check voicemail</span> </button> <button mat-menu-item> <mat-icon>notifications_off</mat-icon> <span>Disable alerts</span> </button> </mat-menu> </section> <section> <h2>Menu with links</h2> <button mat-icon-button [matMenuTriggerFor]=\"menu2\" aria-label=\"Learn more about Angular\"> <mat-icon>more_vert</mat-icon> </button> <mat-menu #menu2=\"matMenu\"> <a href=\"http://angular.io\" mat-menu-item> Angular </a> <a href=\"http://material.angular.io\" mat-menu-item> Angular Material </a> </mat-menu> </section> </div> ",
            styles: [".demo-menu section { display: flex; align-items: center; margin: 8px; } .demo-menu p { padding: 5px 15px; } "],
        })
    ], MenuAccessibilityDemo);
    return MenuAccessibilityDemo;
}());
exports.MenuAccessibilityDemo = MenuAccessibilityDemo;
//# sourceMappingURL=menu-a11y.js.map