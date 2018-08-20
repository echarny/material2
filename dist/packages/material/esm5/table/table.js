/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, IterableDiffers, Optional, ViewEncapsulation } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
/**
 * Wrapper for the CdkTable with Material design styles.
 * @template T
 */
var MatTable = /** @class */ (function (_super) {
    tslib_1.__extends(MatTable, _super);
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
        /**
         * Overrides the sticky CSS class set by the `CdkTable`.
         */
        _this.stickyCssClass = 'mat-table-sticky';
        return _this;
    }
    MatTable.decorators = [
        { type: Component, args: [{selector: 'mat-table, table[mat-table]',
                    exportAs: 'matTable',
                    template: CDK_TABLE_TEMPLATE,
                    styles: ["mat-table{display:block}mat-header-row{min-height:56px}mat-footer-row,mat-row{min-height:48px}mat-footer-row,mat-header-row,mat-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}mat-footer-row::after,mat-header-row::after,mat-row::after{display:inline-block;min-height:inherit;content:''}mat-cell:first-child,mat-footer-cell:first-child,mat-header-cell:first-child{padding-left:24px}[dir=rtl] mat-cell:first-child,[dir=rtl] mat-footer-cell:first-child,[dir=rtl] mat-header-cell:first-child{padding-left:0;padding-right:24px}mat-cell:last-child,mat-footer-cell:last-child,mat-header-cell:last-child{padding-right:24px}[dir=rtl] mat-cell:last-child,[dir=rtl] mat-footer-cell:last-child,[dir=rtl] mat-header-cell:last-child{padding-right:0;padding-left:24px}mat-cell,mat-footer-cell,mat-header-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.mat-table{border-spacing:0}tr.mat-header-row{height:56px}tr.mat-footer-row,tr.mat-row{height:48px}th.mat-header-cell{text-align:left}td.mat-cell,td.mat-footer-cell,th.mat-header-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}td.mat-cell:first-child,td.mat-footer-cell:first-child,th.mat-header-cell:first-child{padding-left:24px}td.mat-cell:last-child,td.mat-footer-cell:last-child,th.mat-header-cell:last-child{padding-right:24px}"],
                    host: {
                        'class': 'mat-table',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTable.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Attribute, args: ['role',] },] },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    return MatTable;
}(CdkTable));
export { MatTable };
function MatTable_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTable.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTable.ctorParameters;
    /**
     * Overrides the sticky CSS class set by the `CdkTable`.
     * @type {?}
     */
    MatTable.prototype.stickyCssClass;
    /** @type {?} */
    MatTable.prototype._differs;
    /** @type {?} */
    MatTable.prototype._changeDetectorRef;
    /** @type {?} */
    MatTable.prototype._elementRef;
    /** @type {?} */
    MatTable.prototype._dir;
}
//# sourceMappingURL=table.js.map