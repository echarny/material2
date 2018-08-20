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
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var MatHeaderRowDef = /** @class */ (function (_super) {
    __extends(MatHeaderRowDef, _super);
    function MatHeaderRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRowDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: table_1.CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                },] },
    ];
    return MatHeaderRowDef;
}(table_1.CdkHeaderRowDef));
exports.MatHeaderRowDef = MatHeaderRowDef;
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
var MatFooterRowDef = /** @class */ (function (_super) {
    __extends(MatFooterRowDef, _super);
    function MatFooterRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatFooterRowDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: table_1.CdkFooterRowDef, useExisting: MatFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                },] },
    ];
    return MatFooterRowDef;
}(table_1.CdkFooterRowDef));
exports.MatFooterRowDef = MatFooterRowDef;
/**
 * Data row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
var MatRowDef = /** @class */ (function (_super) {
    __extends(MatRowDef, _super);
    function MatRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRowDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: table_1.CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                },] },
    ];
    return MatRowDef;
}(table_1.CdkRowDef));
exports.MatRowDef = MatRowDef;
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var MatHeaderRow = /** @class */ (function (_super) {
    __extends(MatHeaderRow, _super);
    function MatHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderRow.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-header-row, tr[mat-header-row]',
                    template: table_1.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-header-row',
                        'role': 'row',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    providers: [{ provide: table_1.CdkHeaderRow, useExisting: MatHeaderRow }],
                },] },
    ];
    return MatHeaderRow;
}(table_1.CdkHeaderRow));
exports.MatHeaderRow = MatHeaderRow;
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var MatFooterRow = /** @class */ (function (_super) {
    __extends(MatFooterRow, _super);
    function MatFooterRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatFooterRow.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-footer-row, tr[mat-footer-row]',
                    template: table_1.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-footer-row',
                        'role': 'row',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matFooterRow',
                    providers: [{ provide: table_1.CdkFooterRow, useExisting: MatFooterRow }],
                },] },
    ];
    return MatFooterRow;
}(table_1.CdkFooterRow));
exports.MatFooterRow = MatFooterRow;
/** Data row template container that contains the cell outlet. Adds the right class and role. */
var MatRow = /** @class */ (function (_super) {
    __extends(MatRow, _super);
    function MatRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatRow.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-row, tr[mat-row]',
                    template: table_1.CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-row',
                        'role': 'row',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matRow',
                    providers: [{ provide: table_1.CdkRow, useExisting: MatRow }],
                },] },
    ];
    return MatRow;
}(table_1.CdkRow));
exports.MatRow = MatRow;
//# sourceMappingURL=row.js.map