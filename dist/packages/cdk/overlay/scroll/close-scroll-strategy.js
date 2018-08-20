"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_strategy_1 = require("./scroll-strategy");
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
var /**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
CloseScrollStrategy = /** @class */ (function () {
    function CloseScrollStrategy(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._config = _config;
        this._scrollSubscription = null;
        /** Detaches the overlay ref and disables the scroll strategy. */
        this._detach = function () {
            _this.disable();
            if (_this._overlayRef.hasAttached()) {
                _this._ngZone.run(function () { return _this._overlayRef.detach(); });
            }
        };
    }
    /** Attaches this scroll strategy to an overlay. */
    /** Attaches this scroll strategy to an overlay. */
    CloseScrollStrategy.prototype.attach = /** Attaches this scroll strategy to an overlay. */
    function (overlayRef) {
        if (this._overlayRef) {
            throw scroll_strategy_1.getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    /** Enables the closing of the attached overlay on scroll. */
    /** Enables the closing of the attached overlay on scroll. */
    CloseScrollStrategy.prototype.enable = /** Enables the closing of the attached overlay on scroll. */
    function () {
        var _this = this;
        if (this._scrollSubscription) {
            return;
        }
        var stream = this._scrollDispatcher.scrolled(0);
        if (this._config && this._config.threshold && this._config.threshold > 1) {
            this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
            this._scrollSubscription = stream.subscribe(function () {
                var scrollPosition = _this._viewportRuler.getViewportScrollPosition().top;
                if (Math.abs(scrollPosition - _this._initialScrollPosition) > (_this._config.threshold)) {
                    _this._detach();
                }
                else {
                    _this._overlayRef.updatePosition();
                }
            });
        }
        else {
            this._scrollSubscription = stream.subscribe(this._detach);
        }
    };
    /** Disables the closing the attached overlay on scroll. */
    /** Disables the closing the attached overlay on scroll. */
    CloseScrollStrategy.prototype.disable = /** Disables the closing the attached overlay on scroll. */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return CloseScrollStrategy;
}());
exports.CloseScrollStrategy = CloseScrollStrategy;
//# sourceMappingURL=close-scroll-strategy.js.map