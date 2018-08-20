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
var overlay_1 = require("@angular/cdk/overlay");
var core_1 = require("@angular/core");
/**
 * The entry app for demo site. Routes under `accessibility` will use AccessibilityDemo component,
 * while other demos will use `DemoApp` component. Since DemoApp and AccessibilityDemo use
 * different templates (DemoApp has toolbar and sidenav), we use this EntryApp in index.html
 * as our entry point.
 */
var EntryApp = /** @class */ (function () {
    function EntryApp() {
    }
    EntryApp = __decorate([
        core_1.Component({selector: 'entry-app',
            template: '<router-outlet></router-outlet>',
        })
    ], EntryApp);
    return EntryApp;
}());
exports.EntryApp = EntryApp;
/**
 * Home component for welcome message in DemoApp.
 */
var Home = /** @class */ (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <p>Welcome to the development demos for Angular Material!</p>\n    <p>Open the sidenav to select a demo.</p>\n  ",
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
/**
 * DemoApp with toolbar and sidenav.
 */
var DemoApp = /** @class */ (function () {
    function DemoApp(_element, _overlayContainer) {
        this._element = _element;
        this._overlayContainer = _overlayContainer;
        this.dark = false;
        this.navItems = [
            { name: 'Examples', route: '/examples' },
            { name: 'Autocomplete', route: '/autocomplete' },
            { name: 'Badge', route: '/badge' },
            { name: 'Bottom sheet', route: '/bottom-sheet' },
            { name: 'Button Toggle', route: '/button-toggle' },
            { name: 'Button', route: '/button' },
            { name: 'Card', route: '/card' },
            { name: 'Chips', route: '/chips' },
            { name: 'Connected Overlay', route: '/connected-overlay' },
            { name: 'Checkbox', route: '/checkbox' },
            { name: 'Chips', route: '/chips' },
            { name: 'Datepicker', route: '/datepicker' },
            { name: 'Dialog', route: '/dialog' },
            { name: 'Drawer', route: '/drawer' },
            { name: 'Drag and Drop', route: '/drag-drop' },
            { name: 'Expansion Panel', route: '/expansion' },
            { name: 'Focus Origin', route: '/focus-origin' },
            { name: 'Gestures', route: '/gestures' },
            { name: 'Grid List', route: '/grid-list' },
            { name: 'Icon', route: '/icon' },
            { name: 'Input', route: '/input' },
            { name: 'List', route: '/list' },
            { name: 'Live Announcer', route: '/live-announcer' },
            { name: 'Menu', route: '/menu' },
            { name: 'Paginator', route: '/paginator' },
            { name: 'Platform', route: '/platform' },
            { name: 'Portal', route: '/portal' },
            { name: 'Progress Bar', route: '/progress-bar' },
            { name: 'Progress Spinner', route: '/progress-spinner' },
            { name: 'Radio', route: '/radio' },
            { name: 'Ripple', route: '/ripple' },
            { name: 'Screen Type', route: '/screen-type' },
            { name: 'Select', route: '/select' },
            { name: 'Sidenav', route: '/sidenav' },
            { name: 'Slide Toggle', route: '/slide-toggle' },
            { name: 'Slider', route: '/slider' },
            { name: 'Snack Bar', route: '/snack-bar' },
            { name: 'Stepper', route: '/stepper' },
            { name: 'Table', route: '/table' },
            { name: 'Tabs', route: '/tabs' },
            { name: 'Toolbar', route: '/toolbar' },
            { name: 'Tooltip', route: '/tooltip' },
            { name: 'Tree', route: '/tree' },
            { name: 'Typography', route: '/typography' },
            { name: 'Virtual Scrolling', route: '/virtual-scroll' },
        ];
    }
    DemoApp.prototype.toggleFullscreen = function () {
        var elem = this._element.nativeElement.querySelector('.demo-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    };
    DemoApp.prototype.toggleTheme = function () {
        var darkThemeClass = 'unicorn-dark-theme';
        this.dark = !this.dark;
        if (this.dark) {
            this._element.nativeElement.classList.add(darkThemeClass);
            this._overlayContainer.getContainerElement().classList.add(darkThemeClass);
        }
        else {
            this._element.nativeElement.classList.remove(darkThemeClass);
            this._overlayContainer.getContainerElement().classList.remove(darkThemeClass);
        }
    };
    DemoApp = __decorate([
        core_1.Component({selector: 'demo-app',
            template: "<mat-sidenav-container class=\"demo-container\"> <mat-sidenav #start> <mat-nav-list> <a *ngFor=\"let navItem of navItems\" mat-list-item (click)=\"start.close()\" routerLinkActive #routerLinkActiveInstance=\"routerLinkActive\" [attr.tabindex]=\"routerLinkActiveInstance.isActive ? 0 : -1\" [routerLink]=\"[navItem.route]\"> {{navItem.name}} </a> <hr> <a mat-list-item tabindex=\"-1\" (click)=\"start.close()\" [routerLink]=\"['/baseline']\"> Baseline </a> </mat-nav-list> <button mat-button tabindex=\"-1\" (click)=\"start.close()\">CLOSE</button> </mat-sidenav> <div> <mat-toolbar color=\"primary\"> <button mat-icon-button (click)=\"start.open('mouse')\"> <mat-icon>menu</mat-icon> </button> <div class=\"demo-toolbar\"> <h1>Angular Material Demos</h1> <div> <button mat-icon-button (click)=\"toggleFullscreen()\" title=\"Toggle fullscreen\"> <mat-icon>fullscreen</mat-icon> </button> <button mat-button (click)=\"toggleTheme()\">{{dark ? 'Light' : 'Dark'}} theme</button> <button mat-button (click)=\"root.dir = (root.dir === 'rtl' ? 'ltr' : 'rtl')\" title=\"Toggle between RTL and LTR\"> {{root.dir.toUpperCase()}} </button> </div> </div> </mat-toolbar> <div #root=\"dir\" dir=\"ltr\" class=\"demo-content\"> <router-outlet></router-outlet> </div> </div> </mat-sidenav-container> ",
            styles: ["html, body { width: 100%; height: 100%; } body { font-family: Roboto, 'Helvetica Neue', sans-serif; margin: 0; } body * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } body .mat-sidenav { min-width: 15vw; position: fixed; } body .mat-sidenav .mat-button { width: 100%; position: relative; bottom: 0; margin: 24px 0; } body .demo-content { padding: 32px; box-sizing: border-box; } body .mat-toolbar .mat-icon { cursor: pointer; } body .mat-toolbar .demo-toolbar { display: flex; justify-content: space-between; align-items: center; width: 100%; } body h1 { font-size: 20px; } .demo-content { width: 100%; height: 100%; box-sizing: border-box; } .demo-container { min-width: 100%; min-height: 100%; } "],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            overlay_1.OverlayContainer])
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;
//# sourceMappingURL=demo-app.js.map