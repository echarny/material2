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
var button_1 = require("@angular/material/button");
var simple_snack_bar_1 = require("./simple-snack-bar");
var snack_bar_container_1 = require("./snack-bar-container");
var MatSnackBarModule = /** @class */ (function () {
    function MatSnackBarModule() {
    }
    MatSnackBarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        overlay_1.OverlayModule,
                        portal_1.PortalModule,
                        common_1.CommonModule,
                        button_1.MatButtonModule,
                        core_2.MatCommonModule,
                    ],
                    exports: [snack_bar_container_1.MatSnackBarContainer, core_2.MatCommonModule],
                    declarations: [snack_bar_container_1.MatSnackBarContainer, simple_snack_bar_1.SimpleSnackBar],
                    entryComponents: [snack_bar_container_1.MatSnackBarContainer, simple_snack_bar_1.SimpleSnackBar],
                },] },
    ];
    return MatSnackBarModule;
}());
exports.MatSnackBarModule = MatSnackBarModule;
//# sourceMappingURL=snack-bar-module.js.map