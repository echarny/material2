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
var element_data_1 = require("../element-data");
var table_1 = require("@angular/cdk/table");
var material_1 = require("@angular/material");
var DataInputTableDemo = /** @class */ (function () {
    function DataInputTableDemo() {
        var _this = this;
        this.columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
        this.inputType = 'array';
        this.data = element_data_1.ELEMENT_DATA.slice();
        this.matTableDataSource = new material_1.MatTableDataSource(this.data);
        this.trackByStrategy = 'reference';
        this.trackBy = function (index, item) {
            switch (_this.trackByStrategy) {
                case 'position': return item.position;
                case 'reference': return item;
                case 'index': return index;
            }
        };
        this.dataSource = this.data;
    }
    DataInputTableDemo.prototype.changeInput = function (e) {
        this.inputType = e.value;
        switch (this.inputType) {
            case 'array':
                this.dataSource = this.data;
                break;
            case 'stream':
                this.dataSource = this.matTableDataSource.connect();
                break;
            case 'source':
                this.dataSource = this.matTableDataSource;
                break;
        }
    };
    DataInputTableDemo.prototype.addRow = function () {
        this.data.push({
            name: 'new',
            weight: Math.floor(Math.random() * 25),
            symbol: 'New',
            position: Math.floor(Math.random() * 25)
        });
        this.matTableDataSource.data = this.data;
    };
    DataInputTableDemo.prototype.shuffle = function () {
        var dataToShuffle = this.data.slice();
        var currentIndex = dataToShuffle.length;
        while (0 !== currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // Swap
            var temp = dataToShuffle[currentIndex];
            dataToShuffle[currentIndex] = dataToShuffle[randomIndex];
            dataToShuffle[randomIndex] = temp;
        }
        this.data = dataToShuffle;
        this.matTableDataSource.data = dataToShuffle;
    };
    DataInputTableDemo.prototype.removeRow = function () {
        this.data.pop();
        this.matTableDataSource.data = this.data;
    };
    DataInputTableDemo.prototype.reassignDataClone = function () {
        this.data = this.data.slice();
        if (this.dataSource instanceof Array) {
            this.dataSource = this.data;
        }
        this.matTableDataSource.data = this.data;
    };
    DataInputTableDemo.prototype.renderRows = function () {
        this.cdkTable.renderRows();
        this.matTable.renderRows();
    };
    DataInputTableDemo.prototype.removeDataSource = function () {
        this.dataSource = null;
        this.inputType = null;
    };
    DataInputTableDemo.prototype.highlightFirstRow = function () {
        document.querySelector('table tbody tr').setAttribute('style', 'background: red');
    };
    __decorate([
        core_1.ViewChild(table_1.CdkTable),
        __metadata("design:type", table_1.CdkTable)
    ], DataInputTableDemo.prototype, "cdkTable", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatTable),
        __metadata("design:type", material_1.MatTable)
    ], DataInputTableDemo.prototype, "matTable", void 0);
    DataInputTableDemo = __decorate([
        core_1.Component({selector: 'data-input-table-demo',
            template: "<div class=\"demo-actions\"> <strong>Input type: </strong> <mat-radio-group [value]=\"inputType\" (change)=\"changeInput($event)\"> <mat-radio-button value=\"array\">Array</mat-radio-button> <mat-radio-button value=\"stream\">Stream</mat-radio-button> <mat-radio-button value=\"source\">DataSource</mat-radio-button> </mat-radio-group> </div> <div class=\"demo-actions\"> <strong>Data Changes: </strong> <button mat-raised-button (click)=\"addRow()\"> Add Row </button> <button mat-raised-button (click)=\"removeRow()\"> Remove Row </button> <button mat-raised-button (click)=\"reassignDataClone()\"> Clone Data </button> <button mat-raised-button (click)=\"shuffle()\"> Shuffle </button> </div> <div class=\"demo-actions\"> <strong>Table: </strong> <button mat-raised-button (click)=\"this.renderRows()\">Re-render</button> <button mat-raised-button (click)=\"this.removeDataSource()\">Remove Data Source</button> </div> <div class=\"demo-actions\"> <button mat-raised-button (click)=\"highlightFirstRow()\"> Highlight first row </button> </div> <div class=\"demo-actions\"> <div class=\"demo-track-by-select\"> <div class=\"demo-track-by-label\">Track By</div> <mat-radio-group [(ngModel)]=\"trackByStrategy\"> <mat-radio-button [value]=\"'reference'\"> Reference </mat-radio-button> <mat-radio-button [value]=\"'position'\"> Position </mat-radio-button> <mat-radio-button [value]=\"'index'\"> Index </mat-radio-button> </mat-radio-group> </div> </div> <mat-card> <h3> CdkTable </h3> <table cdk-table #cdkTable [dataSource]=\"dataSource\" [trackBy]=\"trackBy\"> <!-- Name (normal column) --> <ng-container [cdkColumnDef]=\"column\" *ngFor=\"let column of columnsToDisplay\"> <th cdk-header-cell *cdkHeaderCellDef> {{column}} </th> <td cdk-cell *cdkCellDef=\"let element\"> {{element[column]}} </td> </ng-container> <tr cdk-header-row *cdkHeaderRowDef=\"columnsToDisplay\"></tr> <tr cdk-row *cdkRowDef=\"let data; columns: columnsToDisplay;\"></tr> </table> </mat-card> ",
            styles: [".demo-actions { margin-top: 24px; } .demo-track-by-select { display: flex; align-items: center; } .demo-track-by-select .demo-track-by-label { margin-right: 8px; } "],
        })
    ], DataInputTableDemo);
    return DataInputTableDemo;
}());
exports.DataInputTableDemo = DataInputTableDemo;
//# sourceMappingURL=data-input-table.js.map