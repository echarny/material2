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
var menu_content_1 = require("./menu-content");
var menu_directive_1 = require("./menu-directive");
var menu_item_1 = require("./menu-item");
var menu_trigger_1 = require("./menu-trigger");
var MatMenuModule = /** @class */ (function () {
    function MatMenuModule() {
    }
    MatMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        core_2.MatCommonModule,
                        core_2.MatRippleModule,
                        overlay_1.OverlayModule,
                    ],
                    exports: [menu_directive_1.MatMenu, menu_item_1.MatMenuItem, menu_trigger_1.MatMenuTrigger, menu_content_1.MatMenuContent, core_2.MatCommonModule],
                    declarations: [menu_directive_1.MatMenu, menu_item_1.MatMenuItem, menu_trigger_1.MatMenuTrigger, menu_content_1.MatMenuContent],
                    providers: [menu_trigger_1.MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] },
    ];
    return MatMenuModule;
}());
exports.MatMenuModule = MatMenuModule;
//# sourceMappingURL=menu-module.js.map