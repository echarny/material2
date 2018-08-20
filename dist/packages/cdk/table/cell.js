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
var coercion_1 = require("@angular/cdk/coercion");
var can_stick_1 = require("./can-stick");
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = /** @class */ (function () {
    function CdkCellDef(/** @docs-private */ /** @docs-private */ template) {
        this.template = template;
    }
    CdkCellDef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[cdkCellDef]' },] },
    ];
    /** @nocollapse */
    CdkCellDef.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return CdkCellDef;
}());
exports.CdkCellDef = CdkCellDef;
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = /** @class */ (function () {
    function CdkHeaderCellDef(/** @docs-private */ /** @docs-private */ template) {
        this.template = template;
    }
    CdkHeaderCellDef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
    ];
    /** @nocollapse */
    CdkHeaderCellDef.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return CdkHeaderCellDef;
}());
exports.CdkHeaderCellDef = CdkHeaderCellDef;
/**
 * Footer cell definition for a CDK table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var CdkFooterCellDef = /** @class */ (function () {
    function CdkFooterCellDef(/** @docs-private */ /** @docs-private */ template) {
        this.template = template;
    }
    CdkFooterCellDef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[cdkFooterCellDef]' },] },
    ];
    /** @nocollapse */
    CdkFooterCellDef.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return CdkFooterCellDef;
}());
exports.CdkFooterCellDef = CdkFooterCellDef;
// Boilerplate for applying mixins to CdkColumnDef.
/** @docs-private */
var 
// Boilerplate for applying mixins to CdkColumnDef.
/** @docs-private */
CdkColumnDefBase = /** @class */ (function () {
    function CdkColumnDefBase() {
    }
    return CdkColumnDefBase;
}());
exports.CdkColumnDefBase = CdkColumnDefBase;
exports._CdkColumnDefBase = can_stick_1.mixinHasStickyInput(CdkColumnDefBase);
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = /** @class */ (function (_super) {
    __extends(CdkColumnDef, _super);
    function CdkColumnDef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._stickyEnd = false;
        return _this;
    }
    Object.defineProperty(CdkColumnDef.prototype, "name", {
        get: /** Unique name for this column. */
        function () { return this._name; },
        set: function (name) {
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
           */
        function () { return this._stickyEnd; },
        set: function (v) {
            var prevValue = this._stickyEnd;
            this._stickyEnd = coercion_1.coerceBooleanProperty(v);
            this._hasStickyChanged = prevValue !== this._stickyEnd;
        },
        enumerable: true,
        configurable: true
    });
    CdkColumnDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkColumnDef]',
                    inputs: ['sticky']
                },] },
    ];
    /** @nocollapse */
    CdkColumnDef.propDecorators = {
        "name": [{ type: core_1.Input, args: ['cdkColumnDef',] },],
        "stickyEnd": [{ type: core_1.Input, args: ['stickyEnd',] },],
        "cell": [{ type: core_1.ContentChild, args: [CdkCellDef,] },],
        "headerCell": [{ type: core_1.ContentChild, args: [CdkHeaderCellDef,] },],
        "footerCell": [{ type: core_1.ContentChild, args: [CdkFooterCellDef,] },],
    };
    return CdkColumnDef;
}(exports._CdkColumnDefBase));
exports.CdkColumnDef = CdkColumnDef;
/** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
var /** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
BaseCdkCell = /** @class */ (function () {
    function BaseCdkCell(columnDef, elementRef) {
        var columnClassName = "cdk-column-" + columnDef.cssClassFriendlyName;
        elementRef.nativeElement.classList.add(columnClassName);
    }
    return BaseCdkCell;
}());
exports.BaseCdkCell = BaseCdkCell;
/** Header cell template container that adds the right classes and role. */
var CdkHeaderCell = /** @class */ (function (_super) {
    __extends(CdkHeaderCell, _super);
    function CdkHeaderCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkHeaderCell.decorators = [
        { type: core_1.Directive, args: [{
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
        { type: core_1.ElementRef, },
    ]; };
    return CdkHeaderCell;
}(BaseCdkCell));
exports.CdkHeaderCell = CdkHeaderCell;
/** Footer cell template container that adds the right classes and role. */
var CdkFooterCell = /** @class */ (function (_super) {
    __extends(CdkFooterCell, _super);
    function CdkFooterCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkFooterCell.decorators = [
        { type: core_1.Directive, args: [{
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
        { type: core_1.ElementRef, },
    ]; };
    return CdkFooterCell;
}(BaseCdkCell));
exports.CdkFooterCell = CdkFooterCell;
/** Cell template container that adds the right classes and role. */
var CdkCell = /** @class */ (function (_super) {
    __extends(CdkCell, _super);
    function CdkCell(columnDef, elementRef) {
        return _super.call(this, columnDef, elementRef) || this;
    }
    CdkCell.decorators = [
        { type: core_1.Directive, args: [{
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
        { type: core_1.ElementRef, },
    ]; };
    return CdkCell;
}(BaseCdkCell));
exports.CdkCell = CdkCell;
//# sourceMappingURL=cell.js.map