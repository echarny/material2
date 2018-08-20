"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var virtual_scroll_strategy_1 = require("./virtual-scroll-strategy");
/** Virtual scrolling strategy for lists with items of known fixed size. */
var /** Virtual scrolling strategy for lists with items of known fixed size. */
FixedSizeVirtualScrollStrategy = /** @class */ (function () {
    /**
     * @param itemSize The size of the items in the virtually scrolling list.
     * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     */
    function FixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
        this._scrolledIndexChange = new rxjs_1.Subject();
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        this.scrolledIndexChange = this._scrolledIndexChange.pipe(operators_1.distinctUntilChanged());
        /** The attached viewport. */
        this._viewport = null;
        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
    }
    /**
     * Attaches this scroll strategy to a viewport.
     * @param viewport The viewport to attach this strategy to.
     */
    /**
       * Attaches this scroll strategy to a viewport.
       * @param viewport The viewport to attach this strategy to.
       */
    FixedSizeVirtualScrollStrategy.prototype.attach = /**
       * Attaches this scroll strategy to a viewport.
       * @param viewport The viewport to attach this strategy to.
       */
    function (viewport) {
        this._viewport = viewport;
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** Detaches this scroll strategy from the currently attached viewport. */
    /** Detaches this scroll strategy from the currently attached viewport. */
    FixedSizeVirtualScrollStrategy.prototype.detach = /** Detaches this scroll strategy from the currently attached viewport. */
    function () {
        this._scrolledIndexChange.complete();
        this._viewport = null;
    };
    /**
     * Update the item size and buffer size.
     * @param itemSize The size of the items in the virtually scrolling list.
     * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     */
    /**
       * Update the item size and buffer size.
       * @param itemSize The size of the items in the virtually scrolling list.
       * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
       * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
       */
    FixedSizeVirtualScrollStrategy.prototype.updateItemAndBufferSize = /**
       * Update the item size and buffer size.
       * @param itemSize The size of the items in the virtually scrolling list.
       * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
       * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
       */
    function (itemSize, minBufferPx, maxBufferPx) {
        if (maxBufferPx < minBufferPx) {
            throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
        }
        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    FixedSizeVirtualScrollStrategy.prototype.onContentScrolled = /** @docs-private Implemented as part of VirtualScrollStrategy. */
    function () {
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    FixedSizeVirtualScrollStrategy.prototype.onDataLengthChanged = /** @docs-private Implemented as part of VirtualScrollStrategy. */
    function () {
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    FixedSizeVirtualScrollStrategy.prototype.onContentRendered = /** @docs-private Implemented as part of VirtualScrollStrategy. */
    function () {
        /* no-op */ 
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    FixedSizeVirtualScrollStrategy.prototype.onRenderedOffsetChanged = /** @docs-private Implemented as part of VirtualScrollStrategy. */
    function () {
        /* no-op */ 
    };
    /**
     * Scroll to the offset for the given index.
     * @param index The index of the element to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling.
     */
    /**
       * Scroll to the offset for the given index.
       * @param index The index of the element to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling.
       */
    FixedSizeVirtualScrollStrategy.prototype.scrollToIndex = /**
       * Scroll to the offset for the given index.
       * @param index The index of the element to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling.
       */
    function (index, behavior) {
        if (this._viewport) {
            this._viewport.scrollToOffset(index * this._itemSize, behavior);
        }
    };
    /** Update the viewport's total content size. */
    /** Update the viewport's total content size. */
    FixedSizeVirtualScrollStrategy.prototype._updateTotalContentSize = /** Update the viewport's total content size. */
    function () {
        if (!this._viewport) {
            return;
        }
        this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
    };
    /** Update the viewport's rendered range. */
    /** Update the viewport's rendered range. */
    FixedSizeVirtualScrollStrategy.prototype._updateRenderedRange = /** Update the viewport's rendered range. */
    function () {
        if (!this._viewport) {
            return;
        }
        var scrollOffset = this._viewport.measureScrollOffset();
        var firstVisibleIndex = scrollOffset / this._itemSize;
        var renderedRange = this._viewport.getRenderedRange();
        var newRange = { start: renderedRange.start, end: renderedRange.end };
        var viewportSize = this._viewport.getViewportSize();
        var dataLength = this._viewport.getDataLength();
        var startBuffer = scrollOffset - newRange.start * this._itemSize;
        if (startBuffer < this._minBufferPx && newRange.start != 0) {
            var expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
            newRange.start = Math.max(0, newRange.start - expandStart);
            newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
        }
        else {
            var endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
            if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
                var expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
                if (expandEnd > 0) {
                    newRange.end = Math.min(dataLength, newRange.end + expandEnd);
                    newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
                }
            }
        }
        this._viewport.setRenderedRange(newRange);
        this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
        this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
    };
    return FixedSizeVirtualScrollStrategy;
}());
exports.FixedSizeVirtualScrollStrategy = FixedSizeVirtualScrollStrategy;
/**
 * Provider factory for `FixedSizeVirtualScrollStrategy` that simply extracts the already created
 * `FixedSizeVirtualScrollStrategy` from the given directive.
 * @param fixedSizeDir The instance of `CdkFixedSizeVirtualScroll` to extract the
 *     `FixedSizeVirtualScrollStrategy` from.
 */
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
    return fixedSizeDir._scrollStrategy;
}
exports._fixedSizeVirtualScrollStrategyFactory = _fixedSizeVirtualScrollStrategyFactory;
/** A virtual scroll strategy that supports fixed-size items. */
var CdkFixedSizeVirtualScroll = /** @class */ (function () {
    function CdkFixedSizeVirtualScroll() {
        this._itemSize = 20;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /** The scroll strategy used by this directive. */
        this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
    }
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "itemSize", {
        get: /** The size of the items in the list (in pixels). */
        function () { return this._itemSize; },
        set: function (value) { this._itemSize = coercion_1.coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "minBufferPx", {
        get: /**
           * The minimum amount of buffer rendered beyond the viewport (in pixels).
           * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
           */
        function () { return this._minBufferPx; },
        set: function (value) { this._minBufferPx = coercion_1.coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "maxBufferPx", {
        get: /**
           * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
           */
        function () { return this._maxBufferPx; },
        set: function (value) { this._maxBufferPx = coercion_1.coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    CdkFixedSizeVirtualScroll.prototype.ngOnChanges = function () {
        this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
    };
    CdkFixedSizeVirtualScroll.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'cdk-virtual-scroll-viewport[itemSize]',
                    providers: [{
                            provide: virtual_scroll_strategy_1.VIRTUAL_SCROLL_STRATEGY,
                            useFactory: _fixedSizeVirtualScrollStrategyFactory,
                            deps: [core_1.forwardRef(function () { return CdkFixedSizeVirtualScroll; })],
                        }],
                },] },
    ];
    /** @nocollapse */
    CdkFixedSizeVirtualScroll.propDecorators = {
        "itemSize": [{ type: core_1.Input },],
        "minBufferPx": [{ type: core_1.Input },],
        "maxBufferPx": [{ type: core_1.Input },],
    };
    return CdkFixedSizeVirtualScroll;
}());
exports.CdkFixedSizeVirtualScroll = CdkFixedSizeVirtualScroll;
//# sourceMappingURL=fixed-size-virtual-scroll.js.map