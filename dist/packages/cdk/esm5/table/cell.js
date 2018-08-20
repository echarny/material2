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
import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinHasStickyInput } from './can-stick';
/**
 * Base interface for a cell definition. Captures a column's cell template definition.
 * @record
 */
export function CellDef() { }
function CellDef_tsickle_Closure_declarations() {
    /** @type {?} */
    CellDef.prototype.template;
}
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = /** @class */ (function () {
    function CdkCellDef(template) {
        this.template = template;
    }
    CdkCellDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkCellDef]' },] },
    ];
    /** @nocollapse */
    CdkCellDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkCellDef;
}());
export { CdkCellDef };
function CdkCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkCellDef.ctorParameters;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkCellDef.prototype.template;
}
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = /** @class */ (function () {
    function CdkHeaderCellDef(template) {
        this.template = template;
    }
    CdkHeaderCellDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
    ];
    /** @nocollapse */
    CdkHeaderCellDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkHeaderCellDef;
}());
export { CdkHeaderCellDef };
function CdkHeaderCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkHeaderCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkHeaderCellDef.ctorParameters;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkHeaderCellDef.prototype.template;
}
/**
 * Footer cell definition for a CDK table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var CdkFooterCellDef = /** @class */ (function () {
    function CdkFooterCellDef(template) {
        this.template = template;
    }
    CdkFooterCellDef.decorators = [
        { type: Directive, args: [{ selector: '[cdkFooterCellDef]' },] },
    ];
    /** @nocollapse */
    CdkFooterCellDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return CdkFooterCellDef;
}());
export { CdkFooterCellDef };
function CdkFooterCellDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkFooterCellDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkFooterCellDef.ctorParameters;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkFooterCellDef.prototype.template;
}
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
CdkColumnDefBase = /** @class */ (function () {
    function CdkColumnDefBase() {
    }
    return CdkColumnDefBase;
}());
/**
 * \@docs-private
 */
export { CdkColumnDefBase };
export var /** @type {?} */ _CdkColumnDefBase = mixinHasStickyInput(CdkColumnDefBase);
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = /** @class */ (function (_super) {
    tslib_1.__extends(CdkColumnDef, _super);
    function CdkColumnDef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._stickyEnd = false;
        return _this;
    }
    Object.defineProperty(CdkColumnDef.prototype, "name", {
        get: /**
         * Unique name for this column.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            // If the directive is set without a name (updated programatically), then this setter will
            // trigger with an empty string and should not overwrite the programatically set value.
            if (!name) {
                return;
            }
            this._name = name;
            this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkColumnDef.prototype, "stickyEnd", {
        get: /**
         * Whether this column should be sticky positioned on the end of the row. Should make sure
         * that it mimics the `CanStick` mixin such that `_hasStickyChanged` is set to true if the value
         * has been changed.
         * @return {?}
         */
        function () { return this._stickyEnd; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ prevValue = this._stickyEnd;
            this._stickyEnd = coerceBooleanProperty(v);
            this._hasStickyChanged = prevValue !== this._stickyEnd;
        },
        enumerable: true,
        configurable: true
    });
    CdkColumnDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkColumnDef]',
                    inputs: ['sticky']
                },] },
    ];
    /** @nocollapse */
    CdkColumnDef.propDecorators = {
        "name": [{ type: Input, args: ['cdkColumnDef',] },],
        "stickyEnd": [{ type: Input, args: ['stickyEnd',] },],
        "cell": [{ type: ContentChild, args: [CdkCellDef,] },],
        "headerCell": [{ type: ContentChild, args: [CdkHeaderCellDef,] },],
        "footerCell": [{ type: ContentChild, args: [CdkFooterCellDef,] },],
    };
    return CdkColumnDef;
}(_CdkColumnDefBase));
export { CdkColumnDef };
function CdkColumnDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkColumnDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkColumnDef.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkColumnDef.propDecorators;
    /** @type {?} */
    CdkColumnDef.prototype._name;
    /** @type {?} */
    CdkColumnDef.prototype._stickyEnd;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkColumnDef.prototype.cell;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkColumnDef.prototype.headerCell;
    /**
     * \@docs-private
     * @type {?}
     */
    CdkColumnDef.prototype.footerCell;
    /**
     * Transformed version of the column name that can be used as part of a CSS classname. Excludes
     * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
     * do not match are replaced by the '-' character.
     * @type {?}
     */
    CdkColumnDef.prototype.cssClassFriendlyName;
}
/**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
var /**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
BaseCdkCell = /** @class */ (function () {
    function BaseCdkCell(columnDef, elementRef) {
        var /** @type {?} */ columnClassName = "cdk-column-" + columnDef.cssClassFriendlyName;
        elementRef.nativeElement.classList.add(columnClassName);
    }
    return BaseCdkCell;
}());
/**
 * Base class for the cells. Adds a CSS classname that identifies the column it renders in.
 */
export { BaseCdkCell };
/**
 * Header cell template container that adds the right classes and role.
 */
var CdkHeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(CdkHeaderCell, _super);
    function CdkHeaderCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkHeaderCell.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-header-cell, th[cdk-header-cell]',
                    host: {
                        'class': 'cdk-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkHeaderCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return CdkHeaderCell;
}(BaseCdkCell));
export { CdkHeaderCell };
function CdkHeaderCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkHeaderCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkHeaderCell.ctorParameters;
}
/**
 * Footer cell template container that adds the right classes and role.
 */
var CdkFooterCell = /** @class */ (function (_super) {
    tslib_1.__extends(CdkFooterCell, _super);
    function CdkFooterCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkFooterCell.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-footer-cell, td[cdk-footer-cell]',
                    host: {
                        'class': 'cdk-footer-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkFooterCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return CdkFooterCell;
}(BaseCdkCell));
export { CdkFooterCell };
function CdkFooterCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkFooterCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkFooterCell.ctorParameters;
}
/**
 * Cell template container that adds the right classes and role.
 */
var CdkCell = /** @class */ (function (_super) {
    tslib_1.__extends(CdkCell, _super);
    function CdkCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkCell.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-cell, td[cdk-cell]',
                    host: {
                        'class': 'cdk-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: ElementRef, },
    ]; };
    return CdkCell;
}(BaseCdkCell));
export { CdkCell };
function CdkCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkCell.ctorParameters;
}
//# sourceMappingURL=cell.js.map