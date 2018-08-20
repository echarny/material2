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
import { Component, ViewEncapsulation, Input, ContentChildren, QueryList, ElementRef, Optional, ChangeDetectionStrategy, } from '@angular/core';
import { MatGridTile } from './grid-tile';
import { TileCoordinator } from './tile-coordinator';
import { FitTileStyler, RatioTileStyler, FixedTileStyler } from './tile-styler';
import { Directionality } from '@angular/cdk/bidi';
import { coerceToString, coerceToNumber, } from './grid-list-measure';
// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
var /** @type {?} */ MAT_FIT_MODE = 'fit';
var MatGridList = /** @class */ (function () {
    function MatGridList(_element, _dir) {
        this._element = _element;
        this._dir = _dir;
        /**
         * The amount of space between tiles. This will be something like '5px' or '2em'.
         */
        this._gutter = '1px';
    }
    Object.defineProperty(MatGridList.prototype, "cols", {
        get: /**
         * Amount of columns in the grid list.
         * @return {?}
         */
        function () { return this._cols; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._cols = coerceToNumber(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatGridList.prototype, "gutterSize", {
        get: /**
         * Size of the grid list's gutter in pixels.
         * @return {?}
         */
        function () { return this._gutter; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._gutter = coerceToString(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatGridList.prototype, "rowHeight", {
        set: /**
         * Set internal representation of row height from the user-provided value.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = coerceToString(value);
            if (newValue !== this._rowHeight) {
                this._rowHeight = newValue;
                this._setTileStyler(this._rowHeight);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatGridList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._checkCols();
        this._checkRowHeight();
    };
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     */
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     * @return {?}
     */
    MatGridList.prototype.ngAfterContentChecked = /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     * @return {?}
     */
    function () {
        this._layoutTiles();
    };
    /**
     * Throw a friendly error if cols property is missing
     * @return {?}
     */
    MatGridList.prototype._checkCols = /**
     * Throw a friendly error if cols property is missing
     * @return {?}
     */
    function () {
        if (!this.cols) {
            throw Error("mat-grid-list: must pass in number of columns. " +
                "Example: <mat-grid-list cols=\"3\">");
        }
    };
    /**
     * Default to equal width:height if rowHeight property is missing
     * @return {?}
     */
    MatGridList.prototype._checkRowHeight = /**
     * Default to equal width:height if rowHeight property is missing
     * @return {?}
     */
    function () {
        if (!this._rowHeight) {
            this._setTileStyler('1:1');
        }
    };
    /**
     * Creates correct Tile Styler subtype based on rowHeight passed in by user
     * @param {?} rowHeight
     * @return {?}
     */
    MatGridList.prototype._setTileStyler = /**
     * Creates correct Tile Styler subtype based on rowHeight passed in by user
     * @param {?} rowHeight
     * @return {?}
     */
    function (rowHeight) {
        if (this._tileStyler) {
            this._tileStyler.reset(this);
        }
        if (rowHeight === MAT_FIT_MODE) {
            this._tileStyler = new FitTileStyler();
        }
        else if (rowHeight && rowHeight.indexOf(':') > -1) {
            this._tileStyler = new RatioTileStyler(rowHeight);
        }
        else {
            this._tileStyler = new FixedTileStyler(rowHeight);
        }
    };
    /**
     * Computes and applies the size and position for all children grid tiles.
     * @return {?}
     */
    MatGridList.prototype._layoutTiles = /**
     * Computes and applies the size and position for all children grid tiles.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ tracker = new TileCoordinator(this.cols, this._tiles);
        var /** @type {?} */ direction = this._dir ? this._dir.value : 'ltr';
        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
        this._tiles.forEach(function (tile, index) {
            var /** @type {?} */ pos = tracker.positions[index];
            _this._tileStyler.setStyle(tile, pos.row, pos.col);
        });
        this._setListStyle(this._tileStyler.getComputedHeight());
    };
    /** Sets style on the main grid-list element, given the style name and value. */
    /**
     * Sets style on the main grid-list element, given the style name and value.
     * @param {?} style
     * @return {?}
     */
    MatGridList.prototype._setListStyle = /**
     * Sets style on the main grid-list element, given the style name and value.
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style) {
            this._element.nativeElement.style[style[0]] = style[1];
        }
    };
    MatGridList.decorators = [
        { type: Component, args: [{selector: 'mat-grid-list',
                    exportAs: 'matGridList',
                    template: "<div><ng-content></ng-content></div>",
                    styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}"],
                    host: {
                        'class': 'mat-grid-list',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatGridList.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    MatGridList.propDecorators = {
        "_tiles": [{ type: ContentChildren, args: [MatGridTile,] },],
        "cols": [{ type: Input },],
        "gutterSize": [{ type: Input },],
        "rowHeight": [{ type: Input },],
    };
    return MatGridList;
}());
export { MatGridList };
function MatGridList_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatGridList.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatGridList.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatGridList.propDecorators;
    /**
     * Number of columns being rendered.
     * @type {?}
     */
    MatGridList.prototype._cols;
    /**
     * Row height value passed in by user. This can be one of three types:
     * - Number value (ex: "100px"):  sets a fixed row height to that value
     * - Ratio value (ex: "4:3"): sets the row height based on width:height ratio
     * - "Fit" mode (ex: "fit"): sets the row height to total height divided by number of rows
     * @type {?}
     */
    MatGridList.prototype._rowHeight;
    /**
     * The amount of space between tiles. This will be something like '5px' or '2em'.
     * @type {?}
     */
    MatGridList.prototype._gutter;
    /**
     * Sets position and size styles for a tile
     * @type {?}
     */
    MatGridList.prototype._tileStyler;
    /**
     * Query list of tiles that are being rendered.
     * @type {?}
     */
    MatGridList.prototype._tiles;
    /** @type {?} */
    MatGridList.prototype._element;
    /** @type {?} */
    MatGridList.prototype._dir;
}
//# sourceMappingURL=grid-list.js.map