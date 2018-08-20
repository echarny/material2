"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var checkbox_1 = require("./checkbox");
var checkbox_required_validator_1 = require("./checkbox-required-validator");
var MatCheckboxModule = /** @class */ (function () {
    function MatCheckboxModule() {
    }
    MatCheckboxModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, core_2.MatRippleModule, core_2.MatCommonModule, observers_1.ObserversModule],
                    exports: [checkbox_1.MatCheckbox, checkbox_required_validator_1.MatCheckboxRequiredValidator, core_2.MatCommonModule],
                    declarations: [checkbox_1.MatCheckbox, checkbox_required_validator_1.MatCheckboxRequiredValidator],
                },] },
    ];
    return MatCheckboxModule;
}());
exports.MatCheckboxModule = MatCheckboxModule;
//# sourceMappingURL=checkbox-module.js.map