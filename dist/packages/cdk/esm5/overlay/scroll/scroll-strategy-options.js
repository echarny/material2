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
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { BlockScrollStrategy } from './block-scroll-strategy';
import { CloseScrollStrategy } from './close-scroll-strategy';
import { NoopScrollStrategy } from './noop-scroll-strategy';
import { RepositionScrollStrategy, } from './reposition-scroll-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "@angular/common";
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
        /**
         * Do nothing on scroll.
         */
        this.noop = function () { return new NoopScrollStrategy(); };
        /**
         * Close the overlay as soon as the user scrolls.
         * @param config Configuration to be used inside the scroll strategy.
         */
        this.close = function (config) {
            return new CloseScrollStrategy(_this._scrollDispatcher, _this._ngZone, _this._viewportRuler, config);
        };
        /**
         * Block scrolling.
         */
        this.block = function () { return new BlockScrollStrategy(_this._viewportRuler, _this._document); };
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = function (config) {
            return new RepositionScrollStrategy(_this._scrollDispatcher, _this._viewportRuler, _this._ngZone, config);
        };
        this._document = document;
    }
    ScrollStrategyOptions.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ScrollStrategyOptions.ctorParameters = function () { return [
        { type: ScrollDispatcher, },
        { type: ViewportRuler, },
        { type: NgZone, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    /** @nocollapse */ ScrollStrategyOptions.ngInjectableDef = i0.defineInjectable({ factory: function ScrollStrategyOptions_Factory() { return new ScrollStrategyOptions(i0.inject(i1.ScrollDispatcher), i0.inject(i1.ViewportRuler), i0.inject(i0.NgZone), i0.inject(i2.DOCUMENT)); }, token: ScrollStrategyOptions, providedIn: "root" });
    return ScrollStrategyOptions;
}());
export { ScrollStrategyOptions };
function ScrollStrategyOptions_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScrollStrategyOptions.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScrollStrategyOptions.ctorParameters;
    /** @type {?} */
    ScrollStrategyOptions.prototype._document;
    /**
     * Do nothing on scroll.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.noop;
    /**
     * Close the overlay as soon as the user scrolls.
     * \@param config Configuration to be used inside the scroll strategy.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.close;
    /**
     * Block scrolling.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.block;
    /**
     * Update the overlay's position on scroll.
     * \@param config Configuration to be used inside the scroll strategy.
     * Allows debouncing the reposition calls.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.reposition;
    /** @type {?} */
    ScrollStrategyOptions.prototype._scrollDispatcher;
    /** @type {?} */
    ScrollStrategyOptions.prototype._viewportRuler;
    /** @type {?} */
    ScrollStrategyOptions.prototype._ngZone;
}
//# sourceMappingURL=scroll-strategy-options.js.map