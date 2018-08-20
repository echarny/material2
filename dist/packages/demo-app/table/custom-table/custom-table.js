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
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var element_data_1 = require("../element-data");
var CustomTableDemo = /** @class */ (function () {
    function CustomTableDemo() {
        this.columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
        this.simpleTableDataSource = new material_1.MatTableDataSource(element_data_1.ELEMENT_DATA);
        this.wrapperTableDataSource = new material_1.MatTableDataSource(element_data_1.ELEMENT_DATA);
        this.getWeight = function (data) { return '~' + data.weight; };
    }
    CustomTableDemo.prototype.ngOnInit = function () {
        this.simpleTableDataSource.sort = this.simpleTableSort;
        this.wrapperTableDataSource.sort = this.wrapperTableSort;
    };
    __decorate([
        core_1.ViewChild('simpleTableSort'),
        __metadata("design:type", material_1.MatSort)
    ], CustomTableDemo.prototype, "simpleTableSort", void 0);
    __decorate([
        core_1.ViewChild('wrapperTableSort'),
        __metadata("design:type", material_1.MatSort)
    ], CustomTableDemo.prototype, "wrapperTableSort", void 0);
    CustomTableDemo = __decorate([
        core_1.Component({selector: 'custom-table-demo',
            template: "<mat-card> <h3> MatTable with Simple Columns </h3> <table mat-table [dataSource]=\"simpleTableDataSource\" matSort #simpleTableSort=\"matSort\"> <!-- Basic column: name is used for header label AND data property --> <simple-column name=\"name\" sortable></simple-column> <simple-column name=\"position\"></simple-column> <!-- Name doesn't match the data property (or transform needed); define a custom data accessor --> <simple-column name=\"weight\" [dataAccessor]=\"getWeight\"></simple-column> <!-- Name doesn't match desired header text; define a custom label --> <simple-column name=\"symbol\" label=\"SYMBOL!\"></simple-column> <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr> <tr mat-row *matRowDef=\"let data; columns: columnsToDisplay;\"></tr> </table> </mat-card> <mat-card> <h3> Wrapper Table </h3> <wrapper-table [dataSource]=\"wrapperTableDataSource\" [columns]=\"columnsToDisplay\" matSort #wrapperTableSort=\"matSort\"> <!-- Name (normal column) --> <ng-container matColumnDef=\"name\"> <th mat-header-cell *matHeaderCellDef> Name </th> <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td> </ng-container> <!-- Position (simple column) --> <simple-column name=\"position\"></simple-column> <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr> <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay; \"></tr> </wrapper-table> </mat-card> ",
            styles: [".mat-table, wrapper-table { width: 100%; } .mat-card { margin: 8px 0; height: 300px; overflow: auto; } "]
        })
    ], CustomTableDemo);
    return CustomTableDemo;
}());
exports.CustomTableDemo = CustomTableDemo;
//# sourceMappingURL=custom-table.js.map