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
import { ElementRef } from '@angular/core';
import { ConnectedOverlayPositionChange, validateHorizontalPosition, validateVerticalPosition, } from './connected-position';
import { Observable, Subscription, Subject } from 'rxjs';
import { isElementScrolledOutsideView, isElementClippedByScrolling } from './scroll-clip';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
FlexibleConnectedPositionStrategy = /** @class */ (function () {
    function FlexibleConnectedPositionStrategy(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
        var _this = this;
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
        this._overlayContainer = _overlayContainer;
        /**
         * Whether we're performing the very first positioning of the overlay.
         */
        this._isInitialRender = true;
        /**
         * Last size used for the bounding box. Used to avoid resizing the overlay after open.
         */
        this._lastBoundingBoxSize = { width: 0, height: 0 };
        /**
         * Whether the overlay was pushed in a previous positioning.
         */
        this._isPushed = false;
        /**
         * Whether the overlay can be pushed on-screen on the initial open.
         */
        this._canPush = true;
        /**
         * Whether the overlay can grow via flexible width/height after the initial open.
         */
        this._growAfterOpen = false;
        /**
         * Whether the overlay's width and height can be constrained to fit within the viewport.
         */
        this._hasFlexibleDimensions = true;
        /**
         * Whether the overlay position is locked.
         */
        this._positionLocked = false;
        /**
         * Amount of space that must be maintained between the overlay and the edge of the viewport.
         */
        this._viewportMargin = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */
        this.scrollables = [];
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = [];
        /**
         * Subject that emits whenever the position changes.
         */
        this._positionChanges = new Subject();
        /**
         * Subscription to viewport size changes.
         */
        this._resizeSubscription = Subscription.EMPTY;
        /**
         * Default offset for the overlay along the x axis.
         */
        this._offsetX = 0;
        /**
         * Default offset for the overlay along the y axis.
         */
        this._offsetY = 0;
        /**
         * Amount of subscribers to the `positionChanges` stream.
         */
        this._positionChangeSubscriptions = 0;
        /**
         * Observable sequence of position changes.
         */
        this.positionChanges = Observable.create(function (observer) {
            var /** @type {?} */ subscription = _this._positionChanges.subscribe(observer);
            _this._positionChangeSubscriptions++;
            return function () {
                subscription.unsubscribe();
                _this._positionChangeSubscriptions--;
            };
        });
        this.setOrigin(connectedTo);
    }
    Object.defineProperty(FlexibleConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: /**
         * Ordered list of preferred positions, from most to least desirable.
         * @return {?}
         */
        function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /** Attaches this position strategy to an overlay. */
    /**
     * Attaches this position strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.attach = /**
     * Attaches this position strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        var _this = this;
        if (this._overlayRef && overlayRef !== this._overlayRef) {
            throw Error('This position strategy is already attached to an overlay');
        }
        this._validatePositions();
        overlayRef.hostElement.classList.add('cdk-overlay-connected-position-bounding-box');
        this._overlayRef = overlayRef;
        this._boundingBox = overlayRef.hostElement;
        this._pane = overlayRef.overlayElement;
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this._viewportRuler.change().subscribe(function () { return _this.apply(); });
    };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin best fits on-screen.
     *
     * The selection of a position goes as follows:
     *  - If any positions fit completely within the viewport as-is,
     *      choose the first position that does so.
     *  - If flexible dimensions are enabled and at least one satifies the given minimum width/height,
     *      choose the position with the greatest available size modified by the positions' weight.
     *  - If pushing is enabled, take the position that went off-screen the least and push it
     *      on-screen.
     *  - If none of the previous criteria were met, use the position that goes off-screen the least.
     * @docs-private
     */
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin best fits on-screen.
     *
     * The selection of a position goes as follows:
     *  - If any positions fit completely within the viewport as-is,
     *      choose the first position that does so.
     *  - If flexible dimensions are enabled and at least one satifies the given minimum width/height,
     *      choose the position with the greatest available size modified by the positions' weight.
     *  - If pushing is enabled, take the position that went off-screen the least and push it
     *      on-screen.
     *  - If none of the previous criteria were met, use the position that goes off-screen the least.
     * \@docs-private
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.apply = /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin best fits on-screen.
     *
     * The selection of a position goes as follows:
     *  - If any positions fit completely within the viewport as-is,
     *      choose the first position that does so.
     *  - If flexible dimensions are enabled and at least one satifies the given minimum width/height,
     *      choose the position with the greatest available size modified by the positions' weight.
     *  - If pushing is enabled, take the position that went off-screen the least and push it
     *      on-screen.
     *  - If none of the previous criteria were met, use the position that goes off-screen the least.
     * \@docs-private
     * @return {?}
     */
    function () {
        // We shouldn't do anything if the strategy was disposed or we're on the server.
        // @breaking-change 7.0.0 Remove `_platform` null check once it's guaranteed to be defined.
        if (this._isDisposed || (this._platform && !this._platform.isBrowser)) {
            return;
        }
        // If the position has been applied already (e.g. when the overlay was opened) and the
        // consumer opted into locking in the position, re-use the old position, in order to
        // prevent the overlay from jumping around.
        if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
            this.reapplyLastPosition();
            return;
        }
        this._resetOverlayElementStyles();
        this._resetBoundingBoxStyles();
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        // We use the viewport rect to determine whether a position would go off-screen.
        this._viewportRect = this._getNarrowedViewportRect();
        this._originRect = this._origin.getBoundingClientRect();
        this._overlayRect = this._pane.getBoundingClientRect();
        var /** @type {?} */ originRect = this._originRect;
        var /** @type {?} */ overlayRect = this._overlayRect;
        var /** @type {?} */ viewportRect = this._viewportRect;
        // Positions where the overlay will fit with flexible dimensions.
        var /** @type {?} */ flexibleFits = [];
        // Fallback if none of the preferred positions fit within the viewport.
        var /** @type {?} */ fallback;
        // Go through each of the preferred positions looking for a good fit.
        // If a good fit is found, it will be applied immediately.
        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            // Get the exact (x, y) coordinate for the point-of-origin on the origin element.
            var /** @type {?} */ originPoint = this._getOriginPoint(originRect, pos);
            // From that point-of-origin, get the exact (x, y) coordinate for the top-left corner of the
            // overlay in this position. We use the top-left corner for calculations and later translate
            // this into an appropriate (top, left, bottom, right) style.
            var /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
            // Calculate how well the overlay would fit into the viewport with this point.
            var /** @type {?} */ overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
            // If the overlay, without any further work, fits into the viewport, use this position.
            if (overlayFit.isCompletelyWithinViewport) {
                this._isPushed = false;
                this._applyPosition(pos, originPoint);
                return;
            }
            // If the overlay has flexible dimensions, we can use this position
            // so long as there's enough space for the minimum dimensions.
            if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
                // Save positions where the overlay will fit with flexible dimensions. We will use these
                // if none of the positions fit *without* flexible dimensions.
                flexibleFits.push({
                    position: pos,
                    origin: originPoint,
                    overlayRect: overlayRect,
                    boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
                });
                continue;
            }
            // If the current preferred position does not fit on the screen, remember the position
            // if it has more visible area on-screen than we've seen and move onto the next preferred
            // position.
            if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
                fallback = { overlayFit: overlayFit, overlayPoint: overlayPoint, originPoint: originPoint, position: pos, overlayRect: overlayRect };
            }
        }
        // If there are any positions where the overlay would fit with flexible dimensions, choose the
        // one that has the greatest area available modified by the position's weight
        if (flexibleFits.length) {
            var /** @type {?} */ bestFit = null;
            var /** @type {?} */ bestScore = -1;
            for (var _b = 0, flexibleFits_1 = flexibleFits; _b < flexibleFits_1.length; _b++) {
                var fit_1 = flexibleFits_1[_b];
                var /** @type {?} */ score = fit_1.boundingBoxRect.width * fit_1.boundingBoxRect.height * (fit_1.position.weight || 1);
                if (score > bestScore) {
                    bestScore = score;
                    bestFit = fit_1;
                }
            }
            this._isPushed = false;
            this._applyPosition(/** @type {?} */ ((bestFit)).position, /** @type {?} */ ((bestFit)).origin);
            return;
        }
        // When none of the preferred positions fit within the viewport, take the position
        // that went off-screen the least and attempt to push it on-screen.
        if (this._canPush) {
            // TODO(jelbourn): after pushing, the opening "direction" of the overlay might not make sense.
            this._isPushed = true;
            this._applyPosition(/** @type {?} */ ((fallback)).position, /** @type {?} */ ((fallback)).originPoint);
            return;
        }
        // All options for getting the overlay within the viewport have been exhausted, so go with the
        // position that went off-screen the least.
        this._applyPosition(/** @type {?} */ ((fallback)).position, /** @type {?} */ ((fallback)).originPoint);
    };
    /**
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.detach = /**
     * @return {?}
     */
    function () {
        this._resizeSubscription.unsubscribe();
    };
    /** Cleanup after the element gets destroyed. */
    /**
     * Cleanup after the element gets destroyed.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.dispose = /**
     * Cleanup after the element gets destroyed.
     * @return {?}
     */
    function () {
        if (!this._isDisposed) {
            this.detach();
            this._boundingBox = null;
            this._positionChanges.complete();
            this._isDisposed = true;
        }
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.reapplyLastPosition = /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    function () {
        if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
            this._originRect = this._origin.getBoundingClientRect();
            this._overlayRect = this._pane.getBoundingClientRect();
            this._viewportRect = this._getNarrowedViewportRect();
            var /** @type {?} */ lastPosition = this._lastPosition || this._preferredPositions[0];
            var /** @type {?} */ originPoint = this._getOriginPoint(this._originRect, lastPosition);
            this._applyPosition(lastPosition, originPoint);
        }
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
     * @param {?} scrollables
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withScrollableContainers = /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds new preferred positions.
     * @param positions List of positions options for this overlay.
     */
    /**
     * Adds new preferred positions.
     * @param {?} positions List of positions options for this overlay.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withPositions = /**
     * Adds new preferred positions.
     * @param {?} positions List of positions options for this overlay.
     * @return {?}
     */
    function (positions) {
        this._preferredPositions = positions;
        // If the last calculated position object isn't part of the positions anymore, clear
        // it in order to avoid it being picked up if the consumer tries to re-apply.
        if (positions.indexOf(/** @type {?} */ ((this._lastPosition))) === -1) {
            this._lastPosition = null;
        }
        this._validatePositions();
        return this;
    };
    /**
     * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
     * @param margin Required margin between the overlay and the viewport edge in pixels.
     */
    /**
     * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
     * @param {?} margin Required margin between the overlay and the viewport edge in pixels.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withViewportMargin = /**
     * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
     * @param {?} margin Required margin between the overlay and the viewport edge in pixels.
     * @return {?}
     */
    function (margin) {
        this._viewportMargin = margin;
        return this;
    };
    /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
    /**
     * Sets whether the overlay's width and height can be constrained to fit within the viewport.
     * @param {?=} flexibleDimensions
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withFlexibleDimensions = /**
     * Sets whether the overlay's width and height can be constrained to fit within the viewport.
     * @param {?=} flexibleDimensions
     * @return {?}
     */
    function (flexibleDimensions) {
        if (flexibleDimensions === void 0) { flexibleDimensions = true; }
        this._hasFlexibleDimensions = flexibleDimensions;
        return this;
    };
    /** Sets whether the overlay can grow after the initial open via flexible width/height. */
    /**
     * Sets whether the overlay can grow after the initial open via flexible width/height.
     * @param {?=} growAfterOpen
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withGrowAfterOpen = /**
     * Sets whether the overlay can grow after the initial open via flexible width/height.
     * @param {?=} growAfterOpen
     * @return {?}
     */
    function (growAfterOpen) {
        if (growAfterOpen === void 0) { growAfterOpen = true; }
        this._growAfterOpen = growAfterOpen;
        return this;
    };
    /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
    /**
     * Sets whether the overlay can be pushed on-screen if none of the provided positions fit.
     * @param {?=} canPush
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withPush = /**
     * Sets whether the overlay can be pushed on-screen if none of the provided positions fit.
     * @param {?=} canPush
     * @return {?}
     */
    function (canPush) {
        if (canPush === void 0) { canPush = true; }
        this._canPush = canPush;
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
     * @param {?=} isLocked Whether the overlay should locked in.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withLockedPosition = /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param {?=} isLocked Whether the overlay should locked in.
     * @return {?}
     */
    function (isLocked) {
        if (isLocked === void 0) { isLocked = true; }
        this._positionLocked = isLocked;
        return this;
    };
    /**
     * Sets the origin element, relative to which to position the overlay.
     * @param origin Reference to the new origin element.
     */
    /**
     * Sets the origin element, relative to which to position the overlay.
     * @param {?} origin Reference to the new origin element.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.setOrigin = /**
     * Sets the origin element, relative to which to position the overlay.
     * @param {?} origin Reference to the new origin element.
     * @return {?}
     */
    function (origin) {
        this._origin = origin instanceof ElementRef ? origin.nativeElement : origin;
        return this;
    };
    /**
     * Sets the default offset for the overlay's connection point on the x-axis.
     * @param offset New offset in the X axis.
     */
    /**
     * Sets the default offset for the overlay's connection point on the x-axis.
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withDefaultOffsetX = /**
     * Sets the default offset for the overlay's connection point on the x-axis.
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets the default offset for the overlay's connection point on the y-axis.
     * @param offset New offset in the Y axis.
     */
    /**
     * Sets the default offset for the overlay's connection point on the y-axis.
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withDefaultOffsetY = /**
     * Sets the default offset for the overlay's connection point on the y-axis.
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Configures that the position strategy should set a `transform-origin` on some elements
     * inside the overlay, depending on the current position that is being applied. This is
     * useful for the cases where the origin of an animation can change depending on the
     * alignment of the overlay.
     * @param selector CSS selector that will be used to find the target
     *    elements onto which to set the transform origin.
     */
    /**
     * Configures that the position strategy should set a `transform-origin` on some elements
     * inside the overlay, depending on the current position that is being applied. This is
     * useful for the cases where the origin of an animation can change depending on the
     * alignment of the overlay.
     * @param {?} selector CSS selector that will be used to find the target
     *    elements onto which to set the transform origin.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype.withTransformOriginOn = /**
     * Configures that the position strategy should set a `transform-origin` on some elements
     * inside the overlay, depending on the current position that is being applied. This is
     * useful for the cases where the origin of an animation can change depending on the
     * alignment of the overlay.
     * @param {?} selector CSS selector that will be used to find the target
     *    elements onto which to set the transform origin.
     * @return {?}
     */
    function (selector) {
        this._transformOriginSelector = selector;
        return this;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getOriginPoint = /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    function (originRect, pos) {
        var /** @type {?} */ x;
        if (pos.originX == 'center') {
            // Note: when centering we should always use the `left`
            // offset, otherwise the position will be wrong in RTL.
            x = originRect.left + (originRect.width / 2);
        }
        else {
            var /** @type {?} */ startX = this._isRtl() ? originRect.right : originRect.left;
            var /** @type {?} */ endX = this._isRtl() ? originRect.left : originRect.right;
            x = pos.originX == 'start' ? startX : endX;
        }
        var /** @type {?} */ y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} pos
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getOverlayPoint = /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} pos
     * @return {?}
     */
    function (originPoint, overlayRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the
        // potential overlay position relative to the origin point.
        var /** @type {?} */ overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl() ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
        }
        var /** @type {?} */ overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        return {
            x: originPoint.x + overlayStartX,
            y: originPoint.y + overlayStartY,
        };
    };
    /**
     * Gets how well an overlay at the given point will fit within the viewport.
     * @param {?} point
     * @param {?} overlay
     * @param {?} viewport
     * @param {?} position
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getOverlayFit = /**
     * Gets how well an overlay at the given point will fit within the viewport.
     * @param {?} point
     * @param {?} overlay
     * @param {?} viewport
     * @param {?} position
     * @return {?}
     */
    function (point, overlay, viewport, position) {
        var x = point.x, y = point.y;
        var /** @type {?} */ offsetX = this._getOffset(position, 'x');
        var /** @type {?} */ offsetY = this._getOffset(position, 'y');
        // Account for the offsets since they could push the overlay out of the viewport.
        if (offsetX) {
            x += offsetX;
        }
        if (offsetY) {
            y += offsetY;
        }
        // How much the overlay would overflow at this position, on each side.
        var /** @type {?} */ leftOverflow = 0 - x;
        var /** @type {?} */ rightOverflow = (x + overlay.width) - viewport.width;
        var /** @type {?} */ topOverflow = 0 - y;
        var /** @type {?} */ bottomOverflow = (y + overlay.height) - viewport.height;
        // Visible parts of the element on each axis.
        var /** @type {?} */ visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
        var /** @type {?} */ visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
        var /** @type {?} */ visibleArea = visibleWidth * visibleHeight;
        return {
            visibleArea: visibleArea,
            isCompletelyWithinViewport: (overlay.width * overlay.height) === visibleArea,
            fitsInViewportVertically: visibleHeight === overlay.height,
            fitsInViewportHorizontally: visibleWidth == overlay.width,
        };
    };
    /**
     * Whether the overlay can fit within the viewport when it may resize either its width or height.
     * @param {?} fit How well the overlay fits in the viewport at some position.
     * @param {?} point The (x, y) coordinates of the overlat at some position.
     * @param {?} viewport The geometry of the viewport.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._canFitWithFlexibleDimensions = /**
     * Whether the overlay can fit within the viewport when it may resize either its width or height.
     * @param {?} fit How well the overlay fits in the viewport at some position.
     * @param {?} point The (x, y) coordinates of the overlat at some position.
     * @param {?} viewport The geometry of the viewport.
     * @return {?}
     */
    function (fit, point, viewport) {
        if (this._hasFlexibleDimensions) {
            var /** @type {?} */ availableHeight = viewport.bottom - point.y;
            var /** @type {?} */ availableWidth = viewport.right - point.x;
            var /** @type {?} */ minHeight = this._overlayRef.getConfig().minHeight;
            var /** @type {?} */ minWidth = this._overlayRef.getConfig().minWidth;
            var /** @type {?} */ verticalFit = fit.fitsInViewportVertically ||
                (minHeight != null && minHeight <= availableHeight);
            var /** @type {?} */ horizontalFit = fit.fitsInViewportHorizontally ||
                (minWidth != null && minWidth <= availableWidth);
            return verticalFit && horizontalFit;
        }
    };
    /**
     * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
     * the viewport, the top-left corner will be pushed on-screen (with overflow occuring on the
     * right and bottom).
     *
     * @param {?} start The starting point from which the overlay is pushed.
     * @param {?} overlay The overlay dimensions.
     * @return {?} The point at which to position the overlay after pushing. This is effectively a new
     *     originPoint.
     */
    FlexibleConnectedPositionStrategy.prototype._pushOverlayOnScreen = /**
     * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
     * the viewport, the top-left corner will be pushed on-screen (with overflow occuring on the
     * right and bottom).
     *
     * @param {?} start The starting point from which the overlay is pushed.
     * @param {?} overlay The overlay dimensions.
     * @return {?} The point at which to position the overlay after pushing. This is effectively a new
     *     originPoint.
     */
    function (start, overlay) {
        var /** @type {?} */ viewport = this._viewportRect;
        // Determine how much the overlay goes outside the viewport on each side, which we'll use to
        // decide which direction to push it.
        var /** @type {?} */ overflowRight = Math.max(start.x + overlay.width - viewport.right, 0);
        var /** @type {?} */ overflowBottom = Math.max(start.y + overlay.height - viewport.bottom, 0);
        var /** @type {?} */ overflowTop = Math.max(viewport.top - start.y, 0);
        var /** @type {?} */ overflowLeft = Math.max(viewport.left - start.x, 0);
        // Amount by which to push the overlay in each direction such that it remains on-screen.
        var /** @type {?} */ pushX, /** @type {?} */ pushY = 0;
        // If the overlay fits completely within the bounds of the viewport, push it from whichever
        // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
        // viewport and allow for the trailing end of the overlay to go out of bounds.
        if (overlay.width <= viewport.width) {
            pushX = overflowLeft || -overflowRight;
        }
        else {
            pushX = viewport.left - start.x;
        }
        if (overlay.height <= viewport.height) {
            pushY = overflowTop || -overflowBottom;
        }
        else {
            pushY = viewport.top - start.y;
        }
        return {
            x: start.x + pushX,
            y: start.y + pushY,
        };
    };
    /**
     * Applies a computed position to the overlay and emits a position change.
     * @param {?} position The position preference
     * @param {?} originPoint The point on the origin element where the overlay is connected.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._applyPosition = /**
     * Applies a computed position to the overlay and emits a position change.
     * @param {?} position The position preference
     * @param {?} originPoint The point on the origin element where the overlay is connected.
     * @return {?}
     */
    function (position, originPoint) {
        this._setTransformOrigin(position);
        this._setOverlayElementStyles(originPoint, position);
        this._setBoundingBoxStyles(originPoint, position);
        // Save the last connected position in case the position needs to be re-calculated.
        this._lastPosition = position;
        // Notify that the position has been changed along with its change properties.
        // We only emit if we've got any subscriptions, because the scroll visibility
        // calculcations can be somewhat expensive.
        if (this._positionChangeSubscriptions > 0) {
            var /** @type {?} */ scrollableViewProperties = this._getScrollVisibility();
            var /** @type {?} */ changeEvent = new ConnectedOverlayPositionChange(position, scrollableViewProperties);
            this._positionChanges.next(changeEvent);
        }
        this._isInitialRender = false;
    };
    /**
     * Sets the transform origin based on the configured selector and the passed-in position.
     * @param {?} position
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._setTransformOrigin = /**
     * Sets the transform origin based on the configured selector and the passed-in position.
     * @param {?} position
     * @return {?}
     */
    function (position) {
        if (!this._transformOriginSelector) {
            return;
        }
        var /** @type {?} */ elements = /** @type {?} */ ((this._boundingBox)).querySelectorAll(this._transformOriginSelector);
        var /** @type {?} */ xOrigin;
        var /** @type {?} */ yOrigin = position.overlayY;
        if (position.overlayX === 'center') {
            xOrigin = 'center';
        }
        else if (this._isRtl()) {
            xOrigin = position.overlayX === 'start' ? 'right' : 'left';
        }
        else {
            xOrigin = position.overlayX === 'start' ? 'left' : 'right';
        }
        for (var /** @type {?} */ i = 0; i < elements.length; i++) {
            elements[i].style.transformOrigin = xOrigin + " " + yOrigin;
        }
    };
    /**
     * Gets the position and size of the overlay's sizing container.
     *
     * This method does no measuring and applies no styles so that we can cheaply compute the
     * bounds for all positions and choose the best fit based on these results.
     * @param {?} origin
     * @param {?} position
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._calculateBoundingBoxRect = /**
     * Gets the position and size of the overlay's sizing container.
     *
     * This method does no measuring and applies no styles so that we can cheaply compute the
     * bounds for all positions and choose the best fit based on these results.
     * @param {?} origin
     * @param {?} position
     * @return {?}
     */
    function (origin, position) {
        var /** @type {?} */ viewport = this._viewportRect;
        var /** @type {?} */ isRtl = this._isRtl();
        var /** @type {?} */ height, /** @type {?} */ top, /** @type {?} */ bottom;
        if (position.overlayY === 'top') {
            // Overlay is opening "downward" and thus is bound by the bottom viewport edge.
            top = origin.y;
            height = viewport.bottom - origin.y;
        }
        else if (position.overlayY === 'bottom') {
            // Overlay is opening "upward" and thus is bound by the top viewport edge. We need to add
            // the viewport margin back in, because the viewport rect is narrowed down to remove the
            // margin, whereas the `origin` position is calculated based on its `ClientRect`.
            bottom = viewport.height - origin.y + this._viewportMargin * 2;
            height = viewport.height - bottom + this._viewportMargin;
        }
        else {
            // If neither top nor bottom, it means that the overlay
            // is vertically centered on the origin point.
            var /** @type {?} */ smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y, origin.y - viewport.left);
            var /** @type {?} */ previousHeight = this._lastBoundingBoxSize.height;
            height = smallestDistanceToViewportEdge * 2;
            top = origin.y - smallestDistanceToViewportEdge;
            if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
                top = origin.y - (previousHeight / 2);
            }
        }
        // The overlay is opening 'right-ward' (the content flows to the right).
        var /** @type {?} */ isBoundedByRightViewportEdge = (position.overlayX === 'start' && !isRtl) ||
            (position.overlayX === 'end' && isRtl);
        // The overlay is opening 'left-ward' (the content flows to the left).
        var /** @type {?} */ isBoundedByLeftViewportEdge = (position.overlayX === 'end' && !isRtl) ||
            (position.overlayX === 'start' && isRtl);
        var /** @type {?} */ width, /** @type {?} */ left, /** @type {?} */ right;
        if (isBoundedByLeftViewportEdge) {
            right = viewport.right - origin.x + this._viewportMargin;
            width = origin.x - viewport.left;
        }
        else if (isBoundedByRightViewportEdge) {
            left = origin.x;
            width = viewport.right - origin.x;
        }
        else {
            // If neither start nor end, it means that the overlay
            // is horizontally centered on the origin point.
            var /** @type {?} */ smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x, origin.x - viewport.top);
            var /** @type {?} */ previousWidth = this._lastBoundingBoxSize.width;
            width = smallestDistanceToViewportEdge * 2;
            left = origin.x - smallestDistanceToViewportEdge;
            if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
                left = origin.x - (previousWidth / 2);
            }
        }
        return { top: top, left: left, bottom: bottom, right: right, width: width, height: height };
    };
    /**
     * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
     * origin's connection point and stetches to the bounds of the viewport.
     *
     * @param {?} origin The point on the origin element where the overlay is connected.
     * @param {?} position The position preference
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._setBoundingBoxStyles = /**
     * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
     * origin's connection point and stetches to the bounds of the viewport.
     *
     * @param {?} origin The point on the origin element where the overlay is connected.
     * @param {?} position The position preference
     * @return {?}
     */
    function (origin, position) {
        var /** @type {?} */ boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
        // It's weird if the overlay *grows* while scrolling, so we take the last size into account
        // when applying a new size.
        if (!this._isInitialRender && !this._growAfterOpen) {
            boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
            boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
        }
        var /** @type {?} */ styles = /** @type {?} */ ({});
        if (this._hasExactPosition()) {
            styles.top = styles.left = '0';
            styles.bottom = styles.right = '';
            styles.width = styles.height = '100%';
        }
        else {
            var /** @type {?} */ maxHeight = this._overlayRef.getConfig().maxHeight;
            var /** @type {?} */ maxWidth = this._overlayRef.getConfig().maxWidth;
            styles.height = coerceCssPixelValue(boundingBoxRect.height);
            styles.top = coerceCssPixelValue(boundingBoxRect.top);
            styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
            styles.width = coerceCssPixelValue(boundingBoxRect.width);
            styles.left = coerceCssPixelValue(boundingBoxRect.left);
            styles.right = coerceCssPixelValue(boundingBoxRect.right);
            // Push the pane content towards the proper direction.
            if (position.overlayX === 'center') {
                styles.alignItems = 'center';
            }
            else {
                styles.alignItems = position.overlayX === 'end' ? 'flex-end' : 'flex-start';
            }
            if (position.overlayY === 'center') {
                styles.justifyContent = 'center';
            }
            else {
                styles.justifyContent = position.overlayY === 'bottom' ? 'flex-end' : 'flex-start';
            }
            if (maxHeight) {
                styles.maxHeight = coerceCssPixelValue(maxHeight);
            }
            if (maxWidth) {
                styles.maxWidth = coerceCssPixelValue(maxWidth);
            }
        }
        this._lastBoundingBoxSize = boundingBoxRect;
        extendStyles(/** @type {?} */ ((this._boundingBox)).style, styles);
    };
    /**
     * Resets the styles for the bounding box so that a new positioning can be computed.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._resetBoundingBoxStyles = /**
     * Resets the styles for the bounding box so that a new positioning can be computed.
     * @return {?}
     */
    function () {
        extendStyles(/** @type {?} */ ((this._boundingBox)).style, /** @type {?} */ ({
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            height: '',
            width: '',
            alignItems: '',
            justifyContent: '',
        }));
    };
    /**
     * Resets the styles for the overlay pane so that a new positioning can be computed.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._resetOverlayElementStyles = /**
     * Resets the styles for the overlay pane so that a new positioning can be computed.
     * @return {?}
     */
    function () {
        extendStyles(this._pane.style, /** @type {?} */ ({
            top: '',
            left: '',
            bottom: '',
            right: '',
            position: '',
        }));
    };
    /**
     * Sets positioning styles to the overlay element.
     * @param {?} originPoint
     * @param {?} position
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._setOverlayElementStyles = /**
     * Sets positioning styles to the overlay element.
     * @param {?} originPoint
     * @param {?} position
     * @return {?}
     */
    function (originPoint, position) {
        var /** @type {?} */ styles = /** @type {?} */ ({});
        if (this._hasExactPosition()) {
            extendStyles(styles, this._getExactOverlayY(position, originPoint));
            extendStyles(styles, this._getExactOverlayX(position, originPoint));
        }
        else {
            styles.position = 'static';
        }
        // Use a transform to apply the offsets. We do this because the `center` positions rely on
        // being in the normal flex flow and setting a `top` / `left` at all will completely throw
        // off the position. We also can't use margins, because they won't have an effect in some
        // cases where the element doesn't have anything to "push off of". Finally, this works
        // better both with flexible and non-flexible positioning.
        var /** @type {?} */ transformString = '';
        var /** @type {?} */ offsetX = this._getOffset(position, 'x');
        var /** @type {?} */ offsetY = this._getOffset(position, 'y');
        if (offsetX) {
            transformString += "translateX(" + offsetX + "px) ";
        }
        if (offsetY) {
            transformString += "translateY(" + offsetY + "px)";
        }
        styles.transform = transformString.trim();
        // If a maxWidth or maxHeight is specified on the overlay, we remove them. We do this because
        // we need these values to both be set to "100%" for the automatic flexible sizing to work.
        // The maxHeight and maxWidth are set on the boundingBox in order to enforce the constraint.
        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxHeight) {
            styles.maxHeight = '';
        }
        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxWidth) {
            styles.maxWidth = '';
        }
        extendStyles(this._pane.style, styles);
    };
    /**
     * Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing.
     * @param {?} position
     * @param {?} originPoint
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getExactOverlayY = /**
     * Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing.
     * @param {?} position
     * @param {?} originPoint
     * @return {?}
     */
    function (position, originPoint) {
        // Reset any existing styles. This is necessary in case the
        // preferred position has changed since the last `apply`.
        var /** @type {?} */ styles = /** @type {?} */ ({ top: null, bottom: null });
        var /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
        if (this._isPushed) {
            overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect);
        }
        // @breaking-change 7.0.0 Currently the `_overlayContainer` is optional in order to avoid a
        // breaking change. The null check here can be removed once the `_overlayContainer` becomes
        // a required parameter.
        var /** @type {?} */ virtualKeyboardOffset = this._overlayContainer ?
            this._overlayContainer.getContainerElement().getBoundingClientRect().top : 0;
        // Normally this would be zero, however when the overlay is attached to an input (e.g. in an
        // autocomplete), mobile browsers will shift everything in order to put the input in the middle
        // of the screen and to make space for the virtual keyboard. We need to account for this offset,
        // otherwise our positioning will be thrown off.
        overlayPoint.y -= virtualKeyboardOffset;
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear
        // above or below the origin and the direction in which the element will expand.
        if (position.overlayY === 'bottom') {
            // When using `bottom`, we adjust the y position such that it is the distance
            // from the bottom of the viewport rather than the top.
            var /** @type {?} */ documentHeight = this._document.documentElement.clientHeight;
            styles.bottom = documentHeight - (overlayPoint.y + this._overlayRect.height) + "px";
        }
        else {
            styles.top = coerceCssPixelValue(overlayPoint.y);
        }
        return styles;
    };
    /**
     * Gets the exact left/right for the overlay when not using flexible sizing or when pushing.
     * @param {?} position
     * @param {?} originPoint
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getExactOverlayX = /**
     * Gets the exact left/right for the overlay when not using flexible sizing or when pushing.
     * @param {?} position
     * @param {?} originPoint
     * @return {?}
     */
    function (position, originPoint) {
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        var /** @type {?} */ styles = /** @type {?} */ ({ left: null, right: null });
        var /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
        if (this._isPushed) {
            overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect);
        }
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        var /** @type {?} */ horizontalStyleProperty;
        if (this._isRtl()) {
            horizontalStyleProperty = position.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = position.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        if (horizontalStyleProperty === 'right') {
            var /** @type {?} */ documentWidth = this._document.documentElement.clientWidth;
            styles.right = documentWidth - (overlayPoint.x + this._overlayRect.width) + "px";
        }
        else {
            styles.left = coerceCssPixelValue(overlayPoint.x);
        }
        return styles;
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getScrollVisibility = /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @return {?}
     */
    function () {
        // Note: needs fresh rects since the position could've changed.
        var /** @type {?} */ originBounds = this._origin.getBoundingClientRect();
        var /** @type {?} */ overlayBounds = this._pane.getBoundingClientRect();
        // TODO(jelbourn): instead of needing all of the client rects for these scrolling containers
        // every time, we should be able to use the scrollTop of the containers if the size of those
        // containers hasn't changed.
        var /** @type {?} */ scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return scrollable.getElementRef().nativeElement.getBoundingClientRect();
        });
        return {
            isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
            isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._subtractOverflows = /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    /**
     * Narrows the given viewport rect by the current _viewportMargin.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getNarrowedViewportRect = /**
     * Narrows the given viewport rect by the current _viewportMargin.
     * @return {?}
     */
    function () {
        // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
        // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
        // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
        // and `innerHeight` that do. This is necessary, because the overlay container uses
        // 100% `width` and `height` which don't include the scrollbar either.
        var /** @type {?} */ width = this._document.documentElement.clientWidth;
        var /** @type {?} */ height = this._document.documentElement.clientHeight;
        var /** @type {?} */ scrollPosition = this._viewportRuler.getViewportScrollPosition();
        return {
            top: scrollPosition.top + this._viewportMargin,
            left: scrollPosition.left + this._viewportMargin,
            right: scrollPosition.left + width - this._viewportMargin,
            bottom: scrollPosition.top + height - this._viewportMargin,
            width: width - (2 * this._viewportMargin),
            height: height - (2 * this._viewportMargin),
        };
    };
    /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._isRtl = /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    function () {
        return this._overlayRef.getDirection() === 'rtl';
    };
    /**
     * Determines whether the overlay uses exact or flexible positioning.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._hasExactPosition = /**
     * Determines whether the overlay uses exact or flexible positioning.
     * @return {?}
     */
    function () {
        return !this._hasFlexibleDimensions || this._isPushed;
    };
    /**
     * Retrieves the offset of a position along the x or y axis.
     * @param {?} position
     * @param {?} axis
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._getOffset = /**
     * Retrieves the offset of a position along the x or y axis.
     * @param {?} position
     * @param {?} axis
     * @return {?}
     */
    function (position, axis) {
        if (axis === 'x') {
            // We don't do something like `position['offset' + axis]` in
            // order to avoid breking minifiers that rename properties.
            return position.offsetX == null ? this._offsetX : position.offsetX;
        }
        return position.offsetY == null ? this._offsetY : position.offsetY;
    };
    /**
     * Validates that the current position match the expected values.
     * @return {?}
     */
    FlexibleConnectedPositionStrategy.prototype._validatePositions = /**
     * Validates that the current position match the expected values.
     * @return {?}
     */
    function () {
        if (!this._preferredPositions.length) {
            throw Error('FlexibleConnectedPositionStrategy: At least one position is required.');
        }
        // TODO(crisbeto): remove these once Angular's template type
        // checking is advanced enough to catch these cases.
        this._preferredPositions.forEach(function (pair) {
            validateHorizontalPosition('originX', pair.originX);
            validateVerticalPosition('originY', pair.originY);
            validateHorizontalPosition('overlayX', pair.overlayX);
            validateVerticalPosition('overlayY', pair.overlayY);
        });
    };
    return FlexibleConnectedPositionStrategy;
}());
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export { FlexibleConnectedPositionStrategy };
function FlexibleConnectedPositionStrategy_tsickle_Closure_declarations() {
    /**
     * The overlay to which this strategy is attached.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._overlayRef;
    /**
     * Whether we're performing the very first positioning of the overlay.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._isInitialRender;
    /**
     * Last size used for the bounding box. Used to avoid resizing the overlay after open.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._lastBoundingBoxSize;
    /**
     * Whether the overlay was pushed in a previous positioning.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._isPushed;
    /**
     * Whether the overlay can be pushed on-screen on the initial open.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._canPush;
    /**
     * Whether the overlay can grow via flexible width/height after the initial open.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._growAfterOpen;
    /**
     * Whether the overlay's width and height can be constrained to fit within the viewport.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._hasFlexibleDimensions;
    /**
     * Whether the overlay position is locked.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._positionLocked;
    /**
     * Cached origin dimensions
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._originRect;
    /**
     * Cached overlay dimensions
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._overlayRect;
    /**
     * Cached viewport dimensions
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._viewportRect;
    /**
     * Amount of space that must be maintained between the overlay and the edge of the viewport.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._viewportMargin;
    /**
     * The Scrollable containers used to check scrollable view properties on position change.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype.scrollables;
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._preferredPositions;
    /**
     * The origin element against which the overlay will be positioned.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._origin;
    /**
     * The overlay pane element.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._pane;
    /**
     * Whether the strategy has been disposed of already.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._isDisposed;
    /**
     * Parent element for the overlay panel used to constrain the overlay panel's size to fit
     * within the viewport.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._boundingBox;
    /**
     * The last position to have been calculated as the best fit position.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._lastPosition;
    /**
     * Subject that emits whenever the position changes.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._positionChanges;
    /**
     * Subscription to viewport size changes.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._resizeSubscription;
    /**
     * Default offset for the overlay along the x axis.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._offsetX;
    /**
     * Default offset for the overlay along the y axis.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._offsetY;
    /**
     * Selector to be used when finding the elements on which to set the transform origin.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._transformOriginSelector;
    /**
     * Amount of subscribers to the `positionChanges` stream.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype._positionChangeSubscriptions;
    /**
     * Observable sequence of position changes.
     * @type {?}
     */
    FlexibleConnectedPositionStrategy.prototype.positionChanges;
    /** @type {?} */
    FlexibleConnectedPositionStrategy.prototype._viewportRuler;
    /** @type {?} */
    FlexibleConnectedPositionStrategy.prototype._document;
    /** @type {?} */
    FlexibleConnectedPositionStrategy.prototype._platform;
    /** @type {?} */
    FlexibleConnectedPositionStrategy.prototype._overlayContainer;
}
/**
 * A simple (x, y) coordinate.
 * @record
 */
