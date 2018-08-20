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
var bidi_1 = require("@angular/cdk/bidi");
/**
 * Wrapper for the CdkTable with Material design styles.
 */
var MatTable = /** @class */ (function (_super) {
    __extends(MatTable, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTable(_differs, _changeDetectorRef, _elementRef, role, _dir) {
        var _this = _super.call(this, _differs, _changeDetectorRef, _elementRef, role, _dir) || this;
        _this._differs = _differs;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        _this._dir = _dir;
        /** Overrides the sticky CSS class set by the `CdkTable`. */
        _this.stickyCssClass = 'mat-table-sticky';
        return _this;
    }
    MatTable.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-table, table[mat-table]',
                    exportAs: 'matTable',
                    template: table_1.CDK_TABLE_TEMPLATE,
                    styles: ["mat-table{display:block}mat-header-row{min-height:56px}mat-footer-row,mat-row{min-height:48px}mat-footer-row,mat-header-row,mat-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}mat-footer-row::after,mat-header-row::after,mat-row::after{display:inline-block;min-height:inherit;content:''}mat-cell:first-child,mat-footer-cell:first-child,mat-header-cell:first-child{padding-left:24px}[dir=rtl] mat-cell:first-child,[dir=rtl] mat-footer-cell:first-child,[dir=rtl] mat-header-cell:first-child{padding-left:0;padding-right:24px}mat-cell:last-child,mat-footer-cell:last-child,mat-header-cell:last-child{padding-right:24px}[dir=rtl] mat-cell:last-child,[dir=rtl] mat-footer-cell:last-child,[dir=rtl] mat-header-cell:last-child{padding-right:0;padding-left:24px}mat-cell,mat-footer-cell,mat-header-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.mat-table{border-spacing:0}tr.mat-header-row{height:56px}tr.mat-footer-row,tr.mat-row{height:48px}th.mat-header-cell{text-align:left}td.mat-cell,td.mat-footer-cell,th.mat-header-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}td.mat-cell:first-child,td.mat-footer-cell:first-child,th.mat-header-cell:first-child{padding-left:24px}td.mat-cell:last-child,td.mat-footer-cell:last-child,th.mat-header-cell:last-child{padding-right:24px}"],
                    host: {
                        'class': 'mat-table',
                    },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTable.ctorParameters = function () { return [
        { type: core_1.IterableDiffers, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['role',] },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    return MatTable;
}(table_1.CdkTable));
exports.MatTable = MatTable;
//# sourceMappingURL=table.js.map