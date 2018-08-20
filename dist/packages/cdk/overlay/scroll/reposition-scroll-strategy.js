"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_strategy_1 = require("./scroll-strategy");
var scroll_clip_1 = require("../position/scroll-clip");
/**
 * Strategy that will update the element position as the user is scrolling.
 */
var /**
 * Strategy that will update the element position as the user is scrolling.
 */
RepositionScrollStrategy = /** @class */ (function () {
    function RepositionScrollStrategy(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        this._config = _config;
        this._scrollSubscription = null;
    }
    /** Attaches this scroll strategy to an overlay. */
    /** Attaches this scroll strategy to an overlay. */
    RepositionScrollStrategy.prototype.attach = /** Attaches this scroll strategy to an overlay. */
    function (overlayRef) {
        if (this._overlayRef) {
            throw scroll_strategy_1.getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    /** Enables repositioning of the attached overlay on scroll. */
    /** Enables repositioning of the attached overlay on scroll. */
    RepositionScrollStrategy.prototype.enable = /** Enables repositioning of the attached overlay on scroll. */
    function () {
        var _this = this;
        if (!this._scrollSubscription) {
            var throttle = this._config ? this._config.scrollThrottle : 0;
            this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(function () {
                _this._overlayRef.updatePosition();
                // TODO(crisbeto): make `close` on by default once all components can handle it.
                if (_this._config && _this._config.autoClose) {
                    var overlayRect = _this._overlayRef.overlayElement.getBoundingClientRect();
                    var _a = _this._viewportRuler.getViewportSize(), width = _a.width, height = _a.height;
                    // TODO(crisbeto): include all ancestor scroll containers here once
                    // we have a way of exposing the trigger element to the scroll strategy.
                    var parentRects = [{ width: width, height: height, bottom: height, right: width, top: 0, left: 0 }];
                    if (scroll_clip_1.isElementScrolledOutsideView(overlayRect, parentRects)) {
                        _this.disable();
                        _this._ngZone.run(function () { return _this._overlayRef.detach(); });
                    }
                }
            });
        }
    };
    /** Disables repositioning of the attached overlay on scroll. */
    /** Disables repositioning of the attached overlay on scroll. */
    RepositionScrollStrategy.prototype.disable = /** Disables repositioning of the attached overlay on scroll. */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return RepositionScrollStrategy;
}());
exports.RepositionScrollStrategy = RepositionScrollStrategy;
//# sourceMappingURL=reposition-scroll-strategy.js.map