"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var connected_position_1 = require("./connected-position");
var flexible_connected_position_strategy_1 = require("./flexible-connected-position-strategy");
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative to some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 * @deprecated Use `FlexibleConnectedPositionStrategy` instead.
 * @breaking-change 7.0.0
 */
var /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative to some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 * @deprecated Use `FlexibleConnectedPositionStrategy` instead.
 * @breaking-change 7.0.0
 */
ConnectedPositionStrategy = /** @class */ (function () {
    function ConnectedPositionStrategy(originPos, overlayPos, connectedTo, viewportRuler, document, 
    // @breaking-change 7.0.0 `platform` parameter to be made required.
    // @breaking-change 7.0.0 `platform` parameter to be made required.
    platform) {
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        // Since the `ConnectedPositionStrategy` is deprecated and we don't want to maintain
        // the extra logic, we create an instance of the positioning strategy that has some
        // defaults that make it behave as the old position strategy and to which we'll
        // proxy all of the API calls.
        this._positionStrategy =
            new flexible_connected_position_strategy_1.FlexibleConnectedPositionStrategy(connectedTo, viewportRuler, document, platform)
                .withFlexibleDimensions(false)
                .withPush(false)
                .withViewportMargin(0);
        this.withFallbackPosition(originPos, overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /** Whether the we're dealing with an RTL context */
        get: /** Whether the we're dealing with an RTL context */
        function () {
            return this._overlayRef.getDirection() === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /** Emits an event when the connection point changes. */
        get: /** Emits an event when the connection point changes. */
        function () {
            return this._positionStrategy.positionChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: /** Ordered list of preferred positions, from most to least desirable. */
        function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /** Attach this position strategy to an overlay. */
    /** Attach this position strategy to an overlay. */
    ConnectedPositionStrategy.prototype.attach = /** Attach this position strategy to an overlay. */
    function (overlayRef) {
        this._overlayRef = overlayRef;
        this._positionStrategy.attach(overlayRef);
        if (this._direction) {
            overlayRef.setDirection(this._direction);
            this._direction = null;
        }
    };
    /** Disposes all resources used by the position strategy. */
    /** Disposes all resources used by the position strategy. */
    ConnectedPositionStrategy.prototype.dispose = /** Disposes all resources used by the position strategy. */
    function () {
        this._positionStrategy.dispose();
    };
    /** @docs-private */
    /** @docs-private */
    ConnectedPositionStrategy.prototype.detach = /** @docs-private */
    function () {
        this._positionStrategy.detach();
    };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     */
    /**
       * Updates the position of the overlay element, using whichever preferred position relative
       * to the origin fits on-screen.
       * @docs-private
       */
    ConnectedPositionStrategy.prototype.apply = /**
       * Updates the position of the overlay element, using whichever preferred position relative
       * to the origin fits on-screen.
       * @docs-private
       */
    function () {
        this._positionStrategy.apply();
    };
    /**
     * Re-positions the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    /**
       * Re-positions the overlay element with the trigger in its last calculated position,
       * even if a position higher in the "preferred positions" list would now fit. This
       * allows one to re-align the panel without changing the orientation of the panel.
       */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = /**
       * Re-positions the overlay element with the trigger in its last calculated position,
       * even if a position higher in the "preferred positions" list would now fit. This
       * allows one to re-align the panel without changing the orientation of the panel.
       */
    function () {
        this._positionStrategy.reapplyLastPosition();
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    /**
       * Sets the list of Scrollable containers that host the origin element so that
       * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
       * Scrollable must be an ancestor element of the strategy's origin element.
       */
    ConnectedPositionStrategy.prototype.withScrollableContainers = /**
       * Sets the list of Scrollable containers that host the origin element so that
       * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
       * Scrollable must be an ancestor element of the strategy's origin element.
       */
    function (scrollables) {
        this._positionStrategy.withScrollableContainers(scrollables);
    };
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    /**
       * Adds a new preferred fallback position.
       * @param originPos
       * @param overlayPos
       */
    ConnectedPositionStrategy.prototype.withFallbackPosition = /**
       * Adds a new preferred fallback position.
       * @param originPos
       * @param overlayPos
       */
    function (originPos, overlayPos, offsetX, offsetY) {
        var position = new connected_position_1.ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY);
        this._preferredPositions.push(position);
        this._positionStrategy.withPositions(this._preferredPositions);
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    /**
       * Sets the layout direction so the overlay's position can be adjusted to match.
       * @param dir New layout direction.
       */
    ConnectedPositionStrategy.prototype.withDirection = /**
       * Sets the layout direction so the overlay's position can be adjusted to match.
       * @param dir New layout direction.
       */
    function (dir) {
        // Since the direction might be declared before the strategy is attached,
        // we save the value in a temporary property and we'll transfer it to the
        // overlay ref on attachment.
        if (this._overlayRef) {
            this._overlayRef.setDirection(dir);
        }
        else {
            this._direction = dir;
        }
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    /**
       * Sets an offset for the overlay's connection point on the x-axis
       * @param offset New offset in the X axis.
       */
    ConnectedPositionStrategy.prototype.withOffsetX = /**
       * Sets an offset for the overlay's connection point on the x-axis
       * @param offset New offset in the X axis.
       */
    function (offset) {
        this._positionStrategy.withDefaultOffsetX(offset);
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    /**
       * Sets an offset for the overlay's connection point on the y-axis
       * @param  offset New offset in the Y axis.
       */
    ConnectedPositionStrategy.prototype.withOffsetY = /**
       * Sets an offset for the overlay's connection point on the y-axis
       * @param  offset New offset in the Y axis.
       */
    function (offset) {
        this._positionStrategy.withDefaultOffsetY(offset);
        return this;
    };
    /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param isLocked Whether the overlay should locked in.
     */
    /**
       * Sets whether the overlay's position should be locked in after it is positioned
       * initially. When an overlay is locked in, it won't attempt to reposition itself
       * when the position is re-applied (e.g. when the user scrolls away).
       * @param isLocked Whether the overlay should locked in.
       */
    ConnectedPositionStrategy.prototype.withLockedPosition = /**
       * Sets whether the overlay's position should be locked in after it is positioned
       * initially. When an overlay is locked in, it won't attempt to reposition itself
       * when the position is re-applied (e.g. when the user scrolls away).
       * @param isLocked Whether the overlay should locked in.
       */
    function (isLocked) {
        this._positionStrategy.withLockedPosition(isLocked);
        return this;
    };
    /**
     * Overwrites the current set of positions with an array of new ones.
     * @param positions Position pairs to be set on the strategy.
     */
    /**
       * Overwrites the current set of positions with an array of new ones.
       * @param positions Position pairs to be set on the strategy.
       */
    ConnectedPositionStrategy.prototype.withPositions = /**
       * Overwrites the current set of positions with an array of new ones.
       * @param positions Position pairs to be set on the strategy.
       */
    function (positions) {
        this._preferredPositions = positions.slice();
        this._positionStrategy.withPositions(this._preferredPositions);
        return this;
    };
    /**
     * Sets the origin element, relative to which to position the overlay.
     * @param origin Reference to the new origin element.
     */
    /**
       * Sets the origin element, relative to which to position the overlay.
       * @param origin Reference to the new origin element.
       */
    ConnectedPositionStrategy.prototype.setOrigin = /**
       * Sets the origin element, relative to which to position the overlay.
       * @param origin Reference to the new origin element.
       */
    function (origin) {
        this._positionStrategy.setOrigin(origin);
        return this;
    };
    return ConnectedPositionStrategy;
}());
exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
//# sourceMappingURL=connected-position-strategy.js.map