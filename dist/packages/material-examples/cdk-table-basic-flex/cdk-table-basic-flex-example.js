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
var rxjs_1 = require("rxjs");
var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
/**
 * @title Basic use of `<cdk-table>` (uses display flex)
 */
var CdkTableBasicFlexExample = /** @class */ (function () {
    function CdkTableBasicFlexExample() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new ExampleDataSource();
    }
    CdkTableBasicFlexExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cdk-table-basic-flex-example',
                    styles: ["/** * Add basic flex styling so that the cells evenly space themselves in the row. */ cdk-row, cdk-header-row, cdk-footer-row { display: flex; } cdk-cell, cdk-header-cell, cdk-footer-cell { flex: 1; } "],
                    template: "<cdk-table [dataSource]=\"dataSource\"><ng-container cdkColumnDef=\"position\"><cdk-header-cell *cdkHeaderCellDef>No.</cdk-header-cell><cdk-cell *cdkCellDef=\"let element\">{{element.position}}</cdk-cell></ng-container><ng-container cdkColumnDef=\"name\"><cdk-header-cell *cdkHeaderCellDef>Name</cdk-header-cell><cdk-cell *cdkCellDef=\"let element\">{{element.name}}</cdk-cell></ng-container><ng-container cdkColumnDef=\"weight\"><cdk-header-cell *cdkHeaderCellDef>Weight</cdk-header-cell><cdk-cell *cdkCellDef=\"let element\">{{element.weight}}</cdk-cell></ng-container><ng-container cdkColumnDef=\"symbol\"><cdk-header-cell *cdkHeaderCellDef>Symbol</cdk-header-cell><cdk-cell *cdkCellDef=\"let element\">{{element.symbol}}</cdk-cell></ng-container><cdk-header-row *cdkHeaderRowDef=\"displayedColumns\"></cdk-header-row><cdk-row *cdkRowDef=\"let row; columns: displayedColumns;\"></cdk-row></cdk-table>",
                },] },
    ];
    return CdkTableBasicFlexExample;
}());
exports.CdkTableBasicFlexExample = CdkTableBasicFlexExample;
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
var /**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
ExampleDataSource = /** @class */ (function (_super) {
    __extends(ExampleDataSource, _super);
    function ExampleDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Stream of data that is provided to the table. */
        _this.data = new rxjs_1.BehaviorSubject(ELEMENT_DATA);
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ExampleDataSource.prototype.connect = /** Connect function called by the table to retrieve one stream containing the data to render. */
    function () {
        return this.data;
    };
    ExampleDataSource.prototype.disconnect = function () { };
    return ExampleDataSource;
}(collections_1.DataSource));
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=cdk-table-basic-flex-example.js.map