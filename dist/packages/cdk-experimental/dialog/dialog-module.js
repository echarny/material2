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
var common_1 = require("@angular/common");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var a11y_1 = require("@angular/cdk/a11y");
var dialog_1 = require("./dialog");
var dialog_container_1 = require("./dialog-container");
var dialog_config_1 = require("./dialog-config");
var dialog_ref_1 = require("./dialog-ref");
var dialog_injectors_1 = require("./dialog-injectors");
var ɵ0 = dialog_ref_1.DialogRef, ɵ1 = dialog_container_1.CdkDialogContainer, ɵ2 = dialog_config_1.DialogConfig;
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        overlay_1.OverlayModule,
                        portal_1.PortalModule,
                        a11y_1.A11yModule,
                    ],
                    exports: [
                        dialog_container_1.CdkDialogContainer,
                    ],
                    declarations: [
                        dialog_container_1.CdkDialogContainer,
                    ],
                    providers: [
                        dialog_1.Dialog,
                        dialog_injectors_1.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                        { provide: dialog_injectors_1.DIALOG_REF, useValue: ɵ0 },
                        { provide: dialog_injectors_1.DIALOG_CONTAINER, useValue: ɵ1 },
                        { provide: dialog_injectors_1.DIALOG_CONFIG, useValue: ɵ2 },
                    ],
                    entryComponents: [dialog_container_1.CdkDialogContainer],
                },] },
    ];
    return DialogModule;
}());
exports.DialogModule = DialogModule;
//# sourceMappingURL=dialog-module.js.map