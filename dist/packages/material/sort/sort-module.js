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
var sort_header_1 = require("./sort-header");
var sort_1 = require("./sort");
var sort_header_intl_1 = require("./sort-header-intl");
var common_1 = require("@angular/common");
var MatSortModule = /** @class */ (function () {
    function MatSortModule() {
    }
    MatSortModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [sort_1.MatSort, sort_header_1.MatSortHeader],
                    declarations: [sort_1.MatSort, sort_header_1.MatSortHeader],
                    providers: [sort_header_intl_1.MAT_SORT_HEADER_INTL_PROVIDER]
                },] },
    ];
    return MatSortModule;
}());
exports.MatSortModule = MatSortModule;
//# sourceMappingURL=sort-module.js.map