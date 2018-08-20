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
var divider_1 = require("./divider");
var MatDividerModule = /** @class */ (function () {
    function MatDividerModule() {
    }
    MatDividerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule, common_1.CommonModule],
                    exports: [divider_1.MatDivider, core_2.MatCommonModule],
                    declarations: [divider_1.MatDivider],
                },] },
    ];
    return MatDividerModule;
}());
exports.MatDividerModule = MatDividerModule;
//# sourceMappingURL=divider-module.js.map