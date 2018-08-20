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
var DrawerDemo = /** @class */ (function () {
    function DrawerDemo() {
        this.invert = false;
    }
    DrawerDemo = __decorate([
        core_1.Component({selector: 'drawer-demo',
            template: "<h2>Basic Use Case</h2> <mat-drawer-container class=\"demo-drawer-container\"> <mat-drawer #start (opened)=\"myinput.focus()\" mode=\"side\"> Start Side Drawer <br> <button mat-button (click)=\"start.close()\">Close</button> <br> <button mat-button (click)=\"end.open()\">Open End Side</button> <br> <button mat-button (click)=\"start.mode = (start.mode === 'push' ? 'over' : (start.mode === 'over' ? 'side' : 'push'))\">Toggle Mode</button> <div>Mode: {{start.mode}}</div> <br> <input #myinput> </mat-drawer> <mat-drawer #end position=\"end\"> End Side Drawer <br> <button mat-button (click)=\"end.close()\">Close</button> </mat-drawer> <div class=\"demo-drawer-content\"> <h1>My Content</h1> <div> <header>Drawer</header> <button mat-button (click)=\"start.toggle()\">Toggle Start Side Drawer</button> <button mat-button (click)=\"end.toggle()\">Toggle End Side Drawer</button> </div> <button mat-button>HELLO</button> <button mat-raised-button class=\"mat-primary\">HELLO</button> <button mat-fab class=\"mat-accent\">HI</button> </div> </mat-drawer-container> <h2>Drawer Already Opened</h2> <mat-drawer-container class=\"demo-drawer-container\"> <mat-drawer #start2 opened mode=\"side\"> Drawer </mat-drawer> <div class=\"demo-drawer-content\"> <button mat-button (click)=\"start2.toggle()\">Toggle Start Side Drawer</button> </div> </mat-drawer-container> <h2>Dynamic Position Drawer</h2> <mat-drawer-container class=\"demo-drawer-container\"> <mat-drawer #dynamicPosDrawer1 mode=\"side\" [position]=\"invert ? 'end' : 'start'\">Start</mat-drawer> <mat-drawer #dynamicPosDrawer2 mode=\"side\" [position]=\"invert ? 'start' : 'end'\">End</mat-drawer> <div class=\"demo-drawer-content\"> <button (click)=\"dynamicPosDrawer1.toggle(); dynamicPosDrawer2.toggle()\"> Toggle drawers </button> <button (click)=\"invert = !invert\">Change sides</button> </div> </mat-drawer-container> <h2>Drawer with focus attributes</h2> <mat-drawer-container class=\"demo-drawer-container\"> <mat-drawer #focusDrawer> <mat-nav-list> <a mat-list-item routerLink>Link</a> <a mat-list-item routerLink cdkFocusRegionStart>Focus region start</a> <a mat-list-item routerLink>Link</a> <a mat-list-item routerLink cdkFocusInitial>Initially focused</a> <a mat-list-item routerLink cdkFocusRegionEnd>Focus region end</a> <a mat-list-item routerLink>Link</a> </mat-nav-list> </mat-drawer> <div class=\"demo-drawer-content\"> <h1>My Content</h1> <div> <header>Drawer</header> <button mat-button (click)=\"focusDrawer.toggle()\">Toggle Drawer</button> </div> </div> </mat-drawer-container> ",
            styles: [".demo-drawer-container { border: 3px solid black; } .demo-drawer-content { padding: 15px; } "],
        })
    ], DrawerDemo);
    return DrawerDemo;
}());
exports.DrawerDemo = DrawerDemo;
//# sourceMappingURL=drawer-demo.js.map