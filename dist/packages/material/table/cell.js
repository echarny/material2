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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var table_1 = require("@angular/cdk/table");
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var MatCellDef = /** @class */ (function (_super) {
    __extends(MatCellDef, _super);
    function MatCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatCellDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: table_1.CdkCellDef, useExisting: MatCellDef }]
                },] },
    ];
    return MatCellDef;
}(table_1.CdkCellDef));
exports.MatCellDef = MatCellDef;
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var MatHeaderCellDef = /** @class */ (function (_super) {
    __extends(MatHeaderCellDef, _super);
    function MatHeaderCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderCellDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: table_1.CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] },
    ];
    return MatHeaderCellDef;
}(table_1.CdkHeaderCellDef));
exports.MatHeaderCellDef = MatHeaderCellDef;
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var MatFooterCellDef = /** @class */ (function (_super) {
    __extends(MatFooterCellDef, _super);
    function MatFooterCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatFooterCellDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: table_1.CdkFooterCellDef, useExisting: MatFooterCellDef }]
                },] },
    ];
    return MatFooterCellDef;
}(table_1.CdkFooterCellDef));
exports.MatFooterCellDef = MatFooterCellDef;
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
var MatColumnDef = /** @class */ (function (_super) {
    __extends(MatColumnDef, _super);
    function MatColumnDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatColumnDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matColumnDef]',
                    providers: [{ provide: table_1.CdkColumnDef, useExisting: MatColumnDef }],
                },] },
    ];
    /** @nocollapse */
    MatColumnDef.propDecorators = {
        "name": [{ type: core_1.Input, args: ['matColumnDef',] },],
        "sticky": [{ type: core_1.Input },],
        "stickyEnd": [{ type: core_1.Input },],
    };
    return MatColumnDef;
}(table_1.CdkColumnDef));
exports.MatColumnDef = MatColumnDef;
/** Header cell template container that adds the right classes and role. */
var MatHeaderCell = /** @class */ (function (_super) {
    __extends(MatHeaderCell, _super);
    function MatHeaderCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatHeaderCell.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-header-cell, th[mat-header-cell]',
                    host: {
                        'class': 'mat-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    MatHeaderCell.ctorParameters = function () { return [
        { type: table_1.CdkColumnDef, },
        { type: core_1.ElementRef, },
    ]; };
    return MatHeaderCell;
}(table_1.CdkHeaderCell));
exports.MatHeaderCell = MatHeaderCell;
/** Footer cell template container that adds the right classes and role. */
var MatFooterCell = /** @class */ (function (_super) {
    __extends(MatFooterCell, _super);
    function MatFooterCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatFooterCell.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-footer-cell, td[mat-footer-cell]',
                    host: {
                        'class': 'mat-footer-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatFooterCell.ctorParameters = function () { return [
        { type: table_1.CdkColumnDef, },
        { type: core_1.ElementRef, },
    ]; };
    return MatFooterCell;
}(table_1.CdkFooterCell));
exports.MatFooterCell = MatFooterCell;
/** Cell template container that adds the right classes and role. */
var MatCell = /** @class */ (function (_super) {
    __extends(MatCell, _super);
    function MatCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatCell.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-cell, td[mat-cell]',
                    host: {
                        'class': 'mat-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatCell.ctorParameters = function () { return [
        { type: table_1.CdkColumnDef, },
        { type: core_1.ElementRef, },
    ]; };
    return MatCell;
}(table_1.CdkCell));
exports.MatCell = MatCell;
//# sourceMappingURL=cell.js.map