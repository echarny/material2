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
var grid_tile_1 = require("./grid-tile");
var tile_coordinator_1 = require("./tile-coordinator");
var tile_styler_1 = require("./tile-styler");
var bidi_1 = require("@angular/cdk/bidi");
var grid_list_measure_1 = require("./grid-list-measure");
// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
var MAT_FIT_MODE = 'fit';
var MatGridList = /** @class */ (function () {
    function MatGridList(_element, _dir) {
        this._element = _element;
        this._dir = _dir;
        /** The amount of space between tiles. This will be something like '5px' or '2em'. */
        this._gutter = '1px';
    }
    Object.defineProperty(MatGridList.prototype, "cols", {
        get: /** Amount of columns in the grid list. */
        function () { return this._cols; },
        set: function (value) { this._cols = grid_list_measure_1.coerceToNumber(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatGridList.prototype, "gutterSize", {
        get: /** Size of the grid list's gutter in pixels. */
        function () { return this._gutter; },
        set: function (value) { this._gutter = grid_list_measure_1.coerceToString(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatGridList.prototype, "rowHeight", {
        set: /** Set internal representation of row height from the user-provided value. */
        function (value) {
            var newValue = grid_list_measure_1.coerceToString(value);
            if (newValue !== this._rowHeight) {
                this._rowHeight = newValue;
                this._setTileStyler(this._rowHeight);
            }
        },
        enumerable: true,
        configurable: true
    });
    MatGridList.prototype.ngOnInit = function () {
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
       */
    MatGridList.prototype.ngAfterContentChecked = /**
       * The layout calculation is fairly cheap if nothing changes, so there's little cost
       * to run it frequently.
       */
    function () {
        this._layoutTiles();
    };
    /** Throw a friendly error if cols property is missing */
    /** Throw a friendly error if cols property is missing */
    MatGridList.prototype._checkCols = /** Throw a friendly error if cols property is missing */
    function () {
        if (!this.cols) {
            throw Error("mat-grid-list: must pass in number of columns. " +
                "Example: <mat-grid-list cols=\"3\">");
        }
    };
    /** Default to equal width:height if rowHeight property is missing */
    /** Default to equal width:height if rowHeight property is missing */
    MatGridList.prototype._checkRowHeight = /** Default to equal width:height if rowHeight property is missing */
    function () {
        if (!this._rowHeight) {
            this._setTileStyler('1:1');
        }
    };
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    MatGridList.prototype._setTileStyler = /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    function (rowHeight) {
        if (this._tileStyler) {
            this._tileStyler.reset(this);
        }
        if (rowHeight === MAT_FIT_MODE) {
            this._tileStyler = new tile_styler_1.FitTileStyler();
        }
        else if (rowHeight && rowHeight.indexOf(':') > -1) {
            this._tileStyler = new tile_styler_1.RatioTileStyler(rowHeight);
        }
        else {
            this._tileStyler = new tile_styler_1.FixedTileStyler(rowHeight);
        }
    };
    /** Computes and applies the size and position for all children grid tiles. */
    /** Computes and applies the size and position for all children grid tiles. */
    MatGridList.prototype._layoutTiles = /** Computes and applies the size and position for all children grid tiles. */
    function () {
        var _this = this;
        var tracker = new tile_coordinator_1.TileCoordinator(this.cols, this._tiles);
        var direction = this._dir ? this._dir.value : 'ltr';
        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
        this._tiles.forEach(function (tile, index) {
            var pos = tracker.positions[index];
            _this._tileStyler.setStyle(tile, pos.row, pos.col);
        });
        this._setListStyle(this._tileStyler.getComputedHeight());
    };
    /** Sets style on the main grid-list element, given the style name and value. */
    /** Sets style on the main grid-list element, given the style name and value. */
    MatGridList.prototype._setListStyle = /** Sets style on the main grid-list element, given the style name and value. */
    function (style) {
        if (style) {
            this._element.nativeElement.style[style[0]] = style[1];
        }
    };
    MatGridList.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-grid-list',
                    exportAs: 'matGridList',
                    template: "<div><ng-content></ng-content></div>",
                    styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}"],
                    host: {
                        'class': 'mat-grid-list',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatGridList.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatGridList.propDecorators = {
        "_tiles": [{ type: core_1.ContentChildren, args: [grid_tile_1.MatGridTile,] },],
        "cols": [{ type: core_1.Input },],
        "gutterSize": [{ type: core_1.Input },],
        "rowHeight": [{ type: core_1.Input },],
    };
    return MatGridList;
}());
exports.MatGridList = MatGridList;
//# sourceMappingURL=grid-list.js.map