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
var SidenavMobileAccessibilityDemo = /** @class */ (function () {
    function SidenavMobileAccessibilityDemo(changeDetectorRef, media) {
        this.filler = Array(20).fill(0);
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    SidenavMobileAccessibilityDemo.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    SidenavMobileAccessibilityDemo = __decorate([
        core_1.Component({selector: 'mobile-sidenav-a11y',
            template: "<mat-toolbar color=\"primary\" role=\"header\" aria-label=\"Responsive sidenav app\" [class.demo-a11y-sidenav-header-fixed]=\"mobileQuery.matches\"> <button mat-icon-button aria-label=\"Navigation menu\" (click)=\"snav.toggle()\"> <mat-icon aria-hidden=\"true\">menu</mat-icon> </button> <h1 class=\"demo-a11y-sidenav-app-name\">Responsive Sidenav App</h1> </mat-toolbar> <mat-sidenav-container class=\"demo-a11y-sidenav-container\" [class.demo-a11y-sidenav-container-fixed]=\"mobileQuery.matches\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\"> <mat-sidenav #snav role=\"navigation\" [mode]=\"mobileQuery.matches ? 'over' : 'side'\" [fixedInViewport]=\"mobileQuery.matches\"> <mat-nav-list> <a mat-list-item routerLink=\"..\">Home</a> <a mat-list-item routerLink=\"../basic\">Basic sidenav example</a> <a mat-list-item routerLink=\"../mobile\">Responsive sidenav example</a> <a mat-list-item routerLink=\"../dual\">Dual sidenavs example</a> </mat-nav-list> <p class=\"demo-a11y-sidenav-filler\" *ngFor=\"let f of filler\">Filler content</p> </mat-sidenav> <mat-sidenav-content role=\"region\"> <button mat-raised-button aria-label=\"Close responsive sidenav example\" color=\"primary\" class=\"demo-a11y-sidenav-close\" routerLink=\"..\"> Close example </button> <p class=\"demo-a11y-sidenav-filler\" *ngFor=\"let f of filler\">Filler content</p> </mat-sidenav-content> </mat-sidenav-container> ",
            styles: [".demo-a11y-sidenav-app { display: flex; flex-direction: column; position: absolute; top: 0; bottom: 0; left: 0; right: 0; } .demo-a11y-sidenav-container { flex: 1; } .demo-a11y-sidenav-container-fixed { flex: none; } h1.demo-a11y-sidenav-app-name { margin-left: 8px; } button.demo-a11y-sidenav-close { margin: 20px; } .demo-a11y-sidenav-filler { margin: 100px 20px; }  .demo-a11y-sidenav-header-fixed { position: fixed; z-index: 2; } "],
            host: { 'class': 'demo-a11y-sidenav-app' },
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, layout_1.MediaMatcher])
    ], SidenavMobileAccessibilityDemo);
    return SidenavMobileAccessibilityDemo;
}());
exports.SidenavMobileAccessibilityDemo = SidenavMobileAccessibilityDemo;
//# sourceMappingURL=mobile-sidenav-a11y.js.map