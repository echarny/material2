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
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Overlay } from './overlay';
import { OverlayConfig } from './overlay-config';
/**
 * Default set of positions for the overlay. Follows the behavior of a dropdown.
 */
var /** @type {?} */ defaultPositionList = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    },
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
    },
    {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
    }
];
/**
 * Injection token that determines the scroll handling while the connected overlay is open.
 */
export var /** @type {?} */ CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken('cdk-connected-overlay-scroll-strategy');
/**
 * \@docs-private \@deprecated \@breaking-change 7.0.0
 * @param {?} overlay
 * @return {?}
 */
export function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY(overlay) {
    return function (config) { return overlay.scrollStrategies.reposition(config); };
}
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var CdkOverlayOrigin = /** @class */ (function () {
    function CdkOverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    CdkOverlayOrigin.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                    exportAs: 'cdkOverlayOrigin',
                },] },
    ];
    /** @nocollapse */
    CdkOverlayOrigin.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return CdkOverlayOrigin;
}());
export { CdkOverlayOrigin };
function CdkOverlayOrigin_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkOverlayOrigin.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkOverlayOrigin.ctorParameters;
    /**
     * Reference to the element on which the directive is applied.
     * @type {?}
     */
    CdkOverlayOrigin.prototype.elementRef;
}
/**
 * Directive to facilitate declarative creation of an
 * Overlay using a FlexibleConnectedPositionStrategy.
 */
