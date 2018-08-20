"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var platform_1 = require("@angular/cdk/platform");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var focus_monitor_1 = require("./focus-monitor/focus-monitor");
var focus_trap_1 = require("./focus-trap/focus-trap");
var live_announcer_1 = require("./live-announcer/live-announcer");
var A11yModule = /** @class */ (function () {
    function A11yModule() {
    }
    A11yModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, platform_1.PlatformModule, observers_1.ObserversModule],
                    declarations: [live_announcer_1.CdkAriaLive, focus_trap_1.CdkTrapFocus, focus_monitor_1.CdkMonitorFocus],
                    exports: [live_announcer_1.CdkAriaLive, focus_trap_1.CdkTrapFocus, focus_monitor_1.CdkMonitorFocus],
                },] },
    ];
    return A11yModule;
}());
exports.A11yModule = A11yModule;
//# sourceMappingURL=a11y-module.js.map