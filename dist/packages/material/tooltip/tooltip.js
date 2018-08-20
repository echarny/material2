"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var layout_1 = require("@angular/cdk/layout");
var overlay_1 = require("@angular/cdk/overlay");
var platform_1 = require("@angular/cdk/platform");
var portal_1 = require("@angular/cdk/portal");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var tooltip_animations_1 = require("./tooltip-animations");
/** Time in ms to throttle repositioning after scroll events. */
exports.SCROLL_THROTTLE_MS = 20;
/** CSS class that will be attached to the overlay panel. */
exports.TOOLTIP_PANEL_CLASS = 'mat-tooltip-panel';
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
function getMatTooltipInvalidPositionError(position) {
    return Error("Tooltip position \"" + position + "\" is invalid.");
}
exports.getMatTooltipInvalidPositionError = getMatTooltipInvalidPositionError;
/** Injection token that determines the scroll handling while a tooltip is visible. */
exports.MAT_TOOLTIP_SCROLL_STRATEGY = new core_1.InjectionToken('mat-tooltip-scroll-strategy');
/** @docs-private */
function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition({ scrollThrottle: exports.SCROLL_THROTTLE_MS }); };
}
exports.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY = MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY;
/** @docs-private */
exports.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: exports.MAT_TOOLTIP_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
};
/** Injection token to be used to override the default options for `matTooltip`. */
exports.MAT_TOOLTIP_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-tooltip-default-options', {
    providedIn: 'root',
    factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY
});
function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
    return {
        showDelay: 0,
        hideDelay: 0,
        touchendHideDelay: 1500,
    };
}
exports.MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY = MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var MatTooltip = /** @class */ (function () {
    function MatTooltip(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _platform, _ariaDescriber, _focusMonitor, _scrollStrategy, _dir, _defaultOptions) {
        var _this = this;
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._ariaDescriber = _ariaDescriber;
        this._focusMonitor = _focusMonitor;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._defaultOptions = _defaultOptions;
        this._position = 'below';
        this._disabled = false;
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = this._defaultOptions.showDelay;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = this._defaultOptions.hideDelay;
        this._message = '';
        this._manualListeners = new Map();
        /** Emits when the component is destroyed. */
        this._destroyed = new rxjs_1.Subject();
        var element = _elementRef.nativeElement;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            this._manualListeners.set('mouseenter', function () { return _this.show(); });
            this._manualListeners.set('mouseleave', function () { return _this.hide(); });
            this._manualListeners
                .forEach(function (listener, event) { return _elementRef.nativeElement.addEventListener(event, listener); });
        }
        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            // When we bind a gesture event on an element (in this case `longpress`), HammerJS
            // will add some inline styles by default, including `user-select: none`. This is
            // problematic on iOS, because it will prevent users from typing in inputs. If
            // we're on iOS and the tooltip is attached on an input or textarea, we clear
            // the `user-select` to avoid these issues.
            element.style.webkitUserSelect = element.style.userSelect = '';
        }
        // Hammer applies `-webkit-user-drag: none` on all elements by default,
        // which breaks the native drag&drop. If the consumer explicitly made
        // the element draggable, clear the `-webkit-user-drag`.
        if (element.draggable && element.style['webkitUserDrag'] === 'none') {
            element.style['webkitUserDrag'] = '';
        }
        _focusMonitor.monitor(element).pipe(operators_1.takeUntil(this._destroyed)).subscribe(function (origin) {
            // Note that the focus monitor runs outside the Angular zone.
            if (!origin) {
                _ngZone.run(function () { return _this.hide(0); });
            }
            else if (origin === 'keyboard') {
                _ngZone.run(function () { return _this.show(); });
            }
        });
    }
    Object.defineProperty(MatTooltip.prototype, "position", {
        get: /** Allows the user to define the position of the tooltip relative to the parent element */
        function () { return this._position; },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                if (this._overlayRef) {
                    this._updatePosition();
                    if (this._tooltipInstance) {
                        this._tooltipInstance.show(0);
                    }
                    this._overlayRef.updatePosition();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTooltip.prototype, "disabled", {
        get: /** Disables the display of the tooltip. */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            // If tooltip is disabled, hide immediately.
            if (this._disabled) {
                this.hide(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTooltip.prototype, "message", {
        get: /** The message to be displayed in the tooltip */
        function () { return this._message; },
        set: function (value) {
            this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message);
            // If the message is not a string (e.g. number), convert it to a string and trim it.
            this._message = value != null ? ("" + value).trim() : '';
            if (!this._message && this._isTooltipVisible()) {
                this.hide(0);
            }
            else {
                this._updateTooltipMessage();
                this._ariaDescriber.describe(this._elementRef.nativeElement, this.message);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTooltip.prototype, "tooltipClass", {
        get: /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
        function () { return this._tooltipClass; },
        set: function (value) {
            this._tooltipClass = value;
            if (this._tooltipInstance) {
                this._setTooltipClass(this._tooltipClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the tooltip when destroyed.
     */
    /**
       * Dispose the tooltip when destroyed.
       */
    MatTooltip.prototype.ngOnDestroy = /**
       * Dispose the tooltip when destroyed.
       */
    function () {
        var _this = this;
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._tooltipInstance = null;
        }
        // Clean up the event listeners set in the constructor
        if (!this._platform.IOS) {
            this._manualListeners.forEach(function (listener, event) {
                return _this._elementRef.nativeElement.removeEventListener(event, listener);
            });
            this._manualListeners.clear();
        }
        this._destroyed.next();
        this._destroyed.complete();
        this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.message);
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    MatTooltip.prototype.show = /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    function (delay) {
        var _this = this;
        if (delay === void 0) { delay = this.showDelay; }
        if (this.disabled || !this.message) {
            return;
        }
        var overlayRef = this._createOverlay();
        this._detach();
        this._portal = this._portal || new portal_1.ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = overlayRef.attach(this._portal).instance;
        this._tooltipInstance.afterHidden()
            .pipe(operators_1.takeUntil(this._destroyed))
            .subscribe(function () { return _this._detach(); });
        this._setTooltipClass(this._tooltipClass);
        this._updateTooltipMessage();
        this._tooltipInstance.show(delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    MatTooltip.prototype.hide = /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    /** Shows/hides the tooltip */
    MatTooltip.prototype.toggle = /** Shows/hides the tooltip */
    function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    /** Returns true if the tooltip is currently visible to the user */
    MatTooltip.prototype._isTooltipVisible = /** Returns true if the tooltip is currently visible to the user */
    function () {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /** Handles the keydown events on the host element. */
    /** Handles the keydown events on the host element. */
    MatTooltip.prototype._handleKeydown = /** Handles the keydown events on the host element. */
    function (e) {
        if (this._isTooltipVisible() && e.keyCode === keycodes_1.ESCAPE) {
            e.stopPropagation();
            this.hide(0);
        }
    };
    /** Handles the touchend events on the host element. */
    /** Handles the touchend events on the host element. */
    MatTooltip.prototype._handleTouchend = /** Handles the touchend events on the host element. */
    function () {
        this.hide(this._defaultOptions.touchendHideDelay);
    };
    /** Create the overlay config and position strategy */
    /** Create the overlay config and position strategy */
    MatTooltip.prototype._createOverlay = /** Create the overlay config and position strategy */
    function () {
        var _this = this;
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        var strategy = this._overlay.position()
            .flexibleConnectedTo(this._elementRef)
            .withTransformOriginOn('.mat-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(8);
        var scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this._elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(operators_1.takeUntil(this._destroyed)).subscribe(function (change) {
            if (_this._tooltipInstance) {
                if (change.scrollableViewProperties.isOverlayClipped && _this._tooltipInstance.isVisible()) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    _this._ngZone.run(function () { return _this.hide(0); });
                }
            }
        });
        this._overlayRef = this._overlay.create({
            direction: this._dir,
            positionStrategy: strategy,
            panelClass: exports.TOOLTIP_PANEL_CLASS,
            scrollStrategy: this._scrollStrategy()
        });
        this._updatePosition();
        this._overlayRef.detachments()
            .pipe(operators_1.takeUntil(this._destroyed))
            .subscribe(function () { return _this._detach(); });
        return this._overlayRef;
    };
    /** Detaches the currently-attached tooltip. */
    /** Detaches the currently-attached tooltip. */
    MatTooltip.prototype._detach = /** Detaches the currently-attached tooltip. */
    function () {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._tooltipInstance = null;
    };
    /** Updates the position of the current tooltip. */
    /** Updates the position of the current tooltip. */
    MatTooltip.prototype._updatePosition = /** Updates the position of the current tooltip. */
    function () {
        var position = this._overlayRef.getConfig().positionStrategy;
        var origin = this._getOrigin();
        var overlay = this._getOverlayPosition();
        position.withPositions([
            __assign({}, origin.main, overlay.main),
            __assign({}, origin.fallback, overlay.fallback)
        ]);
    };
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    /**
       * Returns the origin position and a fallback position based on the user's position preference.
       * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
       */
    MatTooltip.prototype._getOrigin = /**
       * Returns the origin position and a fallback position based on the user's position preference.
       * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
       */
    function () {
        var isLtr = !this._dir || this._dir.value == 'ltr';
        var position = this.position;
        var originPosition;
        if (position == 'above' || position == 'below') {
            originPosition = { originX: 'center', originY: position == 'above' ? 'top' : 'bottom' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            originPosition = { originX: 'start', originY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            originPosition = { originX: 'end', originY: 'center' };
        }
        else {
            throw getMatTooltipInvalidPositionError(position);
        }
        var _a = this._invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    /** Returns the overlay position and a fallback position based on the user's preference */
    MatTooltip.prototype._getOverlayPosition = /** Returns the overlay position and a fallback position based on the user's preference */
    function () {
        var isLtr = !this._dir || this._dir.value == 'ltr';
        var position = this.position;
        var overlayPosition;
        if (position == 'above') {
            overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (position == 'below') {
            overlayPosition = { overlayX: 'center', overlayY: 'top' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            overlayPosition = { overlayX: 'end', overlayY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            overlayPosition = { overlayX: 'start', overlayY: 'center' };
        }
        else {
            throw getMatTooltipInvalidPositionError(position);
        }
        var _a = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _a.x, y = _a.y;
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    MatTooltip.prototype._updateTooltipMessage = /** Updates the tooltip message and repositions the overlay according to the new message length */
    function () {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this._tooltipInstance) {
            this._tooltipInstance.message = this.message;
            this._tooltipInstance._markForCheck();
            this._ngZone.onMicrotaskEmpty.asObservable().pipe(operators_1.take(1), operators_1.takeUntil(this._destroyed)).subscribe(function () {
                if (_this._tooltipInstance) {
                    _this._overlayRef.updatePosition();
                }
            });
        }
    };
    /** Updates the tooltip class */
    /** Updates the tooltip class */
    MatTooltip.prototype._setTooltipClass = /** Updates the tooltip class */
    function (tooltipClass) {
        if (this._tooltipInstance) {
            this._tooltipInstance.tooltipClass = tooltipClass;
            this._tooltipInstance._markForCheck();
        }
    };
    /** Inverts an overlay position. */
    /** Inverts an overlay position. */
    MatTooltip.prototype._invertPosition = /** Inverts an overlay position. */
    function (x, y) {
        if (this.position === 'above' || this.position === 'below') {
            if (y === 'top') {
                y = 'bottom';
            }
            else if (y === 'bottom') {
                y = 'top';
            }
        }
        else {
            if (x === 'end') {
                x = 'start';
            }
            else if (x === 'start') {
                x = 'end';
            }
        }
        return { x: x, y: y };
    };
    MatTooltip.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        '(longpress)': 'show()',
                        '(keydown)': '_handleKeydown($event)',
                        '(touchend)': '_handleTouchend()',
                    },
                },] },
    ];
    /** @nocollapse */
    MatTooltip.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.ElementRef, },
        { type: overlay_1.ScrollDispatcher, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.NgZone, },
        { type: platform_1.Platform, },
        { type: a11y_1.AriaDescriber, },
        { type: a11y_1.FocusMonitor, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_TOOLTIP_SCROLL_STRATEGY,] },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.MAT_TOOLTIP_DEFAULT_OPTIONS,] },] },
    ]; };
    MatTooltip.propDecorators = {
        "position": [{ type: core_1.Input, args: ['matTooltipPosition',] },],
        "disabled": [{ type: core_1.Input, args: ['matTooltipDisabled',] },],
        "showDelay": [{ type: core_1.Input, args: ['matTooltipShowDelay',] },],
        "hideDelay": [{ type: core_1.Input, args: ['matTooltipHideDelay',] },],
        "message": [{ type: core_1.Input, args: ['matTooltip',] },],
        "tooltipClass": [{ type: core_1.Input, args: ['matTooltipClass',] },],
    };
    return MatTooltip;
}());
exports.MatTooltip = MatTooltip;
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent(_changeDetectorRef, _breakpointObserver) {
        this._changeDetectorRef = _changeDetectorRef;
        this._breakpointObserver = _breakpointObserver;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new rxjs_1.Subject();
        /** Stream that emits whether the user has a handset-sized display.  */
        this._isHandset = this._breakpointObserver.observe(layout_1.Breakpoints.Handset);
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    /**
       * Shows the tooltip with an animation originating from the provided origin
       * @param delay Amount of milliseconds to the delay showing the tooltip.
       */
    TooltipComponent.prototype.show = /**
       * Shows the tooltip with an animation originating from the provided origin
       * @param delay Amount of milliseconds to the delay showing the tooltip.
       */
    function (delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    /**
       * Begins the animation to hide the tooltip after the provided delay in ms.
       * @param delay Amount of milliseconds to delay showing the tooltip.
       */
    TooltipComponent.prototype.hide = /**
       * Begins the animation to hide the tooltip after the provided delay in ms.
       * @param delay Amount of milliseconds to delay showing the tooltip.
       */
    function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, delay);
    };
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    TooltipComponent.prototype.afterHidden = /** Returns an observable that notifies when the tooltip has been hidden from view. */
    function () {
        return this._onHide.asObservable();
    };
    /** Whether the tooltip is being displayed. */
    /** Whether the tooltip is being displayed. */
    TooltipComponent.prototype.isVisible = /** Whether the tooltip is being displayed. */
    function () {
        return this._visibility === 'visible';
    };
    TooltipComponent.prototype._animationStart = function () {
        this._closeOnInteraction = false;
    };
    TooltipComponent.prototype._animationDone = function (event) {
        var toState = event.toState;
        if (toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
        if (toState === 'visible' || toState === 'hidden') {
            this._closeOnInteraction = true;
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    /**
       * Interactions on the HTML body should close the tooltip immediately as defined in the
       * material design spec.
       * https://material.google.com/components/tooltips.html#tooltips-interaction
       */
    TooltipComponent.prototype._handleBodyInteraction = /**
       * Interactions on the HTML body should close the tooltip immediately as defined in the
       * material design spec.
       * https://material.google.com/components/tooltips.html#tooltips-interaction
       */
    function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    /**
       * Marks that the tooltip needs to be checked in the next change detection run.
       * Mainly used for rendering the initial text before positioning a tooltip, which
       * can be problematic in components with OnPush change detection.
       */
    TooltipComponent.prototype._markForCheck = /**
       * Marks that the tooltip needs to be checked in the next change detection run.
       * Mainly used for rendering the initial text before positioning a tooltip, which
       * can be problematic in components with OnPush change detection.
       */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    TooltipComponent.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tooltip-component',
                    template: "<div class=\"mat-tooltip\" [ngClass]=\"tooltipClass\" [class.mat-tooltip-handset]=\"(_isHandset | async)!.matches\" [@state]=\"_visibility\" (@state.start)=\"_animationStart()\" (@state.done)=\"_animationDone($event)\">{{message}}</div>",
                    styles: [".mat-tooltip-panel{pointer-events:none!important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [tooltip_animations_1.matTooltipAnimations.tooltipState],
                    host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        '(body:click)': 'this._handleBodyInteraction()',
                        'aria-hidden': 'true',
                    }
                },] },
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: layout_1.BreakpointObserver, },
    ]; };
    return TooltipComponent;
}());
exports.TooltipComponent = TooltipComponent;
//# sourceMappingURL=tooltip.js.map