var CdkConnectedOverlay = /** @class */ (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function CdkConnectedOverlay(_overlay, templateRef, viewContainerRef, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._lockPosition = false;
        this._growAfterOpen = false;
        this._flexibleDimensions = false;
        this._push = false;
        this._backdropSubscription = Subscription.EMPTY;
        /**
         * Margin between the overlay and the viewport edges.
         */
        this.viewportMargin = 0;
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = this._scrollStrategy();
        /**
         * Whether the overlay is open.
         */
        this.open = false;
        /**
         * Event emitted when the backdrop is clicked.
         */
        this.backdropClick = new EventEmitter();
        /**
         * Event emitted when the position has changed.
         */
        this.positionChange = new EventEmitter();
        /**
         * Event emitted when the overlay has been attached.
         */
        this.attach = new EventEmitter();
        /**
         * Event emitted when the overlay has been detached.
         */
        this.detach = new EventEmitter();
        /**
         * Emits when there are keyboard events that are targeted at the overlay.
         */
        this.overlayKeydown = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(CdkConnectedOverlay.prototype, "offsetX", {
        get: /**
         * The offset in pixels for the overlay connection point on the x-axis
         * @return {?}
         */
        function () { return this._offsetX; },
        set: /**
         * @param {?} offsetX
         * @return {?}
         */
        function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._setPositions(this._position);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "offsetY", {
        get: /**
         * The offset in pixels for the overlay connection point on the y-axis
         * @return {?}
         */
        function () { return this._offsetY; },
        set: /**
         * @param {?} offsetY
         * @return {?}
         */
        function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._setPositions(this._position);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "hasBackdrop", {
        get: /**
         * Whether or not the overlay should attach a backdrop.
         * @return {?}
         */
        function () { return this._hasBackdrop; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._hasBackdrop = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "lockPosition", {
        get: /**
         * Whether or not the overlay should be locked when scrolling.
         * @return {?}
         */
        function () { return this._lockPosition; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._lockPosition = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "flexibleDiemsions", {
        get: /**
         * Whether the overlay's width and height can be constrained to fit within the viewport.
         * @return {?}
         */
        function () { return this._flexibleDimensions; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._flexibleDimensions = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "growAfterOpen", {
        get: /**
         * Whether the overlay can grow after the initial open when flexible positioning is turned on.
         * @return {?}
         */
        function () { return this._growAfterOpen; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._growAfterOpen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "push", {
        get: /**
         * Whether the overlay can be pushed on-screen if none of the provided positions fit.
         * @return {?}
         */
        function () { return this._push; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._push = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: /**
         * The associated overlay reference.
         * @return {?}
         */
        function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "dir", {
        /** The element's layout direction. */
        get: /**
         * The element's layout direction.
         * @return {?}
         */
        function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkConnectedOverlay.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyOverlay();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CdkConnectedOverlay.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this._position) {
            if (changes['positions']) {
                this._position.withPositions(this.positions);
            }
            if (changes['lockPosition']) {
                this._position.withLockedPosition(this.lockPosition);
            }
            if (changes['origin']) {
                this._position.setOrigin(this.origin.elementRef);
                if (this.open) {
                    this._position.apply();
                }
            }
        }
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    };
    /**
     * Creates an overlay
     * @return {?}
     */
    CdkConnectedOverlay.prototype._createOverlay = /**
     * Creates an overlay
     * @return {?}
     */
    function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    CdkConnectedOverlay.prototype._buildConfig = /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    function () {
        var /** @type {?} */ positionStrategy = this._position = this._createPositionStrategy();
        var /** @type {?} */ overlayConfig = new OverlayConfig({
            direction: this._dir,
            positionStrategy: positionStrategy,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.hasBackdrop
        });
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        return overlayConfig;
    };
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    CdkConnectedOverlay.prototype._createPositionStrategy = /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ strategy = this._overlay.position()
            .flexibleConnectedTo(this.origin.elementRef)
            .withFlexibleDimensions(this.flexibleDiemsions)
            .withPush(this.push)
            .withGrowAfterOpen(this.growAfterOpen)
            .withViewportMargin(this.viewportMargin)
            .withLockedPosition(this.lockPosition);
        this._setPositions(strategy);
        strategy.positionChanges.subscribe(function (p) { return _this.positionChange.emit(p); });
        return strategy;
    };
    /**
     * Sets the primary and fallback positions of a positions strategy,
     * based on the current directive inputs.
     * @param {?} positionStrategy
     * @return {?}
     */
    CdkConnectedOverlay.prototype._setPositions = /**
     * Sets the primary and fallback positions of a positions strategy,
     * based on the current directive inputs.
     * @param {?} positionStrategy
     * @return {?}
     */
    function (positionStrategy) {
        var _this = this;
        var /** @type {?} */ positions = this.positions.map(function (pos) {
            return ({
                originX: pos.originX,
                originY: pos.originY,
                overlayX: pos.overlayX,
                overlayY: pos.overlayY,
                offsetX: pos.offsetX || _this.offsetX,
                offsetY: pos.offsetY || _this.offsetY
            });
        });
        positionStrategy.withPositions(positions);
    };
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    CdkConnectedOverlay.prototype._attachOverlay = /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay(); /** @type {?} */
            ((this._overlayRef)).keydownEvents().subscribe(function (event) {
                _this.overlayKeydown.next(event);
                if (event.keyCode === ESCAPE) {
                    _this._detachOverlay();
                }
            });
        }
        else {
            // Update the overlay size, in case the directive's inputs have changed
            this._overlayRef.updateSize({
                width: this.width,
                minWidth: this.minWidth,
                height: this.height,
                minHeight: this.minHeight,
            });
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function (event) {
                _this.backdropClick.emit(event);
            });
        }
    };
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    CdkConnectedOverlay.prototype._detachOverlay = /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        this._backdropSubscription.unsubscribe();
    };
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    CdkConnectedOverlay.prototype._destroyOverlay = /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this._backdropSubscription.unsubscribe();
    };
    CdkConnectedOverlay.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                    exportAs: 'cdkConnectedOverlay'
                },] },
    ];
    /** @nocollapse */
    CdkConnectedOverlay.ctorParameters = function () { return [
        { type: Overlay, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,] },] },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    CdkConnectedOverlay.propDecorators = {
        "origin": [{ type: Input, args: ['cdkConnectedOverlayOrigin',] },],
        "positions": [{ type: Input, args: ['cdkConnectedOverlayPositions',] },],
        "offsetX": [{ type: Input, args: ['cdkConnectedOverlayOffsetX',] },],
        "offsetY": [{ type: Input, args: ['cdkConnectedOverlayOffsetY',] },],
        "width": [{ type: Input, args: ['cdkConnectedOverlayWidth',] },],
        "height": [{ type: Input, args: ['cdkConnectedOverlayHeight',] },],
        "minWidth": [{ type: Input, args: ['cdkConnectedOverlayMinWidth',] },],
        "minHeight": [{ type: Input, args: ['cdkConnectedOverlayMinHeight',] },],
        "backdropClass": [{ type: Input, args: ['cdkConnectedOverlayBackdropClass',] },],
        "viewportMargin": [{ type: Input, args: ['cdkConnectedOverlayViewportMargin',] },],
        "scrollStrategy": [{ type: Input, args: ['cdkConnectedOverlayScrollStrategy',] },],
        "open": [{ type: Input, args: ['cdkConnectedOverlayOpen',] },],
        "hasBackdrop": [{ type: Input, args: ['cdkConnectedOverlayHasBackdrop',] },],
        "lockPosition": [{ type: Input, args: ['cdkConnectedOverlayLockPosition',] },],
        "flexibleDiemsions": [{ type: Input, args: ['cdkConnectedOverlayFlexibleDimensions',] },],
        "growAfterOpen": [{ type: Input, args: ['cdkConnectedOverlayGrowAfterOpen',] },],
        "push": [{ type: Input, args: ['cdkConnectedOverlayPush',] },],
        "backdropClick": [{ type: Output },],
        "positionChange": [{ type: Output },],
        "attach": [{ type: Output },],
        "detach": [{ type: Output },],
        "overlayKeydown": [{ type: Output },],
    };
    return CdkConnectedOverlay;
}());
export { CdkConnectedOverlay };
function CdkConnectedOverlay_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkConnectedOverlay.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkConnectedOverlay.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkConnectedOverlay.propDecorators;
    /** @type {?} */
    CdkConnectedOverlay.prototype._overlayRef;
    /** @type {?} */
    CdkConnectedOverlay.prototype._templatePortal;
    /** @type {?} */
    CdkConnectedOverlay.prototype._hasBackdrop;
    /** @type {?} */
    CdkConnectedOverlay.prototype._lockPosition;
    /** @type {?} */
    CdkConnectedOverlay.prototype._growAfterOpen;
    /** @type {?} */
    CdkConnectedOverlay.prototype._flexibleDimensions;
    /** @type {?} */
    CdkConnectedOverlay.prototype._push;
    /** @type {?} */
    CdkConnectedOverlay.prototype._backdropSubscription;
    /** @type {?} */
    CdkConnectedOverlay.prototype._offsetX;
    /** @type {?} */
    CdkConnectedOverlay.prototype._offsetY;
    /** @type {?} */
    CdkConnectedOverlay.prototype._position;
    /**
     * Origin for the connected overlay.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.origin;
    /**
     * Registered connected position pairs.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.positions;
    /**
     * The width of the overlay panel.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.width;
    /**
     * The height of the overlay panel.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.height;
    /**
     * The min width of the overlay panel.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.minWidth;
    /**
     * The min height of the overlay panel.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.minHeight;
    /**
     * The custom class to be set on the backdrop element.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.backdropClass;
    /**
     * Margin between the overlay and the viewport edges.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.viewportMargin;
    /**
     * Strategy to be used when handling scroll events while the overlay is open.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.scrollStrategy;
    /**
     * Whether the overlay is open.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.open;
    /**
     * Event emitted when the backdrop is clicked.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.backdropClick;
    /**
     * Event emitted when the position has changed.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.positionChange;
    /**
     * Event emitted when the overlay has been attached.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.attach;
    /**
     * Event emitted when the overlay has been detached.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.detach;
    /**
     * Emits when there are keyboard events that are targeted at the overlay.
     * @type {?}
     */
    CdkConnectedOverlay.prototype.overlayKeydown;
    /** @type {?} */
    CdkConnectedOverlay.prototype._overlay;
    /** @type {?} */
    CdkConnectedOverlay.prototype._scrollStrategy;
    /** @type {?} */
    CdkConnectedOverlay.prototype._dir;
}
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
/**
 * \@docs-private
 */
export var /** @type {?} */ CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=overlay-directives.js.map