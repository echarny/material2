"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var block_scroll_strategy_1 = require("./block-scroll-strategy");
var close_scroll_strategy_1 = require("./close-scroll-strategy");
var noop_scroll_strategy_1 = require("./noop-scroll-strategy");
var reposition_scroll_strategy_1 = require("./reposition-scroll-strategy");
var i0 = require("@angular/core");
var i1 = require("../../scrolling/scroll-dispatcher");
var i2 = require("../../scrolling/viewport-ruler");
var i3 = require("@angular/common");
/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
var ScrollStrategyOptions = /** @class */ (function () {
    function ScrollStrategyOptions(_scrollDispatcher, _viewportRuler, _ngZone, document) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        /** Do nothing on scroll. */
        this.noop = function () { return new noop_scroll_strategy_1.NoopScrollStrategy(); };
        /**
           * Close the overlay as soon as the user scrolls.
           * @param config Configuration to be used inside the scroll strategy.
           */
        this.close = function (config) {
            return new close_scroll_strategy_1.CloseScrollStrategy(_this._scrollDispatcher, _this._ngZone, _this._viewportRuler, config);
        };
        /** Block scrolling. */
        this.block = function () { return new block_scroll_strategy_1.BlockScrollStrategy(_this._viewportRuler, _this._document); };
        /**
           * Update the overlay's position on scroll.
           * @param config Configuration to be used inside the scroll strategy.
           * Allows debouncing the reposition calls.
           */
        this.reposition = function (config) {
            return new reposition_scroll_strategy_1.RepositionScrollStrategy(_this._scrollDispatcher, _this._viewportRuler, _this._ngZone, config);
        };
        this._document = document;
    }
    ScrollStrategyOptions.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ScrollStrategyOptions.ctorParameters = function () { return [
        { type: scrolling_1.ScrollDispatcher, },
        { type: scrolling_1.ViewportRuler, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    ScrollStrategyOptions.ngInjectableDef = i0.defineInjectable({ factory: function ScrollStrategyOptions_Factory() { return new ScrollStrategyOptions(i0.inject(i1.ScrollDispatcher), i0.inject(i2.ViewportRuler), i0.inject(i0.NgZone), i0.inject(i3.DOCUMENT)); }, token: ScrollStrategyOptions, providedIn: "root" });
    return ScrollStrategyOptions;
}());
exports.ScrollStrategyOptions = ScrollStrategyOptions;
//# sourceMappingURL=scroll-strategy-options.js.map