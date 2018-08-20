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
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var AccessibilityHome = /** @class */ (function () {
    function AccessibilityHome() {
    }
    AccessibilityHome = __decorate([
        core_1.Component({selector: 'accessibility-home',
            template: "<p>Welcome to the accessibility demos for Angular Material!</p>",
        })
    ], AccessibilityHome);
    return AccessibilityHome;
}());
exports.AccessibilityHome = AccessibilityHome;
var AccessibilityDemo = /** @class */ (function () {
    function AccessibilityDemo(router) {
        var _this = this;
        this.currentComponent = '';
        this.fullscreen = false;
        this._routerSubscription = rxjs_1.Subscription.EMPTY;
        this.navItems = [
            { name: 'Home', route: '.' },
            { name: 'Autocomplete', route: 'autocomplete' },
            { name: 'Button toggle', route: 'button-toggle' },
            { name: 'Button', route: 'button' },
            { name: 'Card', route: 'card' },
            { name: 'Checkbox', route: 'checkbox' },
            { name: 'Chips', route: 'chips' },
            { name: 'Datepicker', route: 'datepicker' },
            { name: 'Dialog', route: 'dialog' },
            { name: 'Expansion panel', route: 'expansion' },
            { name: 'Grid list', route: 'grid-list' },
            { name: 'Icon', route: 'icon' },
            { name: 'Input', route: 'input' },
            { name: 'List', route: 'list' },
            { name: 'Menu', route: 'menu' },
            { name: 'Progress bar', route: 'progress-bar' },
            { name: 'Progress spinner', route: 'progress-spinner' },
            { name: 'Radio buttons', route: 'radio' },
            { name: 'Select', route: 'select' },
            { name: 'Sidenav', route: 'sidenav' },
            { name: 'Slide toggle', route: 'slide-toggle' },
            { name: 'Slider', route: 'slider' },
            { name: 'Snack bar', route: 'snack-bar' },
            { name: 'Table', route: 'table' },
            { name: 'Tabs', route: 'tabs' },
            { name: 'Toolbar', route: 'toolbar' },
            { name: 'Tooltip', route: 'tooltip' },
        ];
        this._routerSubscription = router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationEnd) {
                var fragments_1 = e.url.split('/');
                var nav = _this.navItems.find(function (navItem) {
                    return fragments_1[fragments_1.length - 1] === navItem.route;
                });
                _this.currentComponent = nav ? nav.name : '';
                var routerState = router.routerState.root;
                while (routerState.children.length) {
                    routerState = routerState.children[0];
                }
                _this.fullscreen = !!routerState.snapshot.data.fullscreen;
            }
        });
    }
    AccessibilityDemo.prototype.skipNavigation = function () {
        (this.currentComponent ? this.sectionHeader : this.mainContent).nativeElement.focus();
    };
    AccessibilityDemo.prototype.ngOnDestroy = function () {
        this._routerSubscription.unsubscribe();
    };
    __decorate([
        core_1.ViewChild('maincontent'),
        __metadata("design:type", core_1.ElementRef)
    ], AccessibilityDemo.prototype, "mainContent", void 0);
    __decorate([
        core_1.ViewChild('header'),
        __metadata("design:type", core_1.ElementRef)
    ], AccessibilityDemo.prototype, "sectionHeader", void 0);
    AccessibilityDemo = __decorate([
        core_1.Component({selector: 'accessibility-demo',
            template: "<ng-container *ngIf=\"!fullscreen\"> <h1> Accessibility Demo </h1> <nav> <a (click)=\"skipNavigation()\" href=\"javascript:void(0)\">Skip navigation</a> <a *ngFor=\"let navItem of navItems\" [routerLink]=\"[navItem.route]\" (click)=\"skipNavigation()\"> {{navItem.name}} </a> </nav> </ng-container> <div #maincontent tabindex=\"-1\"> <h1 #header tabindex=\"-1\" *ngIf=\"!!currentComponent\">{{currentComponent}} Demo</h1> <router-outlet></router-outlet> </div> ",
            styles: ["body { font-family: Roboto, 'Helvetica Neue', sans-serif; } body * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } body h1 { font-size: 20px; } body ul, body li { list-style: none; } body nav a { margin: 2px; } "],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AccessibilityDemo);
    return AccessibilityDemo;
}());
exports.AccessibilityDemo = AccessibilityDemo;
//# sourceMappingURL=a11y.js.map