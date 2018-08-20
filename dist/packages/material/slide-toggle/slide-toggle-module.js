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
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var slide_toggle_1 = require("./slide-toggle");
var MatSlideToggleModule = /** @class */ (function () {
    function MatSlideToggleModule() {
    }
    MatSlideToggleModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatRippleModule, core_2.MatCommonModule, observers_1.ObserversModule],
                    exports: [slide_toggle_1.MatSlideToggle, core_2.MatCommonModule],
                    declarations: [slide_toggle_1.MatSlideToggle],
                    providers: [
                        { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: core_2.GestureConfig }
                    ],
                },] },
    ];
    return MatSlideToggleModule;
}());
exports.MatSlideToggleModule = MatSlideToggleModule;
//# sourceMappingURL=slide-toggle-module.js.map