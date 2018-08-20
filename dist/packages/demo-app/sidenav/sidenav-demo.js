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
var SidenavDemo = /** @class */ (function () {
    function SidenavDemo() {
        this.isLaunched = false;
        this.fillerContent = Array(30);
        this.fixed = false;
        this.coverHeader = false;
        this.showHeader = false;
        this.showFooter = false;
        this.modeIndex = 0;
    }
    Object.defineProperty(SidenavDemo.prototype, "mode", {
        get: function () { return ['side', 'over', 'push'][this.modeIndex]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavDemo.prototype, "fixedTop", {
        get: function () { return this.fixed && this.showHeader && !this.coverHeader ? 64 : 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavDemo.prototype, "fixedBottom", {
        get: function () { return this.fixed && this.showFooter && !this.coverHeader ? 64 : 0; },
        enumerable: true,
        configurable: true
    });
    SidenavDemo = __decorate([
        core_1.Component({selector: 'sidenav-demo',
            template: "<button mat-raised-button (click)=\"isLaunched = true\" *ngIf=\"!isLaunched\" color=\"primary\"> Launch Fullscreen Sidenav Demo </button> <div class=\"demo-sidenav-area\" *ngIf=\"isLaunched\"> <mat-toolbar *ngIf=\"showHeader && !coverHeader\">Header</mat-toolbar> <mat-sidenav-container [hasBackdrop]=\"hasBackdrop\"> <mat-sidenav #start (opened)=\"myinput.focus()\" [mode]=\"mode\" [fixedInViewport]=\"fixed\" [fixedTopGap]=\"fixedTop\" [fixedBottomGap]=\"fixedBottom\"> Start Side Sidenav <br> <button mat-button (click)=\"start.close()\">Close</button> <br> <button mat-button (click)=\"end.open('keyboard')\">Open End Side</button> <br> <button mat-button (click)=\"modeIndex = (modeIndex + 1) % 3\">Toggle Mode</button> <div>Mode: {{start.mode}}</div> <br> <input #myinput> <div class=\"demo-filler-content\" *ngFor=\"let c of fillerContent\">Filler Content</div> </mat-sidenav> <mat-sidenav #end position=\"end\" [fixedInViewport]=\"fixed\" [fixedTopGap]=\"fixedTop\" [fixedBottomGap]=\"fixedBottom\"> End Side Sidenav <br> <button mat-button (click)=\"end.close()\">Close</button> <div class=\"demo-filler-content\" *ngFor=\"let c of fillerContent\">Filler Content</div> </mat-sidenav> <mat-sidenav-content> <mat-toolbar *ngIf=\"showHeader && coverHeader\">Header</mat-toolbar> <div class=\"demo-sidenav-content\"> <div> <button mat-raised-button (click)=\"isLaunched = false\"> Exit Fullscreen Sidenav Demo </button> </div> <div> <h3>Sidenav</h3> <button mat-button (click)=\"start.toggle(undefined, 'mouse')\">Toggle Start Side Sidenav</button> <button mat-button (click)=\"end.toggle(undefined, 'mouse')\">Toggle End Side Sidenav</button> <mat-checkbox [(ngModel)]=\"hasBackdrop\">Has backdrop</mat-checkbox> <mat-checkbox [(ngModel)]=\"fixed\">Fixed mode</mat-checkbox> <mat-checkbox [(ngModel)]=\"coverHeader\">Sidenav covers header/footer</mat-checkbox> </div> <div> <h3>Header / Footer</h3> <mat-checkbox [(ngModel)]=\"showHeader\">Show header</mat-checkbox> <mat-checkbox [(ngModel)]=\"showFooter\">Show footer</mat-checkbox> </div> <div class=\"demo-filler-content\" *ngFor=\"let c of fillerContent\">Filler Content</div> </div> <mat-toolbar *ngIf=\"showFooter && coverHeader\">Footer</mat-toolbar> </mat-sidenav-content> </mat-sidenav-container> <mat-toolbar *ngIf=\"showFooter && !coverHeader\">Footer</mat-toolbar> </div> ",
            styles: [".demo-sidenav-area { position: fixed; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; } .demo-sidenav-area .mat-toolbar { flex: 0; } .demo-sidenav-area .mat-sidenav-container { flex: 1; } .demo-sidenav-area .demo-sidenav-content { padding: 32px; } .demo-sidenav-area .demo-filler-content { padding: 60px; } "],
        })
    ], SidenavDemo);
    return SidenavDemo;
}());
exports.SidenavDemo = SidenavDemo;
//# sourceMappingURL=sidenav-demo.js.map