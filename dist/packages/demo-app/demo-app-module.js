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
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var routes_1 = require("./demo-app/routes");
var demo_app_1 = require("./demo-app/demo-app");
var demo_module_1 = require("./demo-app/demo-module");
var a11y_module_1 = require("./a11y/a11y-module");
var DemoAppModule = /** @class */ (function () {
    function DemoAppModule(_appRef) {
        this._appRef = _appRef;
    }
    DemoAppModule.prototype.ngDoBootstrap = function () {
        this._appRef.bootstrap(demo_app_1.EntryApp);
    };
    DemoAppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                demo_module_1.DemoModule,
                a11y_module_1.AccessibilityDemoModule,
                router_1.RouterModule.forRoot(routes_1.ALL_ROUTES),
            ],
            declarations: [
                demo_app_1.EntryApp,
            ],
            entryComponents: [
                demo_app_1.EntryApp,
            ]
        }),
        __metadata("design:paramtypes", [core_1.ApplicationRef])
    ], DemoAppModule);
    return DemoAppModule;
}());
exports.DemoAppModule = DemoAppModule;
//# sourceMappingURL=demo-app-module.js.map