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
var table_1 = require("./table");
var row_1 = require("./row");
var cell_1 = require("./cell");
var EXPORTED_DECLARATIONS = [
    table_1.CdkTable,
    row_1.CdkRowDef,
    cell_1.CdkCellDef,
    row_1.CdkCellOutlet,
    cell_1.CdkHeaderCellDef,
    cell_1.CdkFooterCellDef,
    cell_1.CdkColumnDef,
    cell_1.CdkCell,
    row_1.CdkRow,
    cell_1.CdkHeaderCell,
    cell_1.CdkFooterCell,
    row_1.CdkHeaderRow,
    row_1.CdkHeaderRowDef,
    row_1.CdkFooterRow,
    row_1.CdkFooterRowDef,
    table_1.DataRowOutlet,
    table_1.HeaderRowOutlet,
    table_1.FooterRowOutlet,
];
var CdkTableModule = /** @class */ (function () {
    function CdkTableModule() {
    }
    CdkTableModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS
                },] },
    ];
    return CdkTableModule;
}());
exports.CdkTableModule = CdkTableModule;
//# sourceMappingURL=table-module.js.map