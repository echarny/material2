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
var list_1 = require("./list");
var selection_list_1 = require("./selection-list");
var divider_1 = require("@angular/material/divider");
var MatListModule = /** @class */ (function () {
    function MatListModule() {
    }
    MatListModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatLineModule, core_2.MatRippleModule, core_2.MatCommonModule, core_2.MatPseudoCheckboxModule, common_1.CommonModule],
                    exports: [
                        list_1.MatList,
                        list_1.MatNavList,
                        list_1.MatListItem,
                        list_1.MatListAvatarCssMatStyler,
                        core_2.MatLineModule,
                        core_2.MatCommonModule,
                        list_1.MatListIconCssMatStyler,
                        list_1.MatListSubheaderCssMatStyler,
                        core_2.MatPseudoCheckboxModule,
                        selection_list_1.MatSelectionList,
                        selection_list_1.MatListOption,
                        divider_1.MatDividerModule
                    ],
                    declarations: [
                        list_1.MatList,
                        list_1.MatNavList,
                        list_1.MatListItem,
                        list_1.MatListAvatarCssMatStyler,
                        list_1.MatListIconCssMatStyler,
                        list_1.MatListSubheaderCssMatStyler,
                        selection_list_1.MatSelectionList,
                        selection_list_1.MatListOption
                    ],
                },] },
    ];
    return MatListModule;
}());
exports.MatListModule = MatListModule;
//# sourceMappingURL=list-module.js.map