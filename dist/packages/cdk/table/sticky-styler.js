"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of all possible directions that can be used for sticky positioning.
 * @docs-private
 */
exports.STICKY_DIRECTIONS = ['top', 'bottom', 'left', 'right'];
/**
 * Applies and removes sticky positioning styles to the `CdkTable` rows and columns cells.
 * @docs-private
 */
var /**
 * Applies and removes sticky positioning styles to the `CdkTable` rows and columns cells.
 * @docs-private
 */
StickyStyler = /** @class */ (function () {
    /**
     * @param isNativeHtmlTable Whether the sticky logic should be based on a table
     *     that uses the native `<table>` element.
     * @param stickCellCss The CSS class that will be applied to every row/cell that has
     *     sticky positioning applied.
     * @param direction The directionality context of the table (ltr/rtl); affects column positioning
     *     by reversing left/right positions.
     */
    function StickyStyler(isNativeHtmlTable, stickCellCss, direction) {
        this.isNativeHtmlTable = isNativeHtmlTable;
        this.stickCellCss = stickCellCss;
        this.direction = direction;
    }
    /**
     * Clears the sticky positioning styles from the row and its cells by resetting the `position`
     * style, setting the zIndex to 0, and unsetting each provided sticky direction.
     * @param rows The list of rows that should be cleared from sticking in the provided directions
     * @param stickyDirections The directions that should no longer be set as sticky on the rows.
     */
    /**
       * Clears the sticky positioning styles from the row and its cells by resetting the `position`
       * style, setting the zIndex to 0, and unsetting each provided sticky direction.
       * @param rows The list of rows that should be cleared from sticking in the provided directions
       * @param stickyDirections The directions that should no longer be set as sticky on the rows.
       */
    StickyStyler.prototype.clearStickyPositioning = /**
       * Clears the sticky positioning styles from the row and its cells by resetting the `position`
       * style, setting the zIndex to 0, and unsetting each provided sticky direction.
       * @param rows The list of rows that should be cleared from sticking in the provided directions
       * @param stickyDirections The directions that should no longer be set as sticky on the rows.
       */
    function (rows, stickyDirections) {
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            // If the row isn't an element (e.g. if it's an `ng-container`),
            // it won't have inline styles or `children` so we skip it.
            if (row.nodeType !== row.ELEMENT_NODE) {
                continue;
            }
            this._removeStickyStyle(row, stickyDirections);
            for (var i = 0; i < row.children.length; i++) {
                var cell = row.children[i];
                this._removeStickyStyle(cell, stickyDirections);
            }
        }
    };
    /**
     * Applies sticky left and right positions to the cells of each row according to the sticky
     * states of the rendered column definitions.
     * @param rows The rows that should have its set of cells stuck according to the sticky states.
     * @param stickyStartStates A list of boolean states where each state represents whether the cell
     *     in this index position should be stuck to the start of the row.
     * @param stickyEndStates A list of boolean states where each state represents whether the cell
     *     in this index position should be stuck to the end of the row.
     */
    /**
       * Applies sticky left and right positions to the cells of each row according to the sticky
       * states of the rendered column definitions.
       * @param rows The rows that should have its set of cells stuck according to the sticky states.
       * @param stickyStartStates A list of boolean states where each state represents whether the cell
       *     in this index position should be stuck to the start of the row.
       * @param stickyEndStates A list of boolean states where each state represents whether the cell
       *     in this index position should be stuck to the end of the row.
       */
    StickyStyler.prototype.updateStickyColumns = /**
       * Applies sticky left and right positions to the cells of each row according to the sticky
       * states of the rendered column definitions.
       * @param rows The rows that should have its set of cells stuck according to the sticky states.
       * @param stickyStartStates A list of boolean states where each state represents whether the cell
       *     in this index position should be stuck to the start of the row.
       * @param stickyEndStates A list of boolean states where each state represents whether the cell
       *     in this index position should be stuck to the end of the row.
       */
    function (rows, stickyStartStates, stickyEndStates) {
        var hasStickyColumns = stickyStartStates.some(function (state) { return state; }) || stickyEndStates.some(function (state) { return state; });
        if (!rows.length || !hasStickyColumns) {
            return;
        }
        var firstRow = rows[0];
        var numCells = firstRow.children.length;
        var cellWidths = this._getCellWidths(firstRow);
        var startPositions = this._getStickyStartColumnPositions(cellWidths, stickyStartStates);
        var endPositions = this._getStickyEndColumnPositions(cellWidths, stickyEndStates);
        var isRtl = this.direction === 'rtl';
        for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
            var row = rows_2[_i];
            for (var i = 0; i < numCells; i++) {
                var cell = row.children[i];
                if (stickyStartStates[i]) {
                    this._addStickyStyle(cell, isRtl ? 'right' : 'left', startPositions[i]);
                }
                if (stickyEndStates[i]) {
                    this._addStickyStyle(cell, isRtl ? 'left' : 'right', endPositions[i]);
                }
            }
        }
    };
    /**
     * Applies sticky positioning to the row's cells if using the native table layout, and to the
     * row itself otherwise.
     * @param rowsToStick The list of rows that should be stuck according to their corresponding
     *     sticky state and to the provided top or bottom position.
     * @param stickyStates A list of boolean states where each state represents whether the row
     *     should be stuck in the particular top or bottom position.
     * @param position The position direction in which the row should be stuck if that row should be
     *     sticky.
     *
     */
    /**
       * Applies sticky positioning to the row's cells if using the native table layout, and to the
       * row itself otherwise.
       * @param rowsToStick The list of rows that should be stuck according to their corresponding
       *     sticky state and to the provided top or bottom position.
       * @param stickyStates A list of boolean states where each state represents whether the row
       *     should be stuck in the particular top or bottom position.
       * @param position The position direction in which the row should be stuck if that row should be
       *     sticky.
       *
       */
    StickyStyler.prototype.stickRows = /**
       * Applies sticky positioning to the row's cells if using the native table layout, and to the
       * row itself otherwise.
       * @param rowsToStick The list of rows that should be stuck according to their corresponding
       *     sticky state and to the provided top or bottom position.
       * @param stickyStates A list of boolean states where each state represents whether the row
       *     should be stuck in the particular top or bottom position.
       * @param position The position direction in which the row should be stuck if that row should be
       *     sticky.
       *
       */
    function (rowsToStick, stickyStates, position) {
        // If positioning the rows to the bottom, reverse their order when evaluating the sticky
        // position such that the last row stuck will be "bottom: 0px" and so on.
        var rows = position === 'bottom' ? rowsToStick.reverse() : rowsToStick;
        var stickyHeight = 0;
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            if (!stickyStates[rowIndex]) {
                continue;
            }
            var row = rows[rowIndex];
            if (this.isNativeHtmlTable) {
                for (var j = 0; j < row.children.length; j++) {
                    var cell = row.children[j];
                    this._addStickyStyle(cell, position, stickyHeight);
                }
            }
            else {
                // Flex does not respect the stick positioning on the cells, needs to be applied to the row.
                // If this is applied on a native table, Safari causes the header to fly in wrong direction.
                this._addStickyStyle(row, position, stickyHeight);
            }
            stickyHeight += row.getBoundingClientRect().height;
        }
    };
    /**
     * When using the native table in Safari, sticky footer cells do not stick. The only way to stick
     * footer rows is to apply sticky styling to the tfoot container. This should only be done if
     * all footer rows are sticky. If not all footer rows are sticky, remove sticky positioning from
     * the tfoot element.
     */
    /**
       * When using the native table in Safari, sticky footer cells do not stick. The only way to stick
       * footer rows is to apply sticky styling to the tfoot container. This should only be done if
       * all footer rows are sticky. If not all footer rows are sticky, remove sticky positioning from
       * the tfoot element.
       */
    StickyStyler.prototype.updateStickyFooterContainer = /**
       * When using the native table in Safari, sticky footer cells do not stick. The only way to stick
       * footer rows is to apply sticky styling to the tfoot container. This should only be done if
       * all footer rows are sticky. If not all footer rows are sticky, remove sticky positioning from
       * the tfoot element.
       */
    function (tableElement, stickyStates) {
        if (!this.isNativeHtmlTable) {
            return;
        }
        var tfoot = (tableElement.querySelector('tfoot'));
        if (stickyStates.some(function (state) { return !state; })) {
            this._removeStickyStyle(tfoot, ['bottom']);
        }
        else {
            this._addStickyStyle(tfoot, 'bottom', 0);
        }
    };
    /**
     * Removes the sticky style on the element by removing the sticky cell CSS class, re-evaluating
     * the zIndex, removing each of the provided sticky directions, and removing the
     * sticky position if there are no more directions.
     */
    /**
       * Removes the sticky style on the element by removing the sticky cell CSS class, re-evaluating
       * the zIndex, removing each of the provided sticky directions, and removing the
       * sticky position if there are no more directions.
       */
    StickyStyler.prototype._removeStickyStyle = /**
       * Removes the sticky style on the element by removing the sticky cell CSS class, re-evaluating
       * the zIndex, removing each of the provided sticky directions, and removing the
       * sticky position if there are no more directions.
       */
    function (element, stickyDirections) {
        for (var _i = 0, stickyDirections_1 = stickyDirections; _i < stickyDirections_1.length; _i++) {
            var dir = stickyDirections_1[_i];
            element.style[dir] = '';
        }
        element.style.zIndex = this._getCalculatedZIndex(element);
        // If the element no longer has any more sticky directions, remove sticky positioning and
        // the sticky CSS class.
        var hasDirection = exports.STICKY_DIRECTIONS.some(function (dir) { return !!element.style[dir]; });
        if (!hasDirection) {
            element.style.position = '';
            element.classList.remove(this.stickCellCss);
        }
    };
    /**
     * Adds the sticky styling to the element by adding the sticky style class, changing position
     * to be sticky (and -webkit-sticky), setting the appropriate zIndex, and adding a sticky
     * direction and value.
     */
    /**
       * Adds the sticky styling to the element by adding the sticky style class, changing position
       * to be sticky (and -webkit-sticky), setting the appropriate zIndex, and adding a sticky
       * direction and value.
       */
    StickyStyler.prototype._addStickyStyle = /**
       * Adds the sticky styling to the element by adding the sticky style class, changing position
       * to be sticky (and -webkit-sticky), setting the appropriate zIndex, and adding a sticky
       * direction and value.
       */
    function (element, dir, dirValue) {
        element.classList.add(this.stickCellCss);
        element.style[dir] = dirValue + "px";
        element.style.cssText += 'position: -webkit-sticky; position: sticky; ';
        element.style.zIndex = this._getCalculatedZIndex(element);
    };
    /**
     * Calculate what the z-index should be for the element, depending on what directions (top,
     * bottom, left, right) have been set. It should be true that elements with a top direction
     * should have the highest index since these are elements like a table header. If any of those
     * elements are also sticky in another direction, then they should appear above other elements
     * that are only sticky top (e.g. a sticky column on a sticky header). Bottom-sticky elements
     * (e.g. footer rows) should then be next in the ordering such that they are below the header
     * but above any non-sticky elements. Finally, left/right sticky elements (e.g. sticky columns)
     * should minimally increment so that they are above non-sticky elements but below top and bottom
     * elements.
     */
    /**
       * Calculate what the z-index should be for the element, depending on what directions (top,
       * bottom, left, right) have been set. It should be true that elements with a top direction
       * should have the highest index since these are elements like a table header. If any of those
       * elements are also sticky in another direction, then they should appear above other elements
       * that are only sticky top (e.g. a sticky column on a sticky header). Bottom-sticky elements
       * (e.g. footer rows) should then be next in the ordering such that they are below the header
       * but above any non-sticky elements. Finally, left/right sticky elements (e.g. sticky columns)
       * should minimally increment so that they are above non-sticky elements but below top and bottom
       * elements.
       */
    StickyStyler.prototype._getCalculatedZIndex = /**
       * Calculate what the z-index should be for the element, depending on what directions (top,
       * bottom, left, right) have been set. It should be true that elements with a top direction
       * should have the highest index since these are elements like a table header. If any of those
       * elements are also sticky in another direction, then they should appear above other elements
       * that are only sticky top (e.g. a sticky column on a sticky header). Bottom-sticky elements
       * (e.g. footer rows) should then be next in the ordering such that they are below the header
       * but above any non-sticky elements. Finally, left/right sticky elements (e.g. sticky columns)
       * should minimally increment so that they are above non-sticky elements but below top and bottom
       * elements.
       */
    function (element) {
        var zIndexIncrements = {
            top: 100,
            bottom: 10,
            left: 1,
            right: 1,
        };
        var zIndex = 0;
        for (var _i = 0, STICKY_DIRECTIONS_1 = exports.STICKY_DIRECTIONS; _i < STICKY_DIRECTIONS_1.length; _i++) {
            var dir = STICKY_DIRECTIONS_1[_i];
            if (element.style[dir]) {
                zIndex += zIndexIncrements[dir];
            }
        }
        return zIndex ? "" + zIndex : '';
    };
    /** Gets the widths for each cell in the provided row. */
    /** Gets the widths for each cell in the provided row. */
    StickyStyler.prototype._getCellWidths = /** Gets the widths for each cell in the provided row. */
    function (row) {
        var cellWidths = [];
        var firstRowCells = row.children;
        for (var i = 0; i < firstRowCells.length; i++) {
            var cell = firstRowCells[i];
            cellWidths.push(cell.getBoundingClientRect().width);
        }
        return cellWidths;
    };
    /**
     * Determines the left and right positions of each sticky column cell, which will be the
     * accumulation of all sticky column cell widths to the left and right, respectively.
     * Non-sticky cells do not need to have a value set since their positions will not be applied.
     */
    /**
       * Determines the left and right positions of each sticky column cell, which will be the
       * accumulation of all sticky column cell widths to the left and right, respectively.
       * Non-sticky cells do not need to have a value set since their positions will not be applied.
       */
    StickyStyler.prototype._getStickyStartColumnPositions = /**
       * Determines the left and right positions of each sticky column cell, which will be the
       * accumulation of all sticky column cell widths to the left and right, respectively.
       * Non-sticky cells do not need to have a value set since their positions will not be applied.
       */
    function (widths, stickyStates) {
        var positions = [];
        var nextPosition = 0;
        for (var i = 0; i < widths.length; i++) {
            if (stickyStates[i]) {
                positions[i] = nextPosition;
                nextPosition += widths[i];
            }
        }
        return positions;
    };
    /**
     * Determines the left and right positions of each sticky column cell, which will be the
     * accumulation of all sticky column cell widths to the left and right, respectively.
     * Non-sticky cells do not need to have a value set since their positions will not be applied.
     */
    /**
       * Determines the left and right positions of each sticky column cell, which will be the
       * accumulation of all sticky column cell widths to the left and right, respectively.
       * Non-sticky cells do not need to have a value set since their positions will not be applied.
       */
    StickyStyler.prototype._getStickyEndColumnPositions = /**
       * Determines the left and right positions of each sticky column cell, which will be the
       * accumulation of all sticky column cell widths to the left and right, respectively.
       * Non-sticky cells do not need to have a value set since their positions will not be applied.
       */
    function (widths, stickyStates) {
        var positions = [];
        var nextPosition = 0;
        for (var i = widths.length; i > 0; i--) {
            if (stickyStates[i]) {
                positions[i] = nextPosition;
                nextPosition += widths[i];
            }
        }
        return positions;
    };
    return StickyStyler;
}());
exports.StickyStyler = StickyStyler;
//# sourceMappingURL=sticky-styler.js.map