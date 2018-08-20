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
import { Directive, ElementRef, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var MatCellDef = /** @class */ (function (_super) {
    tslib_1.__extends(MatCellDef, _super);
    function MatCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: MatCellDef }]
                },] },
    ];
    return MatCellDef;
}(CdkCellDef));
export { MatCellDef };
function MatCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatCellDef.ctorParameters;
}
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var MatHeaderCellDef = /** @class */ (function (_super) {
    tslib_1.__extends(MatHeaderCellDef, _super);
    function MatHeaderCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatHeaderCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: MatHeaderCellDef }]
                },] },
    ];
    return MatHeaderCellDef;
}(CdkHeaderCellDef));
export { MatHeaderCellDef };
function MatHeaderCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatHeaderCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatHeaderCellDef.ctorParameters;
}
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var MatFooterCellDef = /** @class */ (function (_super) {
    tslib_1.__extends(MatFooterCellDef, _super);
    function MatFooterCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatFooterCellDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: CdkFooterCellDef, useExisting: MatFooterCellDef }]
                },] },
    ];
    return MatFooterCellDef;
}(CdkFooterCellDef));
export { MatFooterCellDef };
function MatFooterCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatFooterCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatFooterCellDef.ctorParameters;
}
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
var MatColumnDef = /** @class */ (function (_super) {
    tslib_1.__extends(MatColumnDef, _super);
    function MatColumnDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatColumnDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matColumnDef]',
                    providers: [{ provide: CdkColumnDef, useExisting: MatColumnDef }],
                },] },
    ];
    /** @nocollapse */
    MatColumnDef.propDecorators = {
        "name": [{ type: Input, args: ['matColumnDef',] },],
        "sticky": [{ type: Input },],
        "stickyEnd": [{ type: Input },],
    };
    return MatColumnDef;
}(CdkColumnDef));
export { MatColumnDef };
function MatColumnDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatColumnDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatColumnDef.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatColumnDef.propDecorators;
    /**
     * Unique name for this column.
     * @type {?}
     */
    MatColumnDef.prototype.name;
    /**
     * Whether this column should be sticky positioned at the start of the row
     * @type {?}
     */
    MatColumnDef.prototype.sticky;
    /**
     * Whether this column should be sticky positioned on the end of the row
     * @type {?}
     */
    MatColumnDef.prototype.stickyEnd;
}
/**
 * Header cell template container that adds the right classes and role.
 */
var MatHeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(MatHeaderCell, _super);
    function MatHeaderCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatHeaderCell.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-header-cell, th[mat-header-cell]',
                    host: {
                        'class': 'mat-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    MatHeaderCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return MatHeaderCell;
}(CdkHeaderCell));
export { MatHeaderCell };
function MatHeaderCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatHeaderCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatHeaderCell.ctorParameters;
}
/**
 * Footer cell template container that adds the right classes and role.
 */
var MatFooterCell = /** @class */ (function (_super) {
    tslib_1.__extends(MatFooterCell, _super);
    function MatFooterCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatFooterCell.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-footer-cell, td[mat-footer-cell]',
                    host: {
                        'class': 'mat-footer-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatFooterCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return MatFooterCell;
}(CdkFooterCell));
export { MatFooterCell };
function MatFooterCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatFooterCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatFooterCell.ctorParameters;
}
/**
 * Cell template container that adds the right classes and role.
 */
var MatCell = /** @class */ (function (_super) {
    tslib_1.__extends(MatCell, _super);
    function MatCell(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("mat-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    MatCell.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-cell, td[mat-cell]',
                    host: {
                        'class': 'mat-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    MatCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return MatCell;
}(CdkCell));
export { MatCell };
function MatCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatCell.ctorParameters;
}
//# sourceMappingURL=cell.js.map