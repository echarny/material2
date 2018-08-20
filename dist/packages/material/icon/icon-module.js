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
var core_2 = require("@angular/material/core");
var icon_1 = require("./icon");
var MatIconModule = /** @class */ (function () {
    function MatIconModule() {
    }
    MatIconModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule],
                    exports: [icon_1.MatIcon, core_2.MatCommonModule],
                    declarations: [icon_1.MatIcon],
                },] },
    ];
    return MatIconModule;
}());
exports.MatIconModule = MatIconModule;
//# sourceMappingURL=icon-module.js.map