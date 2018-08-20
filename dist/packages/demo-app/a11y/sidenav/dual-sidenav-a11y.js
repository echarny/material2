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
var core_1 = require("@angular/core");
var snack_bar_1 = require("@angular/material/snack-bar");
var SidenavDualAccessibilityDemo = /** @class */ (function () {
    function SidenavDualAccessibilityDemo(_snackbar) {
        this._snackbar = _snackbar;
    }
    SidenavDualAccessibilityDemo.prototype.play = function (list) {
        this._snackbar.open("Playing \"" + list + "\"", '', { duration: 1000 });
    };
    SidenavDualAccessibilityDemo = __decorate([
        core_1.Component({selector: 'dual-sidenav-a11y',
            template: "<mat-toolbar color=\"primary\" role=\"header\" aria-label=\"Dual sidenav app\"> <button mat-icon-button aria-label=\"Navigation menu\" (click)=\"startSnav.toggle()\"> <mat-icon aria-hidden=\"true\">menu</mat-icon> </button> <h1 class=\"demo-a11y-sidenav-app-name\">Dual Sidenav App</h1> <span class=\"demo-a11y-sidenav-spacer\" aria-hidden=\"true\"></span> <button mat-icon-button aria-label=\"Playlist menu\" (click)=\"endSnav.toggle()\"> <mat-icon aria-hidden=\"true\">playlist_play</mat-icon> </button> </mat-toolbar> <mat-sidenav-container class=\"demo-a11y-sidenav-container\"> <mat-sidenav #startSnav mode=\"side\" role=\"navigation\"> <mat-nav-list> <a mat-list-item routerLink=\"..\">Home</a> <a mat-list-item routerLink=\"../basic\">Basic sidenav example</a> <a mat-list-item routerLink=\"../mobile\">Responsive sidenav example</a> <a mat-list-item routerLink=\"../dual\">Dual sidenavs example</a> </mat-nav-list> </mat-sidenav> <mat-sidenav-content role=\"region\"> <button mat-raised-button aria-label=\"Close dual sidenav example\" color=\"primary\" class=\"demo-a11y-sidenav-close\" routerLink=\"..\"> Close example </button> </mat-sidenav-content> <mat-sidenav #endSnav mode=\"side\" position=\"end\" class=\"demo-a11y-sidenav-playlist\" role=\"region\" (open)=\"playlist1.focus()\"> <h2 class=\"demo-a11y-sidenav-playlist-header\">Playlists</h2> <button #playlist1 mat-button aria-label=\"Thumbs up playlist\" (click)=\"play('Thumbs up')\"> Thumbs up </button> <button mat-button aria-label=\"Last added playlist\" (click)=\"play('Last added')\"> Last added </button> <button mat-button aria-label=\"Free and purchased playlist\" (click)=\"play('Free and purchased')\"> Free and purchased </button> </mat-sidenav> </mat-sidenav-container> ",
            styles: [".demo-a11y-sidenav-app { display: flex; flex-direction: column; position: absolute; top: 0; bottom: 0; left: 0; right: 0; } .demo-a11y-sidenav-container { flex: 1; } .demo-a11y-sidenav-container-fixed { flex: none; } h1.demo-a11y-sidenav-app-name { margin-left: 8px; } button.demo-a11y-sidenav-close { margin: 20px; } .demo-a11y-sidenav-filler { margin: 100px 20px; }  .demo-a11y-sidenav-spacer { flex: 1; } mat-sidenav.demo-a11y-sidenav-playlist { display: flex; flex-direction: column; width: 200px; } .demo-a11y-sidenav-playlist-header { text-align: center; } "],
            host: { 'class': 'demo-a11y-sidenav-app' },
        }),
        __metadata("design:paramtypes", [snack_bar_1.MatSnackBar])
    ], SidenavDualAccessibilityDemo);
    return SidenavDualAccessibilityDemo;
}());
exports.SidenavDualAccessibilityDemo = SidenavDualAccessibilityDemo;
//# sourceMappingURL=dual-sidenav-a11y.js.map