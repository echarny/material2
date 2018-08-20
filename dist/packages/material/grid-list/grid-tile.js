"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var grid_list_measure_1 = require("./grid-list-measure");
var MatGridTile = /** @class */ (function () {
    function MatGridTile(_element) {
        this._element = _element;
        this._rowspan = 1;
        this._colspan = 1;
    }
    Object.defineProperty(MatGridTile.prototype, "rowspan", {
        get: /** Amount of rows that the grid tile takes up. */
        function () { return this._rowspan; },
        set: function (value) { this._rowspan = grid_list_measure_1.coerceToNumber(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatGridTile.prototype, "colspan", {
        get: /** Amount of columns that the grid tile takes up. */
        function () { return this._colspan; },
        set: function (value) { this._colspan = grid_list_measure_1.coerceToNumber(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     */
    /**
       * Sets the style of the grid-tile element.  Needs to be set manually to avoid
       * "Changed after checked" errors that would occur with HostBinding.
       */
    MatGridTile.prototype._setStyle = /**
       * Sets the style of the grid-tile element.  Needs to be set manually to avoid
       * "Changed after checked" errors that would occur with HostBinding.
       */
    function (property, value) {
        this._element.nativeElement.style[property] = value;
    };
    MatGridTile.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-grid-tile',
                    exportAs: 'matGridTile',
                    host: {
                        'class': 'mat-grid-tile',
                    },
                    template: "<figure class=\"mat-figure\"><ng-content></ng-content></figure>",
                    styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatGridTile.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    MatGridTile.propDecorators = {
        "rowspan": [{ type: core_1.Input },],
        "colspan": [{ type: core_1.Input },],
    };
    return MatGridTile;
}());
exports.MatGridTile = MatGridTile;
var MatGridTileText = /** @class */ (function () {
    function MatGridTileText(_element) {
        this._element = _element;
    }
    MatGridTileText.prototype.ngAfterContentInit = function () {
        this._lineSetter = new core_2.MatLineSetter(this._lines, this._element);
    };
    MatGridTileText.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-grid-tile-header, mat-grid-tile-footer',
                    template: "<ng-content select=\"[mat-grid-avatar], [matGridAvatar]\"></ng-content><div class=\"mat-grid-list-text\"><ng-content select=\"[mat-line], [matLine]\"></ng-content></div><ng-content></ng-content>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatGridTileText.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    MatGridTileText.propDecorators = {
        "_lines": [{ type: core_1.ContentChildren, args: [core_2.MatLine,] },],
    };
    return MatGridTileText;
}());
exports.MatGridTileText = MatGridTileText;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
var MatGridAvatarCssMatStyler = /** @class */ (function () {
    function MatGridAvatarCssMatStyler() {
    }
    MatGridAvatarCssMatStyler.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-grid-avatar], [matGridAvatar]',
                    host: { 'class': 'mat-grid-avatar' }
                },] },
    ];
    return MatGridAvatarCssMatStyler;
}());
exports.MatGridAvatarCssMatStyler = MatGridAvatarCssMatStyler;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
var MatGridTileHeaderCssMatStyler = /** @class */ (function () {
    function MatGridTileHeaderCssMatStyler() {
    }
    MatGridTileHeaderCssMatStyler.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-grid-tile-header',
                    host: { 'class': 'mat-grid-tile-header' }
                },] },
    ];
    return MatGridTileHeaderCssMatStyler;
}());
exports.MatGridTileHeaderCssMatStyler = MatGridTileHeaderCssMatStyler;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
var MatGridTileFooterCssMatStyler = /** @class */ (function () {
    function MatGridTileFooterCssMatStyler() {
    }
    MatGridTileFooterCssMatStyler.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-grid-tile-footer',
                    host: { 'class': 'mat-grid-tile-footer' }
                },] },
    ];
    return MatGridTileFooterCssMatStyler;
}());
exports.MatGridTileFooterCssMatStyler = MatGridTileFooterCssMatStyler;
//# sourceMappingURL=grid-tile.js.map