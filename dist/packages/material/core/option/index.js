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
var common_1 = require("@angular/common");
var index_1 = require("../ripple/index");
var index_2 = require("../selection/index");
var option_1 = require("./option");
var optgroup_1 = require("./optgroup");
var MatOptionModule = /** @class */ (function () {
    function MatOptionModule() {
    }
    MatOptionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [index_1.MatRippleModule, common_1.CommonModule, index_2.MatPseudoCheckboxModule],
                    exports: [option_1.MatOption, optgroup_1.MatOptgroup],
                    declarations: [option_1.MatOption, optgroup_1.MatOptgroup]
                },] },
    ];
    return MatOptionModule;
}());
exports.MatOptionModule = MatOptionModule;
__export(require("./option"));
__export(require("./optgroup"));
//# sourceMappingURL=index.js.map