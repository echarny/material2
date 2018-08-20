"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var coercion_1 = require("@angular/cdk/coercion");
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var /**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document) {
        var _this = this;
        this._portalOutlet = _portalOutlet;
        this._host = _host;
        this._pane = _pane;
        this._config = _config;
        this._ngZone = _ngZone;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._document = _document;
        this._backdropElement = null;
        this._backdropClick = new rxjs_1.Subject();
        this._attachments = new rxjs_1.Subject();
        this._detachments = new rxjs_1.Subject();
        this._keydownEventsObservable = rxjs_1.Observable.create(function (observer) {
            var subscription = _this._keydownEvents.subscribe(observer);
            _this._keydownEventSubscriptions++;
            return function () {
                subscription.unsubscribe();
                _this._keydownEventSubscriptions--;
            };
        });
        /** Stream of keydown events dispatched to this overlay. */
        this._keydownEvents = new rxjs_1.Subject();
        /** Amount of subscriptions to the keydown events. */
        this._keydownEventSubscriptions = 0;
        if (_config.scrollStrategy) {
            _config.scrollStrategy.attach(this);
        }
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /** The overlay's HTML element */
        get: /** The overlay's HTML element */
        function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverlayRef.prototype, "backdropElement", {
        /** The overlay's backdrop HTML element. */
        get: /** The overlay's backdrop HTML element. */
        function () {
            return this._backdropElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverlayRef.prototype, "hostElement", {
        /**
         * Wrapper around the panel element. Can be used for advanced
         * positioning where a wrapper with specific styling is
         * required around the overlay pane.
         */
        get: /**
           * Wrapper around the panel element. Can be used for advanced
           * positioning where a wrapper with specific styling is
           * required around the overlay pane.
           */
        function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches content, given via a Portal, to the overlay.
     * If the overlay is configured to have a backdrop, it will be created.
     *
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    /**
       * Attaches content, given via a Portal, to the overlay.
       * If the overlay is configured to have a backdrop, it will be created.
       *
       * @param portal Portal instance to which to attach the overlay.
       * @returns The portal attachment result.
       */
    OverlayRef.prototype.attach = /**
       * Attaches content, given via a Portal, to the overlay.
       * If the overlay is configured to have a backdrop, it will be created.
       *
       * @param portal Portal instance to which to attach the overlay.
       * @returns The portal attachment result.
       */
    function (portal) {
        var _this = this;
        var attachResult = this._portalOutlet.attach(portal);
        if (this._config.positionStrategy) {
            this._config.positionStrategy.attach(this);
        }
        // Update the pane element with the given configuration.
        if (!this._host.parentElement && this._previousHostParent) {
            this._previousHostParent.appendChild(this._host);
        }
        this._updateStackingOrder();
        this._updateElementSize();
        this._updateElementDirection();
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.enable();
        }
        // Update the position once the zone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.
        this._ngZone.onStable
            .asObservable()
            .pipe(operators_1.take(1))
            .subscribe(function () {
            // The overlay could've been detached before the zone has stabilized.
            if (_this.hasAttached()) {
                _this.updatePosition();
            }
        });
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._config.hasBackdrop) {
            this._attachBackdrop();
        }
        if (this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, true);
        }
        // Only emit the `attachments` event once all other setup is done.
        this._attachments.next();
        // Track this overlay by the keyboard dispatcher
        this._keyboardDispatcher.add(this);
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @returns The portal detachment result.
     */
    /**
       * Detaches an overlay from a portal.
       * @returns The portal detachment result.
       */
    OverlayRef.prototype.detach = /**
       * Detaches an overlay from a portal.
       * @returns The portal detachment result.
       */
    function () {
        var _this = this;
        if (!this.hasAttached()) {
            return;
        }
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        if (this._config.positionStrategy && this._config.positionStrategy.detach) {
            this._config.positionStrategy.detach();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        if (this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, false);
        }
        var detachmentResult = this._portalOutlet.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        // Remove this overlay from keyboard dispatcher tracking.
        this._keyboardDispatcher.remove(this);
        // Keeping the host element in DOM the can cause scroll jank, because it still gets rendered,
        // even though it's transparent and unclickable. We can't remove the host here immediately,
        // because the overlay pane's content might still be animating. This stream helps us avoid
        // interrupting the animation by waiting for the pane to become empty.
        var subscription = this._ngZone.onStable
            .asObservable()
            .pipe(operators_1.takeUntil(rxjs_1.merge(this._attachments, this._detachments)))
            .subscribe(function () {
            // Needs a couple of checks for the pane and host, because
            // they may have been removed by the time the zone stabilizes.
            if (!_this._pane || !_this._host || _this._pane.children.length === 0) {
                if (_this._host && _this._host.parentElement) {
                    _this._previousHostParent = _this._host.parentElement;
                    _this._previousHostParent.removeChild(_this._host);
                }
                subscription.unsubscribe();
            }
        });
        return detachmentResult;
    };
    /** Cleans up the overlay from the DOM. */
    /** Cleans up the overlay from the DOM. */
    OverlayRef.prototype.dispose = /** Cleans up the overlay from the DOM. */
    function () {
        var isAttached = this.hasAttached();
        if (this._config.positionStrategy) {
            this._config.positionStrategy.dispose();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        this.detachBackdrop();
        this._keyboardDispatcher.remove(this);
        this._portalOutlet.dispose();
        this._attachments.complete();
        this._backdropClick.complete();
        this._keydownEvents.complete();
        if (this._host && this._host.parentNode) {
            this._host.parentNode.removeChild(this._host);
            this._host = (null);
        }
        this._previousHostParent = this._pane = (null);
        if (isAttached) {
            this._detachments.next();
        }
        this._detachments.complete();
    };
    /** Whether the overlay has attached content. */
    /** Whether the overlay has attached content. */
    OverlayRef.prototype.hasAttached = /** Whether the overlay has attached content. */
    function () {
        return this._portalOutlet.hasAttached();
    };
    /** Gets an observable that emits when the backdrop has been clicked. */
    /** Gets an observable that emits when the backdrop has been clicked. */
    OverlayRef.prototype.backdropClick = /** Gets an observable that emits when the backdrop has been clicked. */
    function () {
        return this._backdropClick.asObservable();
    };
    /** Gets an observable that emits when the overlay has been attached. */
    /** Gets an observable that emits when the overlay has been attached. */
    OverlayRef.prototype.attachments = /** Gets an observable that emits when the overlay has been attached. */
    function () {
        return this._attachments.asObservable();
    };
    /** Gets an observable that emits when the overlay has been detached. */
    /** Gets an observable that emits when the overlay has been detached. */
    OverlayRef.prototype.detachments = /** Gets an observable that emits when the overlay has been detached. */
    function () {
        return this._detachments.asObservable();
    };
    /** Gets an observable of keydown events targeted to this overlay. */
    /** Gets an observable of keydown events targeted to this overlay. */
    OverlayRef.prototype.keydownEvents = /** Gets an observable of keydown events targeted to this overlay. */
    function () {
        return this._keydownEventsObservable;
    };
    /** Gets the the current overlay configuration, which is immutable. */
    /** Gets the the current overlay configuration, which is immutable. */
    OverlayRef.prototype.getConfig = /** Gets the the current overlay configuration, which is immutable. */
    function () {
        return this._config;
    };
    /** Updates the position of the overlay based on the position strategy. */
    /** Updates the position of the overlay based on the position strategy. */
    OverlayRef.prototype.updatePosition = /** Updates the position of the overlay based on the position strategy. */
    function () {
        if (this._config.positionStrategy) {
            this._config.positionStrategy.apply();
        }
    };
    /** Update the size properties of the overlay. */
    /** Update the size properties of the overlay. */
    OverlayRef.prototype.updateSize = /** Update the size properties of the overlay. */
    function (sizeConfig) {
        this._config = __assign({}, this._config, sizeConfig);
        this._updateElementSize();
    };
    /** Sets the LTR/RTL direction for the overlay. */
    /** Sets the LTR/RTL direction for the overlay. */
    OverlayRef.prototype.setDirection = /** Sets the LTR/RTL direction for the overlay. */
    function (dir) {
        this._config = __assign({}, this._config, { direction: dir });
        this._updateElementDirection();
    };
    /**
     * Returns the layout direction of the overlay panel.
     */
    /**
       * Returns the layout direction of the overlay panel.
       */
    OverlayRef.prototype.getDirection = /**
       * Returns the layout direction of the overlay panel.
       */
    function () {
        var direction = this._config.direction;
        if (!direction) {
            return 'ltr';
        }
        return typeof direction === 'string' ? direction : direction.value;
    };
    /** Updates the text direction of the overlay panel. */
    /** Updates the text direction of the overlay panel. */
    OverlayRef.prototype._updateElementDirection = /** Updates the text direction of the overlay panel. */
    function () {
        this._host.setAttribute('dir', this.getDirection());
    };
    /** Updates the size of the overlay element based on the overlay config. */
    /** Updates the size of the overlay element based on the overlay config. */
    OverlayRef.prototype._updateElementSize = /** Updates the size of the overlay element based on the overlay config. */
    function () {
        var style = this._pane.style;
        style.width = coercion_1.coerceCssPixelValue(this._config.width);
        style.height = coercion_1.coerceCssPixelValue(this._config.height);
        style.minWidth = coercion_1.coerceCssPixelValue(this._config.minWidth);
        style.minHeight = coercion_1.coerceCssPixelValue(this._config.minHeight);
        style.maxWidth = coercion_1.coerceCssPixelValue(this._config.maxWidth);
        style.maxHeight = coercion_1.coerceCssPixelValue(this._config.maxHeight);
    };
    /** Toggles the pointer events for the overlay pane element. */
    /** Toggles the pointer events for the overlay pane element. */
    OverlayRef.prototype._togglePointerEvents = /** Toggles the pointer events for the overlay pane element. */
    function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /** Attaches a backdrop for this overlay. */
    /** Attaches a backdrop for this overlay. */
    OverlayRef.prototype._attachBackdrop = /** Attaches a backdrop for this overlay. */
    function () {
        var _this = this;
        var showingClass = 'cdk-overlay-backdrop-showing';
        this._backdropElement = this._document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        if (this._config.backdropClass) {
            this._toggleClasses(this._backdropElement, this._config.backdropClass, true);
        }
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._host.parentElement.insertBefore(this._backdropElement, this._host);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function (event) { return _this._backdropClick.next(event); });
        // Add class to fade-in the backdrop after one frame.
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(function () {
                requestAnimationFrame(function () {
                    if (_this._backdropElement) {
                        _this._backdropElement.classList.add(showingClass);
                    }
                });
            });
        }
        else {
            this._backdropElement.classList.add(showingClass);
        }
    };
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     */
    /**
       * Updates the stacking order of the element, moving it to the top if necessary.
       * This is required in cases where one overlay was detached, while another one,
       * that should be behind it, was destroyed. The next time both of them are opened,
       * the stacking will be wrong, because the detached element's pane will still be
       * in its original DOM position.
       */
    OverlayRef.prototype._updateStackingOrder = /**
       * Updates the stacking order of the element, moving it to the top if necessary.
       * This is required in cases where one overlay was detached, while another one,
       * that should be behind it, was destroyed. The next time both of them are opened,
       * the stacking will be wrong, because the detached element's pane will still be
       * in its original DOM position.
       */
    function () {
        if (this._host.nextSibling) {
            this._host.parentNode.appendChild(this._host);
        }
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    /** Detaches the backdrop (if any) associated with the overlay. */
    OverlayRef.prototype.detachBackdrop = /** Detaches the backdrop (if any) associated with the overlay. */
    function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            var timeoutId_1;
            var finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
                clearTimeout(timeoutId_1);
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            if (this._config.backdropClass) {
                this._toggleClasses(backdropToDetach, this._config.backdropClass, false);
            }
            this._ngZone.runOutsideAngular(function () {
                backdropToDetach.addEventListener('transitionend', finishDetach_1);
            });
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            timeoutId_1 = this._ngZone.runOutsideAngular(function () { return setTimeout(finishDetach_1, 500); });
        }
    };
    /** Toggles a single CSS class or an array of classes on an element. */
    /** Toggles a single CSS class or an array of classes on an element. */
    OverlayRef.prototype._toggleClasses = /** Toggles a single CSS class or an array of classes on an element. */
    function (element, cssClasses, isAdd) {
        var classList = element.classList;
        coercion_1.coerceArray(cssClasses).forEach(function (cssClass) {
            // We can't do a spread here, because IE doesn't support setting multiple classes.
            isAdd ? classList.add(cssClass) : classList.remove(cssClass);
        });
    };
    return OverlayRef;
}());
exports.OverlayRef = OverlayRef;
//# sourceMappingURL=overlay-ref.js.map