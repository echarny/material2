"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var virtual_scroll_strategy_1 = require("./virtual-scroll-strategy");
/** Checks if the given ranges are equal. */
function rangesEqual(r1, r2) {
    return r1.start == r2.start && r1.end == r2.end;
}
/** A viewport that virtualizes it's scrolling with the help of `CdkVirtualForOf`. */
var CdkVirtualScrollViewport = /** @class */ (function () {
    function CdkVirtualScrollViewport(elementRef, _changeDetectorRef, _ngZone, _scrollStrategy) {
        var _this = this;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._scrollStrategy = _scrollStrategy;
        /** Emits when the viewport is detached from a CdkVirtualForOf. */
        this._detachedSubject = new rxjs_1.Subject();
        /** Emits when the rendered range changes. */
        this._renderedRangeSubject = new rxjs_1.Subject();
        /** The direction the viewport scrolls. */
        this.orientation = 'vertical';
        // Note: we don't use the typical EventEmitter here because we need to subscribe to the scroll
        // strategy lazily (i.e. only if the user is actually listening to the events). We do this because
        // depending on how the strategy calculates the scrolled index, it may come at a cost to
        // performance.
        /** Emits when the index of the first element visible in the viewport changes. */
        this.scrolledIndexChange = rxjs_1.Observable.create(function (observer) {
            return _this._scrollStrategy.scrolledIndexChange.subscribe(function (index) {
                return Promise.resolve().then(function () { return _this._ngZone.run(function () { return observer.next(index); }); });
            });
        });
        /** A stream that emits whenever the rendered range changes. */
        this.renderedRangeStream = this._renderedRangeSubject.asObservable();
        /**
           * The transform used to scale the spacer to the same size as all content, including content that
           * is not currently rendered.
           */
        this._totalContentSizeTransform = '';
        /**
           * The total size of all content (in pixels), including content that is not currently rendered.
           */
        this._totalContentSize = 0;
        /** The currently rendered range of indices. */
        this._renderedRange = { start: 0, end: 0 };
        /** The length of the data bound to this viewport (in number of items). */
        this._dataLength = 0;
        /** The size of the viewport (in pixels). */
        this._viewportSize = 0;
        /** The last rendered content offset that was set. */
        this._renderedContentOffset = 0;
        /**
           * Whether the last rendered content offset was to the end of the content (and therefore needs to
           * be rewritten as an offset to the start of the content).
           */
        this._renderedContentOffsetNeedsRewrite = false;
        /** Observable that emits when the viewport is destroyed. */
        this._destroyed = new rxjs_1.Subject();
        /** Whether there is a pending change detection cycle. */
        this._isChangeDetectionPending = false;
        /** A list of functions to run after the next change detection cycle. */
        this._runAfterChangeDetection = [];
    }
    CdkVirtualScrollViewport.prototype.ngOnInit = function () {
        var _this = this;
        // It's still too early to measure the viewport at this point. Deferring with a promise allows
        // the Viewport to be rendered with the correct size before we measure. We run this outside the
        // zone to avoid causing more change detection cycles. We handle the change detection loop
        // ourselves instead.
        this._ngZone.runOutsideAngular(function () {
            return Promise.resolve().then(function () {
                _this._measureViewportSize();
                _this._scrollStrategy.attach(_this);
                rxjs_1.fromEvent(_this.elementRef.nativeElement, 'scroll')
                    .pipe(operators_1.sampleTime(0, rxjs_1.animationFrameScheduler), operators_1.takeUntil(_this._destroyed))
                    .subscribe(function () { return _this._scrollStrategy.onContentScrolled(); });
                _this._markChangeDetectionNeeded();
            });
        });
    };
    CdkVirtualScrollViewport.prototype.ngOnDestroy = function () {
        this.detach();
        this._scrollStrategy.detach();
        this._destroyed.next();
        // Complete all subjects
        this._renderedRangeSubject.complete();
        this._detachedSubject.complete();
        this._destroyed.complete();
    };
    /** Attaches a `CdkVirtualForOf` to this viewport. */
    /** Attaches a `CdkVirtualForOf` to this viewport. */
    CdkVirtualScrollViewport.prototype.attach = /** Attaches a `CdkVirtualForOf` to this viewport. */
    function (forOf) {
        var _this = this;
        if (this._forOf) {
            throw Error('CdkVirtualScrollViewport is already attached.');
        }
        // Subscribe to the data stream of the CdkVirtualForOf to keep track of when the data length
        // changes. Run outside the zone to avoid triggering change detection, since we're managing the
        // change detection loop ourselves.
        this._ngZone.runOutsideAngular(function () {
            _this._forOf = forOf;
            _this._forOf.dataStream.pipe(operators_1.takeUntil(_this._detachedSubject)).subscribe(function (data) {
                var newLength = data.length;
                if (newLength !== _this._dataLength) {
                    _this._dataLength = newLength;
                    _this._scrollStrategy.onDataLengthChanged();
                }
            });
        });
    };
    /** Detaches the current `CdkVirtualForOf`. */
    /** Detaches the current `CdkVirtualForOf`. */
    CdkVirtualScrollViewport.prototype.detach = /** Detaches the current `CdkVirtualForOf`. */
    function () {
        this._forOf = null;
        this._detachedSubject.next();
    };
    /** Gets the length of the data bound to this viewport (in number of items). */
    /** Gets the length of the data bound to this viewport (in number of items). */
    CdkVirtualScrollViewport.prototype.getDataLength = /** Gets the length of the data bound to this viewport (in number of items). */
    function () {
        return this._dataLength;
    };
    /** Gets the size of the viewport (in pixels). */
    /** Gets the size of the viewport (in pixels). */
    CdkVirtualScrollViewport.prototype.getViewportSize = /** Gets the size of the viewport (in pixels). */
    function () {
        return this._viewportSize;
    };
    // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
    // cycle happens. I'm being careful to only call it after the render cycle is complete and before
    // setting it to something else, but its error prone and should probably be split into
    // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
    /** Get the current rendered range of items. */
    // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
    // cycle happens. I'm being careful to only call it after the render cycle is complete and before
    // setting it to something else, but its error prone and should probably be split into
    // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
    /** Get the current rendered range of items. */
    CdkVirtualScrollViewport.prototype.getRenderedRange = 
    // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
    // cycle happens. I'm being careful to only call it after the render cycle is complete and before
    // setting it to something else, but its error prone and should probably be split into
    // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
    /** Get the current rendered range of items. */
    function () {
        return this._renderedRange;
    };
    /**
     * Sets the total size of all content (in pixels), including content that is not currently
     * rendered.
     */
    /**
       * Sets the total size of all content (in pixels), including content that is not currently
       * rendered.
       */
    CdkVirtualScrollViewport.prototype.setTotalContentSize = /**
       * Sets the total size of all content (in pixels), including content that is not currently
       * rendered.
       */
    function (size) {
        if (this._totalContentSize !== size) {
            this._totalContentSize = size;
            var axis = this.orientation == 'horizontal' ? 'X' : 'Y';
            this._totalContentSizeTransform = "scale" + axis + "(" + this._totalContentSize + ")";
            this._markChangeDetectionNeeded();
        }
    };
    /** Sets the currently rendered range of indices. */
    /** Sets the currently rendered range of indices. */
    CdkVirtualScrollViewport.prototype.setRenderedRange = /** Sets the currently rendered range of indices. */
    function (range) {
        var _this = this;
        if (!rangesEqual(this._renderedRange, range)) {
            this._renderedRangeSubject.next(this._renderedRange = range);
            this._markChangeDetectionNeeded(function () { return _this._scrollStrategy.onContentRendered(); });
        }
    };
    /**
     * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
     */
    /**
       * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
       */
    CdkVirtualScrollViewport.prototype.getOffsetToRenderedContentStart = /**
       * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
       */
    function () {
        return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
    };
    /**
     * Sets the offset from the start of the viewport to either the start or end of the rendered data
     * (in pixels).
     */
    /**
       * Sets the offset from the start of the viewport to either the start or end of the rendered data
       * (in pixels).
       */
    CdkVirtualScrollViewport.prototype.setRenderedContentOffset = /**
       * Sets the offset from the start of the viewport to either the start or end of the rendered data
       * (in pixels).
       */
    function (offset, to) {
        var _this = this;
        if (to === void 0) { to = 'to-start'; }
        var axis = this.orientation === 'horizontal' ? 'X' : 'Y';
        var transform = "translate" + axis + "(" + Number(offset) + "px)";
        this._renderedContentOffset = offset;
        if (to === 'to-end') {
            transform += " translate" + axis + "(-100%)";
            // The viewport should rewrite this as a `to-start` offset on the next render cycle. Otherwise
            // elements will appear to expand in the wrong direction (e.g. `mat-expansion-panel` would
            // expand upward).
            this._renderedContentOffsetNeedsRewrite = true;
        }
        if (this._renderedContentTransform != transform) {
            // We know this value is safe because we parse `offset` with `Number()` before passing it
            // into the string.
            this._renderedContentTransform = transform;
            this._markChangeDetectionNeeded(function () {
                if (_this._renderedContentOffsetNeedsRewrite) {
                    _this._renderedContentOffset -= _this.measureRenderedContentSize();
                    _this._renderedContentOffsetNeedsRewrite = false;
                    _this.setRenderedContentOffset(_this._renderedContentOffset);
                }
                else {
                    _this._scrollStrategy.onRenderedOffsetChanged();
                }
            });
        }
    };
    /**
     * Scrolls to the offset on the viewport.
     * @param offset The offset to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    /**
       * Scrolls to the offset on the viewport.
       * @param offset The offset to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       */
    CdkVirtualScrollViewport.prototype.scrollToOffset = /**
       * Scrolls to the offset on the viewport.
       * @param offset The offset to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       */
    function (offset, behavior) {
        if (behavior === void 0) { behavior = 'auto'; }
        var viewportElement = this.elementRef.nativeElement;
        if (platform_1.supportsScrollBehavior()) {
            var offsetDirection = this.orientation === 'horizontal' ? 'left' : 'top';
            viewportElement.scrollTo((_a = {}, _a[offsetDirection] = offset, _a.behavior = behavior, _a));
        }
        else {
            if (this.orientation === 'horizontal') {
                viewportElement.scrollLeft = offset;
            }
            else {
                viewportElement.scrollTop = offset;
            }
        }
        var _a;
    };
    /**
     * Scrolls to the offset for the given index.
     * @param index The index of the element to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    /**
       * Scrolls to the offset for the given index.
       * @param index The index of the element to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       */
    CdkVirtualScrollViewport.prototype.scrollToIndex = /**
       * Scrolls to the offset for the given index.
       * @param index The index of the element to scroll to.
       * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       */
    function (index, behavior) {
        if (behavior === void 0) { behavior = 'auto'; }
        this._scrollStrategy.scrollToIndex(index, behavior);
    };
    /** @docs-private Internal method to set the scroll offset on the viewport. */
    /** @docs-private Internal method to set the scroll offset on the viewport. */
    CdkVirtualScrollViewport.prototype.setScrollOffset = /** @docs-private Internal method to set the scroll offset on the viewport. */
    function (offset) {
        // Rather than setting the offset immediately, we batch it up to be applied along with other DOM
        // writes during the next change detection cycle.
        this._pendingScrollOffset = offset;
        this._markChangeDetectionNeeded();
    };
    /** Gets the current scroll offset of the viewport (in pixels). */
    /** Gets the current scroll offset of the viewport (in pixels). */
    CdkVirtualScrollViewport.prototype.measureScrollOffset = /** Gets the current scroll offset of the viewport (in pixels). */
    function () {
        return this.orientation === 'horizontal' ?
            this.elementRef.nativeElement.scrollLeft : this.elementRef.nativeElement.scrollTop;
    };
    /** Measure the combined size of all of the rendered items. */
    /** Measure the combined size of all of the rendered items. */
    CdkVirtualScrollViewport.prototype.measureRenderedContentSize = /** Measure the combined size of all of the rendered items. */
    function () {
        var contentEl = this._contentWrapper.nativeElement;
        return this.orientation === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
    };
    /**
     * Measure the total combined size of the given range. Throws if the range includes items that are
     * not rendered.
     */
    /**
       * Measure the total combined size of the given range. Throws if the range includes items that are
       * not rendered.
       */
    CdkVirtualScrollViewport.prototype.measureRangeSize = /**
       * Measure the total combined size of the given range. Throws if the range includes items that are
       * not rendered.
       */
    function (range) {
        if (!this._forOf) {
            return 0;
        }
        return this._forOf.measureRangeSize(range, this.orientation);
    };
    /** Update the viewport dimensions and re-render. */
    /** Update the viewport dimensions and re-render. */
    CdkVirtualScrollViewport.prototype.checkViewportSize = /** Update the viewport dimensions and re-render. */
    function () {
        // TODO: Cleanup later when add logic for handling content resize
        this._measureViewportSize();
        this._scrollStrategy.onDataLengthChanged();
    };
    /** Measure the viewport size. */
    /** Measure the viewport size. */
    CdkVirtualScrollViewport.prototype._measureViewportSize = /** Measure the viewport size. */
    function () {
        var viewportEl = this.elementRef.nativeElement;
        this._viewportSize = this.orientation === 'horizontal' ?
            viewportEl.clientWidth : viewportEl.clientHeight;
    };
    /** Queue up change detection to run. */
    /** Queue up change detection to run. */
    CdkVirtualScrollViewport.prototype._markChangeDetectionNeeded = /** Queue up change detection to run. */
    function (runAfter) {
        var _this = this;
        if (runAfter) {
            this._runAfterChangeDetection.push(runAfter);
        }
        // Use a Promise to batch together calls to `_doChangeDetection`. This way if we set a bunch of
        // properties sequentially we only have to run `_doChangeDetection` once at the end.
        if (!this._isChangeDetectionPending) {
            this._isChangeDetectionPending = true;
            this._ngZone.runOutsideAngular(function () {
                return Promise.resolve().then(function () {
                    _this._doChangeDetection();
                });
            });
        }
    };
    /** Run change detection. */
    /** Run change detection. */
    CdkVirtualScrollViewport.prototype._doChangeDetection = /** Run change detection. */
    function () {
        var _this = this;
        this._isChangeDetectionPending = false;
        // Apply changes to Angular bindings. Note: We must call `markForCheck` to run change detection
        // from the root, since the repeated items are content projected in. Calling `detectChanges`
        // instead does not properly check the projected content.
        this._ngZone.run(function () { return _this._changeDetectorRef.markForCheck(); });
        // Apply the content transform. The transform can't be set via an Angular binding because
        // bypassSecurityTrustStyle is banned in Google. However the value is safe, it's composed of
        // string literals, a variable that can only be 'X' or 'Y', and user input that is run through
        // the `Number` function first to coerce it to a numeric value.
        this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
        // Apply the pending scroll offset separately, since it can't be set up as an Angular binding.
        if (this._pendingScrollOffset != null) {
            if (this.orientation === 'horizontal') {
                this.elementRef.nativeElement.scrollLeft = this._pendingScrollOffset;
            }
            else {
                this.elementRef.nativeElement.scrollTop = this._pendingScrollOffset;
            }
        }
        var runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];
        for (var _i = 0, runAfterChangeDetection_1 = runAfterChangeDetection; _i < runAfterChangeDetection_1.length; _i++) {
            var fn = runAfterChangeDetection_1[_i];
            fn();
        }
    };
    CdkVirtualScrollViewport.decorators = [
        { type: core_1.Component, args: [{selector: 'cdk-virtual-scroll-viewport',
                    template: "<div #contentWrapper class=\"cdk-virtual-scroll-content-wrapper\"><ng-content></ng-content></div><div class=\"cdk-virtual-scroll-spacer\" [style.transform]=\"_totalContentSizeTransform\"></div>",
                    styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content;will-change:transform}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{bottom:0}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{right:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;will-change:transform}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}"],
                    host: {
                        'class': 'cdk-virtual-scroll-viewport',
                        '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                        '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"',
                    },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkVirtualScrollViewport.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [virtual_scroll_strategy_1.VIRTUAL_SCROLL_STRATEGY,] },] },
    ]; };
    CdkVirtualScrollViewport.propDecorators = {
        "orientation": [{ type: core_1.Input },],
        "scrolledIndexChange": [{ type: core_1.Output },],
        "_contentWrapper": [{ type: core_1.ViewChild, args: ['contentWrapper',] },],
    };
    return CdkVirtualScrollViewport;
}());
exports.CdkVirtualScrollViewport = CdkVirtualScrollViewport;
//# sourceMappingURL=virtual-scroll-viewport.js.map