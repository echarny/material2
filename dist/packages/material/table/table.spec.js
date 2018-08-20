"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var animations_1 = require("@angular/platform-browser/animations");
var rxjs_1 = require("rxjs");
var index_1 = require("../paginator/index");
var index_2 = require("../sort/index");
var index_3 = require("./index");
var table_1 = require("./table");
var table_data_source_1 = require("./table-data-source");
describe('MatTable', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_3.MatTableModule, index_1.MatPaginatorModule, index_2.MatSortModule, animations_1.NoopAnimationsModule],
            declarations: [
                MatTableApp,
                MatTableWithWhenRowApp,
                ArrayDataSourceMatTableApp,
                NativeHtmlTableApp,
                MatTableWithSortApp,
                MatTableWithPaginatorApp,
                StickyTableApp,
                TableWithNgContainerRow,
            ],
        }).compileComponents();
    }));
    describe('with basic data source', function () {
        it('should be able to create a table with the right content and without when row', function () {
            var fixture = testing_1.TestBed.createComponent(MatTableApp);
            fixture.detectChanges();
            var tableElement = (fixture.nativeElement.querySelector('.mat-table'));
            var data = fixture.componentInstance.dataSource.data;
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                [data[1].a, data[1].b, data[1].c],
                [data[2].a, data[2].b, data[2].c],
                ['fourth_row'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should create a table with special when row', function () {
            var fixture = testing_1.TestBed.createComponent(MatTableWithWhenRowApp);
            fixture.detectChanges();
            var tableElement = fixture.nativeElement.querySelector('.mat-table');
            expectTableToMatchContent(tableElement, [
                ['Column A'],
                ['a_1'],
                ['a_2'],
                ['a_3'],
                ['fourth_row'],
                ['Footer A'],
            ]);
        });
        it('should create a table with multiTemplateDataRows true', function () {
            var fixture = testing_1.TestBed.createComponent(MatTableWithWhenRowApp);
            fixture.componentInstance.multiTemplateDataRows = true;
            fixture.detectChanges();
            var tableElement = fixture.nativeElement.querySelector('.mat-table');
            expectTableToMatchContent(tableElement, [
                ['Column A'],
                ['a_1'],
                ['a_2'],
                ['a_3'],
                ['a_4'],
                // With multiple rows, this row shows up along with the special 'when' fourth_row
                ['fourth_row'],
                ['Footer A'],
            ]);
        });
    });
    it('should be able to render a table correctly with native elements', function () {
        var fixture = testing_1.TestBed.createComponent(NativeHtmlTableApp);
        fixture.detectChanges();
        var tableElement = fixture.nativeElement.querySelector('table');
        var data = fixture.componentInstance.dataSource.data;
        expectTableToMatchContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c],
            [data[3].a, data[3].b, data[3].c],
        ]);
    });
    it('should render with MatTableDataSource and sort', function () {
        var fixture = testing_1.TestBed.createComponent(MatTableWithSortApp);
        fixture.detectChanges();
        var tableElement = (fixture.nativeElement.querySelector('.mat-table'));
        var data = fixture.componentInstance.dataSource.data;
        expectTableToMatchContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c],
        ]);
    });
    it('should render with MatTableDataSource and pagination', function () {
        var fixture = testing_1.TestBed.createComponent(MatTableWithPaginatorApp);
        fixture.detectChanges();
        var tableElement = (fixture.nativeElement.querySelector('.mat-table'));
        var data = fixture.componentInstance.dataSource.data;
        expectTableToMatchContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c],
        ]);
    });
    it('should apply custom sticky CSS class to sticky cells', function () {
        var fixture = testing_1.TestBed.createComponent(StickyTableApp);
        fixture.detectChanges();
        var stuckCellElement = (fixture.nativeElement.querySelector('.mat-table th'));
        expect(stuckCellElement.classList).toContain('mat-table-sticky');
    });
    // Note: needs to be fakeAsync so it catches the error.
    it('should not throw when a row definition is on an ng-container', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(TableWithNgContainerRow);
        expect(function () {
            fixture.detectChanges();
            testing_1.tick();
        }).not.toThrow();
    }));
    describe('with MatTableDataSource and sort/pagination/filter', function () {
        var tableElement;
        var fixture;
        var dataSource;
        var component;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(ArrayDataSourceMatTableApp);
            fixture.detectChanges();
            tableElement = fixture.nativeElement.querySelector('.mat-table');
            component = fixture.componentInstance;
            dataSource = fixture.componentInstance.dataSource;
        });
        it('should create table and display data source contents', function () {
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('changing data should update the table contents', function () {
            // Add data
            component.underlyingDataSource.addData();
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Remove data
            var modifiedData = dataSource.data.slice();
            modifiedData.shift();
            dataSource.data = modifiedData;
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should be able to filter the table contents', testing_1.fakeAsync(function () {
            // Change filter to a_1, should match one row
            dataSource.filter = 'a_1';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(1);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[0]);
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            testing_1.flushMicrotasks(); // Resolve promise that updates paginator's length
            expect(dataSource.paginator.length).toBe(1);
            // Change filter to '  A_2  ', should match one row (ignores case and whitespace)
            dataSource.filter = '  A_2  ';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(1);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[1]);
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Change filter to empty string, should match all rows
            dataSource.filter = '';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(3);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[0]);
            expect(dataSource.filteredData[1]).toBe(dataSource.data[1]);
            expect(dataSource.filteredData[2]).toBe(dataSource.data[2]);
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Change filter function and filter, should match to rows with zebra.
            dataSource.filterPredicate = function (data, filter) {
                var dataStr;
                switch (data.a) {
                    case 'a_1':
                        dataStr = 'elephant';
                        break;
                    case 'a_2':
                        dataStr = 'zebra';
                        break;
                    case 'a_3':
                        dataStr = 'monkey';
                        break;
                    default: dataStr = '';
                }
                return dataStr.indexOf(filter) != -1;
            };
            dataSource.filter = 'zebra';
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        }));
        it('should be able to sort the table contents', function () {
            // Activate column A sort
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Activate column A sort again (reverse direction)
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['a_1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Change sort function to customize how it sorts - first column 1, then 3, then 2
            dataSource.sortingDataAccessor = function (data) {
                switch (data.a) {
                    case 'a_1': return 'elephant';
                    case 'a_2': return 'zebra';
                    case 'a_3': return 'monkey';
                    default: return '';
                }
            };
            component.sort.direction = '';
            component.sort.sort(component.sortHeader);
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should by default correctly sort an empty string', function () {
            // Activate column A sort
            dataSource.data[0].a = ' ';
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            // Expect that empty string row comes before the other values
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Expect that empty string row comes before the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should by default correctly sort undefined values', function () {
            // Activate column A sort
            dataSource.data[0].a = undefined;
            // Expect that undefined row comes before the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Expect that undefined row comes after the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should sort zero correctly', function () {
            // Activate column A sort
            dataSource.data[0].a = 1;
            dataSource.data[1].a = 0;
            dataSource.data[2].a = -1;
            // Expect that zero comes after the negative numbers and before the positive ones.
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['-1', 'b_3', 'c_3'],
                ['0', 'b_2', 'c_2'],
                ['1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Expect that zero comes after the negative numbers and before
            // the positive ones when switching the sorting direction.
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['1', 'b_1', 'c_1'],
                ['0', 'b_2', 'c_2'],
                ['-1', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
        it('should be able to page the table contents', testing_1.fakeAsync(function () {
            // Add 100 rows, should only display first 5 since page length is 5
            for (var i = 0; i < 100; i++) {
                component.underlyingDataSource.addData();
            }
            fixture.detectChanges();
            testing_1.flushMicrotasks(); // Resolve promise that updates paginator's length
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['a_5', 'b_5', 'c_5'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            // Navigate to the next page
            component.paginator.nextPage();
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_6', 'b_6', 'c_6'],
                ['a_7', 'b_7', 'c_7'],
                ['a_8', 'b_8', 'c_8'],
                ['a_9', 'b_9', 'c_9'],
                ['a_10', 'b_10', 'c_10'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        }));
        it('should sort strings with numbers larger than MAX_SAFE_INTEGER correctly', function () {
            var large = '9563256840123535';
            var larger = '9563256840123536';
            var largest = '9563256840123537';
            dataSource.data[0].a = largest;
            dataSource.data[1].a = larger;
            dataSource.data[2].a = large;
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [large, 'b_3', 'c_3'],
                [larger, 'b_2', 'c_2'],
                [largest, 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableToMatchContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [largest, 'b_1', 'c_1'],
                [larger, 'b_2', 'c_2'],
                [large, 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C'],
            ]);
        });
    });
});
var FakeDataSource = /** @class */ (function (_super) {
    __extends(FakeDataSource, _super);
    function FakeDataSource() {
        var _this = _super.call(this) || this;
        _this._dataChange = new rxjs_1.BehaviorSubject([]);
        for (var i = 0; i < 4; i++) {
            _this.addData();
        }
        return _this;
    }
    Object.defineProperty(FakeDataSource.prototype, "data", {
        get: function () { return this._dataChange.getValue(); },
        set: function (data) { this._dataChange.next(data); },
        enumerable: true,
        configurable: true
    });
    FakeDataSource.prototype.connect = function () {
        return this._dataChange;
    };
    FakeDataSource.prototype.disconnect = function () { };
    FakeDataSource.prototype.addData = function () {
        var nextIndex = this.data.length + 1;
        var copiedData = this.data.slice();
        copiedData.push({
            a: "a_" + nextIndex,
            b: "b_" + nextIndex,
            c: "c_" + nextIndex
        });
        this.data = copiedData;
    };
    return FakeDataSource;
}(collections_1.DataSource));
var MatTableApp = /** @class */ (function () {
    function MatTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.isFourthRow = function (i, _rowData) { return i == 3; };
    }
    MatTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\">\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef> Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer A</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <mat-header-cell *matHeaderCellDef> Column B</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.b}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer B</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <mat-header-cell *matHeaderCellDef> Column C</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.c}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer C</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"special_column\">\n        <mat-cell *matCellDef=\"let row\"> fourth_row </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: columnsToRender\"></mat-row>\n      <mat-row *matRowDef=\"let row; columns: ['special_column']; when: isFourthRow\"></mat-row>\n      <mat-footer-row *matFooterRowDef=\"columnsToRender\"></mat-footer-row>\n    </mat-table>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
    };
    return MatTableApp;
}());
var NativeHtmlTableApp = /** @class */ (function () {
    function NativeHtmlTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
    }
    NativeHtmlTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <table mat-table [dataSource]=\"dataSource\">\n      <ng-container matColumnDef=\"column_a\">\n        <th mat-header-cell *matHeaderCellDef> Column A</th>\n        <td mat-cell *matCellDef=\"let row\"> {{row.a}}</td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <th mat-header-cell *matHeaderCellDef> Column B</th>\n        <td mat-cell *matCellDef=\"let row\"> {{row.b}}</td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <th mat-header-cell *matHeaderCellDef> Column C</th>\n        <td mat-cell *matCellDef=\"let row\"> {{row.c}}</td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnsToRender\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnsToRender\"></tr>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    NativeHtmlTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
    };
    return NativeHtmlTableApp;
}());
var StickyTableApp = /** @class */ (function () {
    function StickyTableApp() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a'];
    }
    StickyTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <table mat-table [dataSource]=\"dataSource\">\n      <ng-container matColumnDef=\"column_a\">\n        <th mat-header-cell *matHeaderCellDef> Column A </th>\n        <td mat-cell *matCellDef=\"let row\"> {{row.a}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"columnsToRender; sticky: true\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: columnsToRender\"></tr>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    StickyTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
    };
    return StickyTableApp;
}());
var MatTableWithWhenRowApp = /** @class */ (function () {
    function MatTableWithWhenRowApp() {
        this.multiTemplateDataRows = false;
        this.dataSource = new FakeDataSource();
        this.isFourthRow = function (i, _rowData) { return i == 3; };
    }
    MatTableWithWhenRowApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\" [multiTemplateDataRows]=\"multiTemplateDataRows\">\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef> Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer A</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"special_column\">\n        <mat-cell *matCellDef=\"let row\"> fourth_row </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"['column_a']\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: ['column_a']\"></mat-row>\n      <mat-row *matRowDef=\"let row; columns: ['special_column']; when: isFourthRow\"></mat-row>\n      <mat-footer-row *matFooterRowDef=\"['column_a']\"></mat-footer-row>\n    </mat-table>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTableWithWhenRowApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
    };
    return MatTableWithWhenRowApp;
}());
var ArrayDataSourceMatTableApp = /** @class */ (function () {
    function ArrayDataSourceMatTableApp() {
        var _this = this;
        this.underlyingDataSource = new FakeDataSource();
        this.dataSource = new table_data_source_1.MatTableDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.underlyingDataSource.data = [];
        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    ArrayDataSourceMatTableApp.prototype.ngOnInit = function () {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    ArrayDataSourceMatTableApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\" matSort>\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef mat-sort-header=\"a\"> Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer A</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <mat-header-cell *matHeaderCellDef> Column B</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.b}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer B</mat-footer-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <mat-header-cell *matHeaderCellDef> Column C</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.c}}</mat-cell>\n        <mat-footer-cell *matFooterCellDef> Footer C</mat-footer-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: columnsToRender\"></mat-row>\n      <mat-footer-row *matFooterRowDef=\"columnsToRender\"></mat-footer-row>\n    </mat-table>\n\n    <mat-paginator [pageSize]=\"5\"></mat-paginator>\n  "
                },] },
    ];
    /** @nocollapse */
    ArrayDataSourceMatTableApp.ctorParameters = function () { return []; };
    ArrayDataSourceMatTableApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
        "paginator": [{ type: core_1.ViewChild, args: [index_1.MatPaginator,] },],
        "sort": [{ type: core_1.ViewChild, args: [index_2.MatSort,] },],
        "sortHeader": [{ type: core_1.ViewChild, args: [index_2.MatSortHeader,] },],
    };
    return ArrayDataSourceMatTableApp;
}());
var MatTableWithSortApp = /** @class */ (function () {
    function MatTableWithSortApp() {
        var _this = this;
        this.underlyingDataSource = new FakeDataSource();
        this.dataSource = new table_data_source_1.MatTableDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.underlyingDataSource.data = [];
        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    MatTableWithSortApp.prototype.ngOnInit = function () {
        this.dataSource.sort = this.sort;
    };
    MatTableWithSortApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\" matSort>\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef mat-sort-header=\"a\"> Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}}</mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <mat-header-cell *matHeaderCellDef> Column B</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.b}}</mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <mat-header-cell *matHeaderCellDef> Column C</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.c}}</mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: columnsToRender\"></mat-row>\n    </mat-table>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTableWithSortApp.ctorParameters = function () { return []; };
    MatTableWithSortApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
        "sort": [{ type: core_1.ViewChild, args: [index_2.MatSort,] },],
    };
    return MatTableWithSortApp;
}());
var MatTableWithPaginatorApp = /** @class */ (function () {
    function MatTableWithPaginatorApp() {
        var _this = this;
        this.underlyingDataSource = new FakeDataSource();
        this.dataSource = new table_data_source_1.MatTableDataSource();
        this.columnsToRender = ['column_a', 'column_b', 'column_c'];
        this.underlyingDataSource.data = [];
        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    MatTableWithPaginatorApp.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    MatTableWithPaginatorApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\">\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef> Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.a}}</mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_b\">\n        <mat-header-cell *matHeaderCellDef> Column B</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.b}}</mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"column_c\">\n        <mat-header-cell *matHeaderCellDef> Column C</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\"> {{row.c}}</mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: columnsToRender\"></mat-row>\n    </mat-table>\n\n    <mat-paginator [pageSize]=\"5\"></mat-paginator>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTableWithPaginatorApp.ctorParameters = function () { return []; };
    MatTableWithPaginatorApp.propDecorators = {
        "table": [{ type: core_1.ViewChild, args: [table_1.MatTable,] },],
        "paginator": [{ type: core_1.ViewChild, args: [index_1.MatPaginator,] },],
    };
    return MatTableWithPaginatorApp;
}());
var TableWithNgContainerRow = /** @class */ (function () {
    function TableWithNgContainerRow() {
        this.dataSource = new FakeDataSource();
        this.columnsToRender = ['column_a'];
    }
    TableWithNgContainerRow.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-table [dataSource]=\"dataSource\">\n      <ng-container matColumnDef=\"column_a\">\n        <mat-header-cell *matHeaderCellDef>Column A</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\">{{row.a}}</mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"columnsToRender\"></mat-header-row>\n      <ng-container *matRowDef=\"let row; columns: columnsToRender\">\n        <mat-row></mat-row>\n      </ng-container>\n    </mat-table>\n  "
                },] },
    ];
    return TableWithNgContainerRow;
}());
function getElements(element, query) {
    return [].slice.call(element.querySelectorAll(query));
}
function getHeaderRows(tableElement) {
    return [].slice.call(tableElement.querySelectorAll('.mat-header-row'));
}
function getFooterRows(tableElement) {
    return [].slice.call(tableElement.querySelectorAll('.mat-footer-row'));
}
function getRows(tableElement) {
    return getElements(tableElement, '.mat-row');
}
function getCells(row) {
    if (!row) {
        return [];
    }
    var cells = getElements(row, 'mat-cell');
    if (!cells.length) {
        cells = getElements(row, 'td');
    }
    return cells;
}
function getHeaderCells(headerRow) {
    var cells = getElements(headerRow, 'mat-header-cell');
    if (!cells.length) {
        cells = getElements(headerRow, 'th');
    }
    return cells;
}
function getFooterCells(footerRow) {
    var cells = getElements(footerRow, 'mat-footer-cell');
    if (!cells.length) {
        cells = getElements(footerRow, 'td');
    }
    return cells;
}
function getActualTableContent(tableElement) {
    var actualTableContent = [];
    getHeaderRows(tableElement).forEach(function (row) {
        actualTableContent.push(getHeaderCells(row));
    });
    // Check data row cells
    var rows = getRows(tableElement).map(function (row) { return getCells(row); });
    actualTableContent = actualTableContent.concat(rows);
    getFooterRows(tableElement).forEach(function (row) {
        actualTableContent.push(getFooterCells(row));
    });
    // Convert the nodes into their text content;
    return actualTableContent.map(function (row) { return row.map(function (cell) { return cell.textContent.trim(); }); });
}
function expectTableToMatchContent(tableElement, expected) {
    var missedExpectations = [];
    function checkCellContent(actualCell, expectedCell) {
        if (actualCell !== expectedCell) {
            missedExpectations.push("Expected cell contents to be " + expectedCell + " but was " + actualCell);
        }
    }
    var actual = getActualTableContent(tableElement);
    // Make sure the number of rows match
    if (actual.length !== expected.length) {
        missedExpectations.push("Expected " + expected.length + " total rows but got " + actual.length);
        fail(missedExpectations.join('\n'));
    }
    actual.forEach(function (row, rowIndex) {
        var expectedRow = expected[rowIndex];
        // Make sure the number of cells match
        if (row.length !== expectedRow.length) {
            missedExpectations.push("Expected " + expectedRow.length + " cells in row but got " + row.length);
            fail(missedExpectations.join('\n'));
        }
        row.forEach(function (actualCell, cellIndex) {
            var expectedCell = expectedRow ? expectedRow[cellIndex] : null;
            checkCellContent(actualCell, expectedCell);
        });
    });
    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}
//# sourceMappingURL=table.spec.js.map