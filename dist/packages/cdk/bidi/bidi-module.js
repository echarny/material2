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
var dir_1 = require("./dir");
var BidiModule = /** @class */ (function () {
    function BidiModule() {
    }
    BidiModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [dir_1.Dir],
                    declarations: [dir_1.Dir],
                },] },
    ];
    return BidiModule;
}());
exports.BidiModule = BidiModule;
//# sourceMappingURL=bidi-module.js.map