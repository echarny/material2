"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var simple_column_1 = require("./simple-column");
var WrapperTable = /** @class */ (function () {
    function WrapperTable() {
    }
    WrapperTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Register the simple columns to the table
        this.simpleColumns.forEach(function (simpleColumn) { return _this.table.addColumnDef(simpleColumn.columnDef); });
        // Register the normal column defs to the table
        this.columnDefs.forEach(function (columnDef) { return _this.table.addColumnDef(columnDef); });
        // Register any custom row definitions to the table
        this.rowDefs.forEach(function (rowDef) { return _this.table.addRowDef(rowDef); });
        // Register the header row definition.
        this.table.setHeaderRowDef(this.headerRowDef);
    };
    __decorate([
        core_1.ContentChildren(simple_column_1.SimpleColumn),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "simpleColumns", void 0);
    __decorate([
        core_1.ContentChildren(material_1.MatColumnDef),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "columnDefs", void 0);
    __decorate([
        core_1.ContentChild(material_1.MatHeaderRowDef),
        __metadata("design:type", material_1.MatHeaderRowDef)
    ], WrapperTable.prototype, "headerRowDef", void 0);
    __decorate([
        core_1.ContentChildren(material_1.MatRowDef),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "rowDefs", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatTable),
        __metadata("design:type", material_1.MatTable)
    ], WrapperTable.prototype, "table", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WrapperTable.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", collections_1.DataSource)
    ], WrapperTable.prototype, "dataSource", void 0);
    WrapperTable = __decorate([
        core_1.Component({selector: 'wrapper-table',
            template: "<table mat-table [dataSource]=\"dataSource\"> <ng-content></ng-content> <!-- Weight Column --> <ng-container matColumnDef=\"weight\"> <th mat-header-cell *matHeaderCellDef mat-sort-header> Weight </th> <td mat-cell *matCellDef=\"let element\"> {{element.weight}} </td> </ng-container> <!-- Color Column --> <ng-container matColumnDef=\"symbol\"> <th mat-header-cell *matHeaderCellDef> Symbol </th> <td mat-cell *matCellDef=\"let element\"> {{element.symbol}} </td> </ng-container> </table> ",
            styles: ["\n    :host {\n      display: block;\n      width: 100%;\n    }\n\n    .mat-table {\n      width: 100%;\n    }\n  "]
        })
    ], WrapperTable);
    return WrapperTable;
}());
exports.WrapperTable = WrapperTable;
//# sourceMappingURL=wrapper-table.js.map