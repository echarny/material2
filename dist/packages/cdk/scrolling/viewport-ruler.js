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
var i0 = require("@angular/core");
var i1 = require("../platform/platform");
/** Time in ms to throttle the resize events by default. */
exports.DEFAULT_RESIZE_TIME = 20;
/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
var ViewportRuler = /** @class */ (function () {
    function ViewportRuler(_platform, ngZone) {
        var _this = this;
        this._platform = _platform;
        this._change = _platform.isBrowser ? ngZone.runOutsideAngular(function () {
            return rxjs_1.merge(rxjs_1.fromEvent(window, 'resize'), rxjs_1.fromEvent(window, 'orientationchange'));
        }) : rxjs_1.of();
        this._invalidateCache = this.change().subscribe(function () { return _this._updateViewportSize(); });
    }
    ViewportRuler.prototype.ngOnDestroy = function () {
        this._invalidateCache.unsubscribe();
    };
    /** Returns the viewport's width and height. */
    /** Returns the viewport's width and height. */
    ViewportRuler.prototype.getViewportSize = /** Returns the viewport's width and height. */
    function () {
        if (!this._viewportSize) {
            this._updateViewportSize();
        }
        var output = { width: this._viewportSize.width, height: this._viewportSize.height };
        // If we're not on a browser, don't cache the size since it'll be mocked out anyway.
        if (!this._platform.isBrowser) {
            this._viewportSize = (null);
        }
        return output;
    };
    /** Gets a ClientRect for the viewport's bounds. */
    /** Gets a ClientRect for the viewport's bounds. */
    ViewportRuler.prototype.getViewportRect = /** Gets a ClientRect for the viewport's bounds. */
    function () {
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var scrollPosition = this.getViewportScrollPosition();
        var _a = this.getViewportSize(), width = _a.width, height = _a.height;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /** Gets the (top, left) scroll position of the viewport. */
    /** Gets the (top, left) scroll position of the viewport. */
    ViewportRuler.prototype.getViewportScrollPosition = /** Gets the (top, left) scroll position of the viewport. */
    function () {
        // While we can get a reference to the fake document
        // during SSR, it doesn't have getBoundingClientRect.
        if (!this._platform.isBrowser) {
            return { top: 0, left: 0 };
        }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var documentRect = document.documentElement.getBoundingClientRect();
        var top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top: top, left: left };
    };
    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param throttleTime Time in milliseconds to throttle the stream.
     */
    /**
       * Returns a stream that emits whenever the size of the viewport changes.
       * @param throttleTime Time in milliseconds to throttle the stream.
       */
    ViewportRuler.prototype.change = /**
       * Returns a stream that emits whenever the size of the viewport changes.
       * @param throttleTime Time in milliseconds to throttle the stream.
       */
    function (throttleTime) {
        if (throttleTime === void 0) { throttleTime = exports.DEFAULT_RESIZE_TIME; }
        return throttleTime > 0 ? this._change.pipe(operators_1.auditTime(throttleTime)) : this._change;
    };
    /** Updates the cached viewport size. */
    /** Updates the cached viewport size. */
    ViewportRuler.prototype._updateViewportSize = /** Updates the cached viewport size. */
    function () {
        this._viewportSize = this._platform.isBrowser ?
            { width: window.innerWidth, height: window.innerHeight } :
            { width: 0, height: 0 };
    };
    ViewportRuler.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ViewportRuler.ctorParameters = function () { return [
        { type: platform_1.Platform, },
        { type: core_1.NgZone, },
    ]; };
    ViewportRuler.ngInjectableDef = i0.defineInjectable({ factory: function ViewportRuler_Factory() { return new ViewportRuler(i0.inject(i1.Platform), i0.inject(i0.NgZone)); }, token: ViewportRuler, providedIn: "root" });
    return ViewportRuler;
}());
exports.ViewportRuler = ViewportRuler;
/** @docs-private @deprecated @breaking-change 7.0.0 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, platform, ngZone) {
    return parentRuler || new ViewportRuler(platform, ngZone);
}
exports.VIEWPORT_RULER_PROVIDER_FACTORY = VIEWPORT_RULER_PROVIDER_FACTORY;
/** @docs-private @deprecated @breaking-change 7.0.0 */
exports.VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new core_1.Optional(), new core_1.SkipSelf(), ViewportRuler], platform_1.Platform, core_1.NgZone],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};
//# sourceMappingURL=viewport-ruler.js.map