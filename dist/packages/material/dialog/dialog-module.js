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
var dialog_1 = require("./dialog");
var dialog_container_1 = require("./dialog-container");
var dialog_content_directives_1 = require("./dialog-content-directives");
var MatDialogModule = /** @class */ (function () {
    function MatDialogModule() {
    }
    MatDialogModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        overlay_1.OverlayModule,
                        portal_1.PortalModule,
                        core_2.MatCommonModule,
                    ],
                    exports: [
                        dialog_container_1.MatDialogContainer,
                        dialog_content_directives_1.MatDialogClose,
                        dialog_content_directives_1.MatDialogTitle,
                        dialog_content_directives_1.MatDialogContent,
                        dialog_content_directives_1.MatDialogActions,
                        core_2.MatCommonModule,
                    ],
                    declarations: [
                        dialog_container_1.MatDialogContainer,
                        dialog_content_directives_1.MatDialogClose,
                        dialog_content_directives_1.MatDialogTitle,
                        dialog_content_directives_1.MatDialogActions,
                        dialog_content_directives_1.MatDialogContent,
                    ],
                    providers: [
                        dialog_1.MatDialog,
                        dialog_1.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    ],
                    entryComponents: [dialog_container_1.MatDialogContainer],
                },] },
    ];
    return MatDialogModule;
}());
exports.MatDialogModule = MatDialogModule;
//# sourceMappingURL=dialog-module.js.map