"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var overlay_1 = require("@angular/cdk/overlay");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var select_1 = require("./select");
var MatSelectModule = /** @class */ (function () {
    function MatSelectModule() {
    }
    MatSelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        overlay_1.OverlayModule,
                        core_2.MatOptionModule,
                        core_2.MatCommonModule,
                    ],
                    exports: [form_field_1.MatFormFieldModule, select_1.MatSelect, select_1.MatSelectTrigger, core_2.MatOptionModule, core_2.MatCommonModule],
                    declarations: [select_1.MatSelect, select_1.MatSelectTrigger],
                    providers: [select_1.MAT_SELECT_SCROLL_STRATEGY_PROVIDER]
                },] },
    ];
    return MatSelectModule;
}());
exports.MatSelectModule = MatSelectModule;
//# sourceMappingURL=select-module.js.map