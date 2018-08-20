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
var layout_1 = require("@angular/cdk/layout");
var core_1 = require("@angular/core");
var ScreenTypeDemo = /** @class */ (function () {
    function ScreenTypeDemo(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset = this.breakpointObserver.observe([layout_1.Breakpoints.HandsetLandscape,
            layout_1.Breakpoints.HandsetPortrait]);
        this.isTablet = this.breakpointObserver.observe(layout_1.Breakpoints.Tablet);
        this.isWeb = this.breakpointObserver.observe([layout_1.Breakpoints.WebLandscape,
            layout_1.Breakpoints.WebPortrait]);
        this.isPortrait = this.breakpointObserver.observe('(orientation: portrait)');
        this.isLandscape = this.breakpointObserver.observe('(orientation: landscape)');
    }
    ScreenTypeDemo = __decorate([
        core_1.Component({selector: 'screen-type',
            template: "<h2>Screen Type</h2> <mat-grid-list cols=\"6\" rowHeight=\"1:2\"> <mat-grid-tile [class.active]=\"(isHandset | async)?.matches\" colspan=\"2\"> <mat-icon>smartphone</mat-icon> <p>Handset</p> </mat-grid-tile> <mat-grid-tile [class.active]=\"(isTablet | async)?.matches\" colspan=\"2\"> <mat-icon>tablet_android</mat-icon> <p>Tablet</p> </mat-grid-tile> <mat-grid-tile [class.active]=\"(isWeb | async)?.matches\" colspan=\"2\"> <mat-icon>laptop</mat-icon> <p>Web</p> </mat-grid-tile> <mat-grid-tile [class.active]=\"(isPortrait | async)?.matches\" colspan=\"3\"> <mat-icon>stay_current_portrait</mat-icon> <p>Portrait</p> </mat-grid-tile> <mat-grid-tile [class.active]=\"(isLandscape | async)?.matches\" colspan=\"3\"> <mat-icon>stay_current_landscape</mat-icon> <p>Landscape</p> </mat-grid-tile> </mat-grid-list> ",
            styles: [".mat-grid-list { max-width: 700px; margin: 0 auto; min-width: 400px; } .mat-grid-tile { outline: 1px solid lightgray; } .mat-grid-tile .mat-figure { flex-direction: column; } .mat-grid-tile.active { background: rgba(0, 0, 0, 0.12); } h2 { max-width: 700px; min-width: 400px; text-align: center; margin: 15px auto; } "],
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver])
    ], ScreenTypeDemo);
    return ScreenTypeDemo;
}());
exports.ScreenTypeDemo = ScreenTypeDemo;
//# sourceMappingURL=screen-type-demo.js.map