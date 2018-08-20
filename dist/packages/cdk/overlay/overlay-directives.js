"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var overlay_1 = require("./overlay");
var overlay_config_1 = require("./overlay-config");
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
var defaultPositionList = [
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
/** Injection token that determines the scroll handling while the connected overlay is open. */
exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new core_1.InjectionToken('cdk-connected-overlay-scroll-strategy');
/** @docs-private @deprecated @breaking-change 7.0.0 */
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY(overlay) {
    return function (config) { return overlay.scrollStrategies.reposition(config); };
}
exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY = CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY;
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var CdkOverlayOrigin = /** @class */ (function () {
    function CdkOverlayOrigin(/** Reference to the element on which the directive is applied. */
    elementRef) {
        this.elementRef = elementRef;
    }
    CdkOverlayOrigin.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                    exportAs: 'cdkOverlayOrigin',
                },] },
    ];
    /** @nocollapse */
    CdkOverlayOrigin.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return CdkOverlayOrigin;
}());
exports.CdkOverlayOrigin = CdkOverlayOrigin;
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
        this._backdropSubscription = rxjs_1.Subscription.EMPTY;
        /** Margin between the overlay and the viewport edges. */
        this.viewportMargin = 0;
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = this._scrollStrategy();
        /** Whether the overlay is open. */
        this.open = false;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new core_1.EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new core_1.EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new core_1.EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new core_1.EventEmitter();
        /** Emits when there are keyboard events that are targeted at the overlay. */
        this.overlayKeydown = new core_1.EventEmitter();
        this._templatePortal = new portal_1.TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(CdkConnectedOverlay.prototype, "offsetX", {
        get: /** The offset in pixels for the overlay connection point on the x-axis */
        function () { return this._offsetX; },
        set: function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._setPositions(this._position);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "offsetY", {
        get: /** The offset in pixels for the overlay connection point on the y-axis */
        function () { return this._offsetY; },
        set: function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._setPositions(this._position);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "hasBackdrop", {
        get: /** Whether or not the overlay should attach a backdrop. */
        function () { return this._hasBackdrop; },
        set: function (value) { this._hasBackdrop = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "lockPosition", {
        get: /** Whether or not the overlay should be locked when scrolling. */
        function () { return this._lockPosition; },
        set: function (value) { this._lockPosition = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "flexibleDiemsions", {
        get: /** Whether the overlay's width and height can be constrained to fit within the viewport. */
        function () { return this._flexibleDimensions; },
        set: function (value) { this._flexibleDimensions = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "growAfterOpen", {
        get: /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
        function () { return this._growAfterOpen; },
        set: function (value) { this._growAfterOpen = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "push", {
        get: /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
        function () { return this._push; },
        set: function (value) { this._push = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: /** The associated overlay reference. */
        function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkConnectedOverlay.prototype, "dir", {
        /** The element's layout direction. */
        get: /** The element's layout direction. */
        function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    CdkConnectedOverlay.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    CdkConnectedOverlay.prototype.ngOnChanges = function (changes) {
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
    /** Creates an overlay */
    /** Creates an overlay */
    CdkConnectedOverlay.prototype._createOverlay = /** Creates an overlay */
    function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /** Builds the overlay config based on the directive's inputs */
    /** Builds the overlay config based on the directive's inputs */
    CdkConnectedOverlay.prototype._buildConfig = /** Builds the overlay config based on the directive's inputs */
    function () {
        var positionStrategy = this._position = this._createPositionStrategy();
        var overlayConfig = new overlay_config_1.OverlayConfig({
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
    /** Returns the position strategy of the overlay to be set on the overlay config */
    /** Returns the position strategy of the overlay to be set on the overlay config */
    CdkConnectedOverlay.prototype._createPositionStrategy = /** Returns the position strategy of the overlay to be set on the overlay config */
    function () {
        var _this = this;
        var strategy = this._overlay.position()
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
     */
    /**
       * Sets the primary and fallback positions of a positions strategy,
       * based on the current directive inputs.
       */
    CdkConnectedOverlay.prototype._setPositions = /**
       * Sets the primary and fallback positions of a positions strategy,
       * based on the current directive inputs.
       */
    function (positionStrategy) {
        var _this = this;
        var positions = this.positions.map(function (pos) {
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
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    CdkConnectedOverlay.prototype._attachOverlay = /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
            this._overlayRef.keydownEvents().subscribe(function (event) {
                _this.overlayKeydown.next(event);
                if (event.keyCode === keycodes_1.ESCAPE) {
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
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    CdkConnectedOverlay.prototype._detachOverlay = /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        this._backdropSubscription.unsubscribe();
    };
    /** Destroys the overlay created by this directive. */
    /** Destroys the overlay created by this directive. */
    CdkConnectedOverlay.prototype._destroyOverlay = /** Destroys the overlay created by this directive. */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this._backdropSubscription.unsubscribe();
    };
    CdkConnectedOverlay.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                    exportAs: 'cdkConnectedOverlay'
                },] },
    ];
    /** @nocollapse */
    CdkConnectedOverlay.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,] },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    CdkConnectedOverlay.propDecorators = {
        "origin": [{ type: core_1.Input, args: ['cdkConnectedOverlayOrigin',] },],
        "positions": [{ type: core_1.Input, args: ['cdkConnectedOverlayPositions',] },],
        "offsetX": [{ type: core_1.Input, args: ['cdkConnectedOverlayOffsetX',] },],
        "offsetY": [{ type: core_1.Input, args: ['cdkConnectedOverlayOffsetY',] },],
        "width": [{ type: core_1.Input, args: ['cdkConnectedOverlayWidth',] },],
        "height": [{ type: core_1.Input, args: ['cdkConnectedOverlayHeight',] },],
        "minWidth": [{ type: core_1.Input, args: ['cdkConnectedOverlayMinWidth',] },],
        "minHeight": [{ type: core_1.Input, args: ['cdkConnectedOverlayMinHeight',] },],
        "backdropClass": [{ type: core_1.Input, args: ['cdkConnectedOverlayBackdropClass',] },],
        "viewportMargin": [{ type: core_1.Input, args: ['cdkConnectedOverlayViewportMargin',] },],
        "scrollStrategy": [{ type: core_1.Input, args: ['cdkConnectedOverlayScrollStrategy',] },],
        "open": [{ type: core_1.Input, args: ['cdkConnectedOverlayOpen',] },],
        "hasBackdrop": [{ type: core_1.Input, args: ['cdkConnectedOverlayHasBackdrop',] },],
        "lockPosition": [{ type: core_1.Input, args: ['cdkConnectedOverlayLockPosition',] },],
        "flexibleDiemsions": [{ type: core_1.Input, args: ['cdkConnectedOverlayFlexibleDimensions',] },],
        "growAfterOpen": [{ type: core_1.Input, args: ['cdkConnectedOverlayGrowAfterOpen',] },],
        "push": [{ type: core_1.Input, args: ['cdkConnectedOverlayPush',] },],
        "backdropClick": [{ type: core_1.Output },],
        "positionChange": [{ type: core_1.Output },],
        "attach": [{ type: core_1.Output },],
        "detach": [{ type: core_1.Output },],
        "overlayKeydown": [{ type: core_1.Output },],
    };
    return CdkConnectedOverlay;
}());
exports.CdkConnectedOverlay = CdkConnectedOverlay;
/** @docs-private */
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY = CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY;
/** @docs-private */
exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: exports.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=overlay-directives.js.map