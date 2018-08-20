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
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
GlobalPositionStrategy = /** @class */ (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    GlobalPositionStrategy.prototype.attach = function (overlayRef) {
        var config = overlayRef.getConfig();
        this._overlayRef = overlayRef;
        if (this._width && !config.width) {
            overlayRef.updateSize({ width: this._width });
        }
        if (this._height && !config.height) {
            overlayRef.updateSize({ height: this._height });
        }
        overlayRef.hostElement.classList.add('cdk-global-overlay-wrapper');
    };
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    /**
       * Sets the top position of the overlay. Clears any previously set vertical position.
       * @param value New top offset.
       */
    GlobalPositionStrategy.prototype.top = /**
       * Sets the top position of the overlay. Clears any previously set vertical position.
       * @param value New top offset.
       */
    function (value) {
        if (value === void 0) { value = ''; }
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    /**
       * Sets the left position of the overlay. Clears any previously set horizontal position.
       * @param value New left offset.
       */
    GlobalPositionStrategy.prototype.left = /**
       * Sets the left position of the overlay. Clears any previously set horizontal position.
       * @param value New left offset.
       */
    function (value) {
        if (value === void 0) { value = ''; }
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    /**
       * Sets the bottom position of the overlay. Clears any previously set vertical position.
       * @param value New bottom offset.
       */
    GlobalPositionStrategy.prototype.bottom = /**
       * Sets the bottom position of the overlay. Clears any previously set vertical position.
       * @param value New bottom offset.
       */
    function (value) {
        if (value === void 0) { value = ''; }
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    /**
       * Sets the right position of the overlay. Clears any previously set horizontal position.
       * @param value New right offset.
       */
    GlobalPositionStrategy.prototype.right = /**
       * Sets the right position of the overlay. Clears any previously set horizontal position.
       * @param value New right offset.
       */
    function (value) {
        if (value === void 0) { value = ''; }
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     * @deprecated Pass the `width` through the `OverlayConfig`.
     * @breaking-change 7.0.0
     */
    /**
       * Sets the overlay width and clears any previously set width.
       * @param value New width for the overlay
       * @deprecated Pass the `width` through the `OverlayConfig`.
       * @breaking-change 7.0.0
       */
    GlobalPositionStrategy.prototype.width = /**
       * Sets the overlay width and clears any previously set width.
       * @param value New width for the overlay
       * @deprecated Pass the `width` through the `OverlayConfig`.
       * @breaking-change 7.0.0
       */
    function (value) {
        if (value === void 0) { value = ''; }
        if (this._overlayRef) {
            this._overlayRef.updateSize({ width: value });
        }
        else {
            this._width = value;
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     * @deprecated Pass the `height` through the `OverlayConfig`.
     * @breaking-change 7.0.0
     */
    /**
       * Sets the overlay height and clears any previously set height.
       * @param value New height for the overlay
       * @deprecated Pass the `height` through the `OverlayConfig`.
       * @breaking-change 7.0.0
       */
    GlobalPositionStrategy.prototype.height = /**
       * Sets the overlay height and clears any previously set height.
       * @param value New height for the overlay
       * @deprecated Pass the `height` through the `OverlayConfig`.
       * @breaking-change 7.0.0
       */
    function (value) {
        if (value === void 0) { value = ''; }
        if (this._overlayRef) {
            this._overlayRef.updateSize({ height: value });
        }
        else {
            this._height = value;
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    /**
       * Centers the overlay horizontally with an optional offset.
       * Clears any previously set horizontal position.
       *
       * @param offset Overlay offset from the horizontal center.
       */
    GlobalPositionStrategy.prototype.centerHorizontally = /**
       * Centers the overlay horizontally with an optional offset.
       * Clears any previously set horizontal position.
       *
       * @param offset Overlay offset from the horizontal center.
       */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    /**
       * Centers the overlay vertically with an optional offset.
       * Clears any previously set vertical position.
       *
       * @param offset Overlay offset from the vertical center.
       */
    GlobalPositionStrategy.prototype.centerVertically = /**
       * Centers the overlay vertically with an optional offset.
       * Clears any previously set vertical position.
       *
       * @param offset Overlay offset from the vertical center.
       */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * @docs-private
     */
    /**
       * Apply the position to the element.
       * @docs-private
       */
    GlobalPositionStrategy.prototype.apply = /**
       * Apply the position to the element.
       * @docs-private
       */
    function () {
        // Since the overlay ref applies the strategy asynchronously, it could
        // have been disposed before it ends up being applied. If that is the
        // case, we shouldn't do anything.
        if (!this._overlayRef.hasAttached()) {
            return;
        }
        var styles = this._overlayRef.overlayElement.style;
        var parentStyles = this._overlayRef.hostElement.style;
        var config = this._overlayRef.getConfig();
        styles.position = this._cssPosition;
        styles.marginLeft = config.width === '100%' ? '0' : this._leftOffset;
        styles.marginTop = config.height === '100%' ? '0' : this._topOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        if (config.width === '100%') {
            parentStyles.justifyContent = 'flex-start';
        }
        else if (this._justifyContent === 'center') {
            parentStyles.justifyContent = 'center';
        }
        else if (this._overlayRef.getConfig().direction === 'rtl') {
            // In RTL the browser will invert `flex-start` and `flex-end` automatically, but we
            // don't want that because our positioning is explicitly `left` and `right`, hence
            // why we do another inversion to ensure that the overlay stays in the same position.
            // TODO: reconsider this if we add `start` and `end` methods.
            if (this._justifyContent === 'flex-start') {
                parentStyles.justifyContent = 'flex-end';
            }
            else if (this._justifyContent === 'flex-end') {
                parentStyles.justifyContent = 'flex-start';
            }
        }
        else {
            parentStyles.justifyContent = this._justifyContent;
        }
        parentStyles.alignItems = config.height === '100%' ? 'flex-start' : this._alignItems;
    };
    /**
     * Noop implemented as a part of the PositionStrategy interface.
     * @docs-private
     */
    /**
       * Noop implemented as a part of the PositionStrategy interface.
       * @docs-private
       */
    GlobalPositionStrategy.prototype.dispose = /**
       * Noop implemented as a part of the PositionStrategy interface.
       * @docs-private
       */
    function () { };
    return GlobalPositionStrategy;
}());
exports.GlobalPositionStrategy = GlobalPositionStrategy;
//# sourceMappingURL=global-position-strategy.js.map