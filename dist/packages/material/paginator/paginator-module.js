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
var button_1 = require("@angular/material/button");
var select_1 = require("@angular/material/select");
var tooltip_1 = require("@angular/material/tooltip");
var paginator_1 = require("./paginator");
var paginator_intl_1 = require("./paginator-intl");
var MatPaginatorModule = /** @class */ (function () {
    function MatPaginatorModule() {
    }
    MatPaginatorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        button_1.MatButtonModule,
                        select_1.MatSelectModule,
                        tooltip_1.MatTooltipModule,
                    ],
                    exports: [paginator_1.MatPaginator],
                    declarations: [paginator_1.MatPaginator],
                    providers: [paginator_intl_1.MAT_PAGINATOR_INTL_PROVIDER],
                },] },
    ];
    return MatPaginatorModule;
}());
exports.MatPaginatorModule = MatPaginatorModule;
//# sourceMappingURL=paginator-module.js.map