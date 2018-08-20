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
var platform_1 = require("@angular/cdk/platform");
var common_module_1 = require("../common-behaviors/common-module");
var ripple_1 = require("./ripple");
__export(require("./ripple"));
__export(require("./ripple-ref"));
__export(require("./ripple-renderer"));
var MatRippleModule = /** @class */ (function () {
    function MatRippleModule() {
    }
    MatRippleModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.MatCommonModule, platform_1.PlatformModule],
                    exports: [ripple_1.MatRipple, common_module_1.MatCommonModule],
                    declarations: [ripple_1.MatRipple],
                },] },
    ];
    return MatRippleModule;
}());
exports.MatRippleModule = MatRippleModule;
//# sourceMappingURL=index.js.map