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
var toolbar_1 = require("./toolbar");
var MatToolbarModule = /** @class */ (function () {
    function MatToolbarModule() {
    }
    MatToolbarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule],
                    exports: [toolbar_1.MatToolbar, toolbar_1.MatToolbarRow, core_2.MatCommonModule],
                    declarations: [toolbar_1.MatToolbar, toolbar_1.MatToolbarRow],
                },] },
    ];
    return MatToolbarModule;
}());
exports.MatToolbarModule = MatToolbarModule;
//# sourceMappingURL=toolbar-module.js.map