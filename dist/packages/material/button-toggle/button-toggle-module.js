"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var button_toggle_1 = require("./button-toggle");
var MatButtonToggleModule = /** @class */ (function () {
    function MatButtonToggleModule() {
    }
    MatButtonToggleModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule, core_2.MatRippleModule],
                    exports: [core_2.MatCommonModule, button_toggle_1.MatButtonToggleGroup, button_toggle_1.MatButtonToggle],
                    declarations: [button_toggle_1.MatButtonToggleGroup, button_toggle_1.MatButtonToggle],
                },] },
    ];
    return MatButtonToggleModule;
}());
exports.MatButtonToggleModule = MatButtonToggleModule;
//# sourceMappingURL=button-toggle-module.js.map