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
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var bottom_sheet_container_1 = require("./bottom-sheet-container");
var MatBottomSheetModule = /** @class */ (function () {
    function MatBottomSheetModule() {
    }
    MatBottomSheetModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        overlay_1.OverlayModule,
                        core_2.MatCommonModule,
                        portal_1.PortalModule,
                    ],
                    exports: [bottom_sheet_container_1.MatBottomSheetContainer, core_2.MatCommonModule],
                    declarations: [bottom_sheet_container_1.MatBottomSheetContainer],
                    entryComponents: [bottom_sheet_container_1.MatBottomSheetContainer],
                },] },
    ];
    return MatBottomSheetModule;
}());
exports.MatBottomSheetModule = MatBottomSheetModule;
//# sourceMappingURL=bottom-sheet-module.js.map