function Point() { }
function Point_tsickle_Closure_declarations() {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
/**
 * Record of measurements for how an overlay (at a given position) fits into the viewport.
 * @record
 */
function OverlayFit() { }
function OverlayFit_tsickle_Closure_declarations() {
    /**
     * Whether the overlay fits completely in the viewport.
     * @type {?}
     */
    OverlayFit.prototype.isCompletelyWithinViewport;
    /**
     * Whether the overlay fits in the viewport on the y-axis.
     * @type {?}
     */
    OverlayFit.prototype.fitsInViewportVertically;
    /**
     * Whether the overlay fits in the viewport on the x-axis.
     * @type {?}
     */
    OverlayFit.prototype.fitsInViewportHorizontally;
    /**
     * The total visible area (in px^2) of the overlay inside the viewport.
     * @type {?}
     */
    OverlayFit.prototype.visibleArea;
}
/**
 * Record of the measurments determining whether an overlay will fit in a specific position.
 * @record
 */
function FallbackPosition() { }
function FallbackPosition_tsickle_Closure_declarations() {
    /** @type {?} */
    FallbackPosition.prototype.position;
    /** @type {?} */
    FallbackPosition.prototype.originPoint;
    /** @type {?} */
    FallbackPosition.prototype.overlayPoint;
    /** @type {?} */
    FallbackPosition.prototype.overlayFit;
    /** @type {?} */
    FallbackPosition.prototype.overlayRect;
}
/**
 * Position and size of the overlay sizing wrapper for a specific position.
 * @record
 */
function BoundingBoxRect() { }
function BoundingBoxRect_tsickle_Closure_declarations() {
    /** @type {?} */
    BoundingBoxRect.prototype.top;
    /** @type {?} */
    BoundingBoxRect.prototype.left;
    /** @type {?} */
    BoundingBoxRect.prototype.bottom;
    /** @type {?} */
    BoundingBoxRect.prototype.right;
    /** @type {?} */
    BoundingBoxRect.prototype.height;
    /** @type {?} */
    BoundingBoxRect.prototype.width;
}
/**
 * Record of measures determining how well a given position will fit with flexible dimensions.
 * @record
 */
function FlexibleFit() { }
function FlexibleFit_tsickle_Closure_declarations() {
    /** @type {?} */
    FlexibleFit.prototype.position;
    /** @type {?} */
    FlexibleFit.prototype.origin;
    /** @type {?} */
    FlexibleFit.prototype.overlayRect;
    /** @type {?} */
    FlexibleFit.prototype.boundingBoxRect;
}
/**
 * A connected position as specified by the user.
 * @record
 */
export function ConnectedPosition() { }
function ConnectedPosition_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectedPosition.prototype.originX;
    /** @type {?} */
    ConnectedPosition.prototype.originY;
    /** @type {?} */
    ConnectedPosition.prototype.overlayX;
    /** @type {?} */
    ConnectedPosition.prototype.overlayY;
    /** @type {?|undefined} */
    ConnectedPosition.prototype.weight;
    /** @type {?|undefined} */
    ConnectedPosition.prototype.offsetX;
    /** @type {?|undefined} */
    ConnectedPosition.prototype.offsetY;
}
/**
 * Shallow-extends a stylesheet object with another stylesheet object.
 * @param {?} dest
 * @param {?} source
 * @return {?}
 */
function extendStyles(dest, source) {
    for (var /** @type {?} */ key in source) {
        if (source.hasOwnProperty(key)) {
            dest[key] = source[key];
        }
    }
    return dest;
}
//# sourceMappingURL=flexible-connected-position-strategy.js.map