"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var table_1 = require("@angular/cdk/table");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var exampleData = [
    { name: 'Austin', color: 'blue', age: 30 },
    { name: 'Jeremy', color: 'green', age: 33 },
    { name: 'Kara', color: 'purple', age: 29 },
    { name: 'Tina', color: 'yellow', age: 35 },
    { name: 'Brad', color: 'pink', age: 40 },
    { name: 'Jules', color: 'red', age: 21 },
];
var TableAccessibilityDemo = /** @class */ (function () {
    function TableAccessibilityDemo() {
        this.displayedColumns = ['name', 'color', 'age'];
    }
    TableAccessibilityDemo.prototype.ngOnInit = function () {
        this.basicDataSource = new BasicDataSource();
        this.sortDataSource = new SortDataSource(this.sort);
        this.paginatedDataSource = new PaginatedDataSource(this.pager);
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], TableAccessibilityDemo.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], TableAccessibilityDemo.prototype, "pager", void 0);
    TableAccessibilityDemo = __decorate([
        core_1.Component({selector: 'table-a11y',
            template: "<div> <section> <h2>Basic Table</h2> <p>Shows name, color and age data.</p> <mat-table aria-readonly=\"true\" [dataSource]=\"basicDataSource\" aria-label=\"Users favorite colors and age\"> <ng-container cdkColumnDef=\"name\"> <mat-header-cell *cdkHeaderCellDef>Name</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.name}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"color\"> <mat-header-cell *cdkHeaderCellDef>Color</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.color}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"age\"> <mat-header-cell *cdkHeaderCellDef>Age</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.age}}</mat-cell> </ng-container> <mat-header-row *cdkHeaderRowDef=\"displayedColumns\"></mat-header-row> <mat-row *cdkRowDef=\"let row; columns: displayedColumns;\"></mat-row> </mat-table> </section> <section> <h2>Sortable Table</h2> <p>Shows name, color and age data. Sorted ascending by age.</p> <mat-table [dataSource]=\"sortDataSource\" aria-label=\"Users favorite colors and age\" aria-readonly=\"true\" matSort matSortActive=\"age\" matSortDirection=\"asc\"> <ng-container cdkColumnDef=\"name\"> <mat-header-cell *cdkHeaderCellDef>Name</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.name}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"color\"> <mat-header-cell *cdkHeaderCellDef>Color</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.color}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"age\"> <mat-header-cell *cdkHeaderCellDef mat-sort-header>Age</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.age}}</mat-cell> </ng-container> <mat-header-row *cdkHeaderRowDef=\"displayedColumns\"></mat-header-row> <mat-row *cdkRowDef=\"let row; columns: displayedColumns;\"></mat-row> </mat-table> </section> <section> <h2>Paginated Table</h2> <p>Shows name, color and age data. Shows only first 5 until paginated.</p> <mat-table [dataSource]=\"paginatedDataSource\" aria-readonly=\"true\" aria-label=\"Users favorite colors and age\"> <ng-container cdkColumnDef=\"name\"> <mat-header-cell *cdkHeaderCellDef>Name</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.name}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"color\"> <mat-header-cell *cdkHeaderCellDef>Color</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.color}}</mat-cell> </ng-container> <ng-container cdkColumnDef=\"age\"> <mat-header-cell *cdkHeaderCellDef>Age</mat-header-cell> <mat-cell *cdkCellDef=\"let row\">{{row.age}}</mat-cell> </ng-container> <mat-header-row *cdkHeaderRowDef=\"displayedColumns\"></mat-header-row> <mat-row *cdkRowDef=\"let row; columns: displayedColumns;\"></mat-row> </mat-table> <mat-paginator #paginator [length]=\"6\" [pageIndex]=\"0\" [pageSize]=\"3\" [pageSizeOptions]=\"[1, 3, 5]\"> </mat-paginator> </section> </div> ",
            styles: [""],
        })
    ], TableAccessibilityDemo);
    return TableAccessibilityDemo;
}());
exports.TableAccessibilityDemo = TableAccessibilityDemo;
var BasicDataSource = /** @class */ (function (_super) {
    __extends(BasicDataSource, _super);
    function BasicDataSource() {
        var _this = _super.call(this) || this;
        _this.dataChange = new rxjs_1.BehaviorSubject([]);
        _this.dataChange.next(exampleData);
        return _this;
    }
    BasicDataSource.prototype.connect = function () {
        return this.dataChange;
    };
    BasicDataSource.prototype.disconnect = function () { };
    return BasicDataSource;
}(table_1.DataSource));
exports.BasicDataSource = BasicDataSource;
var SortDataSource = /** @class */ (function (_super) {
    __extends(SortDataSource, _super);
    function SortDataSource(_sort) {
        var _this = _super.call(this) || this;
        _this._sort = _sort;
        _this.dataChange = new rxjs_1.BehaviorSubject([]);
        _this.dataChange.next(exampleData);
        return _this;
    }
    SortDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this.dataChange,
            this._sort.sortChange,
        ];
        return rxjs_1.merge.apply(void 0, displayDataChanges).pipe(operators_1.map(function () { return _this.getSortedData(); }));
    };
    SortDataSource.prototype.disconnect = function () { };
    SortDataSource.prototype.getSortedData = function () {
        var _this = this;
        var data = exampleData.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort(function (a, b) {
            return (a.age < b.age ? -1 : 1) * (_this._sort.direction === 'asc' ? 1 : -1);
        });
    };
    return SortDataSource;
}(table_1.DataSource));
exports.SortDataSource = SortDataSource;
var PaginatedDataSource = /** @class */ (function (_super) {
    __extends(PaginatedDataSource, _super);
    function PaginatedDataSource(_paginator) {
        var _this = _super.call(this) || this;
        _this._paginator = _paginator;
        _this.dataChange = new rxjs_1.BehaviorSubject([]);
        _this.dataChange.next(exampleData);
        return _this;
    }
    PaginatedDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this.dataChange,
            this._paginator.page,
        ];
        return rxjs_1.merge.apply(void 0, displayDataChanges).pipe(operators_1.map(function () {
            var data = exampleData.slice();
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            return data.splice(startIndex, _this._paginator.pageSize);
        }));
    };
    PaginatedDataSource.prototype.disconnect = function () { };
    return PaginatedDataSource;
}(table_1.DataSource));
exports.PaginatedDataSource = PaginatedDataSource;
//# sourceMappingURL=table-a11y.js.map