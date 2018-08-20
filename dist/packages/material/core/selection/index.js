"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pseudo_checkbox_1 = require("./pseudo-checkbox/pseudo-checkbox");
var MatPseudoCheckboxModule = /** @class */ (function () {
    function MatPseudoCheckboxModule() {
    }
    MatPseudoCheckboxModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [pseudo_checkbox_1.MatPseudoCheckbox],
                    declarations: [pseudo_checkbox_1.MatPseudoCheckbox]
                },] },
    ];
    return MatPseudoCheckboxModule;
}());
exports.MatPseudoCheckboxModule = MatPseudoCheckboxModule;
__export(require("./pseudo-checkbox/pseudo-checkbox"));
//# sourceMappingURL=index.js.map