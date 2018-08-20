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
var table_1 = require("./table");
var table_2 = require("@angular/cdk/table");
var cell_1 = require("./cell");
var row_1 = require("./row");
var common_1 = require("@angular/common");
var core_2 = require("@angular/material/core");
var EXPORTED_DECLARATIONS = [
    // Table
    table_1.MatTable,
    // Template defs
    cell_1.MatHeaderCellDef,
    row_1.MatHeaderRowDef,
    cell_1.MatColumnDef,
    cell_1.MatCellDef,
    row_1.MatRowDef,
    cell_1.MatFooterCellDef,
    row_1.MatFooterRowDef,
    // Cell directives
    cell_1.MatHeaderCell,
    cell_1.MatCell,
    cell_1.MatFooterCell,
    // Row directions
    row_1.MatHeaderRow,
    row_1.MatRow,
    row_1.MatFooterRow,
];
var MatTableModule = /** @class */ (function () {
    function MatTableModule() {
    }
    MatTableModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [table_2.CdkTableModule, common_1.CommonModule, core_2.MatCommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                },] },
    ];
    return MatTableModule;
}());
exports.MatTableModule = MatTableModule;
//# sourceMappingURL=table-module.js.map