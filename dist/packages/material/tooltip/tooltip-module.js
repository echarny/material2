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
var a11y_1 = require("@angular/cdk/a11y");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var tooltip_1 = require("./tooltip");
var MatTooltipModule = /** @class */ (function () {
    function MatTooltipModule() {
    }
    MatTooltipModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        a11y_1.A11yModule,
                        common_1.CommonModule,
                        overlay_1.OverlayModule,
                        core_2.MatCommonModule,
                    ],
                    exports: [tooltip_1.MatTooltip, tooltip_1.TooltipComponent, core_2.MatCommonModule],
                    declarations: [tooltip_1.MatTooltip, tooltip_1.TooltipComponent],
                    entryComponents: [tooltip_1.TooltipComponent],
                    providers: [tooltip_1.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] },
    ];
    return MatTooltipModule;
}());
exports.MatTooltipModule = MatTooltipModule;
//# sourceMappingURL=tooltip-module.js.map