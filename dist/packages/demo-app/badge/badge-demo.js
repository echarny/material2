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
var BadgeDemo = /** @class */ (function () {
    function BadgeDemo() {
        this.visible = true;
        this.badgeContent = '0';
    }
    BadgeDemo = __decorate([
        core_1.Component({selector: 'badge-demo',
            template: "<div> <div class=\"demo-badge\"> <h3>Text</h3> <span [matBadge]=\"badgeContent\" matBadgeOverlap=\"false\" *ngIf=\"visible\"> Hello </span> <span [matBadge]=\"11111\" matBadgeOverlap=\"false\"> Hello </span> <span matBadge=\"22\" matBadgeOverlap=\"false\" matBadgePosition=\"below after\" matBadgeColor=\"accent\"> Hello </span> <span matBadge=\"22\" matBadgeOverlap=\"false\" matBadgePosition=\"above before\" matBadgeColor=\"warn\"> Hello </span> <span matBadge=\"⚡️\" matBadgeOverlap=\"false\" matBadgePosition=\"below before\"> Hello </span> <span [matBadge]=\"badgeContent\" matBadgeDescription=\"I've got {{badgeContent}} problems\"> Aria </span> <span [matBadge]=\"badgeContent\" matBadgeHidden=\"true\"> Hidden </span> <input type=\"text\" [(ngModel)]=\"badgeContent\" /> <button (click)=\"visible = !visible\">Toggle</button> </div> <div class=\"demo-badge\"> <h3>Buttons</h3> <button mat-raised-button [matBadge]=\"badgeContent\"> <mat-icon color=\"primary\">home</mat-icon> </button> <button mat-raised-button matBadge=\"22\" matBadgePosition=\"below after\" color=\"primary\" matBadgeColor=\"accent\"> <mat-icon color=\"accent\">home</mat-icon> </button> <button mat-raised-button matBadge=\"22\" matBadgePosition=\"above before\"> <mat-icon color=\"primary\">home</mat-icon> </button> <button mat-raised-button matBadge=\"22\" matBadgePosition=\"below before\"> <mat-icon color=\"primary\">home</mat-icon> </button> <button mat-raised-button> <mat-icon color=\"primary\" matBadge=\"22\" color=\"accent\">home</mat-icon> </button> </div> <div class=\"demo-badge\"> <h3>Icons</h3> <mat-icon [matBadge]=\"badgeContent\"> home </mat-icon> <mat-icon color=\"primary\" matBadge=\"22\" matBadgePosition=\"below after\" matBadgeColor=\"accent\"> home </mat-icon> <mat-icon color=\"primary\" matBadge=\"22\" matBadgePosition=\"above before\" matBadgeColor=\"warn\"> home </mat-icon> <mat-icon color=\"primary\" matBadge=\"22\" matBadgePosition=\"below before\"> home </mat-icon> </div> <div class=\"demo-badge\"> <h3>Size</h3> <mat-icon [matBadge]=\"badgeContent\" matBadgeSize=\"small\"> home </mat-icon> <mat-icon [matBadge]=\"badgeContent\" matBadgeSize=\"large\"> home </mat-icon> </div> </div> ",
            styles: [".demo-badge { margin-bottom: 25px; } .mat-badge { margin-right: 22px; } [dir='rtl'] .mat-badge { margin-right: 0; margin-left: 22px; } "],
        })
    ], BadgeDemo);
    return BadgeDemo;
}());
exports.BadgeDemo = BadgeDemo;
//# sourceMappingURL=badge-demo.js.map