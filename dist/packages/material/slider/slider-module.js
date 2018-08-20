"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var slider_1 = require("./slider");
var MatSliderModule = /** @class */ (function () {
    function MatSliderModule() {
    }
    MatSliderModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, core_2.MatCommonModule],
                    exports: [slider_1.MatSlider, core_2.MatCommonModule],
                    declarations: [slider_1.MatSlider],
                    providers: [{ provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: core_2.GestureConfig }]
                },] },
    ];
    return MatSliderModule;
}());
exports.MatSliderModule = MatSliderModule;
//# sourceMappingURL=slider-module.js.map