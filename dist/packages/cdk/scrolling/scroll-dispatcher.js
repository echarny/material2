"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var i0 = require("@angular/core");
var i1 = require("../platform/platform");
/** Time in ms to throttle the scrolling events by default. */
exports.DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = /** @class */ (function () {
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** Subject for notifying that a registered scrollable reference element has been scrolled. */
        this._scrolled = new rxjs_1.Subject();
        /** Keeps track of the global `scroll` and `resize` subscriptions. */
        this._globalSubscription = null;
        /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
        this._scrolledCount = 0;
        /**
           * Map of all the scrollable references that are registered with the service and their
           * scroll event subscriptions.
           */
        this.scrollContainers = new Map();
    }
    /**
     * Registers a scrollable instance with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event to its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    /**
       * Registers a scrollable instance with the service and listens for its scrolled events. When the
       * scrollable is scrolled, the service emits the event to its scrolled observable.
       * @param scrollable Scrollable instance to be registered.
       */
    ScrollDispatcher.prototype.register = /**
       * Registers a scrollable instance with the service and listens for its scrolled events. When the
       * scrollable is scrolled, the service emits the event to its scrolled observable.
       * @param scrollable Scrollable instance to be registered.
       */
    function (scrollable) {
        var _this = this;
        var scrollSubscription = scrollable.elementScrolled()
            .subscribe(function () { return _this._scrolled.next(scrollable); });
        this.scrollContainers.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    /**
       * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
       * @param scrollable Scrollable instance to be deregistered.
       */
    ScrollDispatcher.prototype.deregister = /**
       * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
       * @param scrollable Scrollable instance to be deregistered.
       */
    function (scrollable) {
        var scrollableReference = this.scrollContainers.get(scrollable);
        if (scrollableReference) {
            scrollableReference.unsubscribe();
            this.scrollContainers.delete(scrollable);
        }
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     *
     * **Note:** in order to avoid hitting change detection for every scroll event,
     * all of the events emitted from this stream will be run outside the Angular zone.
     * If you need to update any data bindings as a result of a scroll event, you have
     * to run the callback using `NgZone.run`.
     */
    /**
       * Returns an observable that emits an event whenever any of the registered Scrollable
       * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
       * to override the default "throttle" time.
       *
       * **Note:** in order to avoid hitting change detection for every scroll event,
       * all of the events emitted from this stream will be run outside the Angular zone.
       * If you need to update any data bindings as a result of a scroll event, you have
       * to run the callback using `NgZone.run`.
       */
    ScrollDispatcher.prototype.scrolled = /**
       * Returns an observable that emits an event whenever any of the registered Scrollable
       * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
       * to override the default "throttle" time.
       *
       * **Note:** in order to avoid hitting change detection for every scroll event,
       * all of the events emitted from this stream will be run outside the Angular zone.
       * If you need to update any data bindings as a result of a scroll event, you have
       * to run the callback using `NgZone.run`.
       */
    function (auditTimeInMs) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = exports.DEFAULT_SCROLL_TIME; }
        return this._platform.isBrowser ? rxjs_1.Observable.create(function (observer) {
            if (!_this._globalSubscription) {
                _this._addGlobalListener();
            }
            // In the case of a 0ms delay, use an observable without auditTime
            // since it does add a perceptible delay in processing overhead.
            var subscription = auditTimeInMs > 0 ?
                _this._scrolled.pipe(operators_1.auditTime(auditTimeInMs)).subscribe(observer) :
                _this._scrolled.subscribe(observer);
            _this._scrolledCount++;
            return function () {
                subscription.unsubscribe();
                _this._scrolledCount--;
                if (!_this._scrolledCount) {
                    _this._removeGlobalListener();
                }
            };
        }) : rxjs_1.of();
    };
    ScrollDispatcher.prototype.ngOnDestroy = function () {
        var _this = this;
        this._removeGlobalListener();
        this.scrollContainers.forEach(function (_, container) { return _this.deregister(container); });
        this._scrolled.complete();
    };
    /**
     * Returns an observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     * @param elementRef Element whose ancestors to listen for.
     * @param auditTimeInMs Time to throttle the scroll events.
     */
    /**
       * Returns an observable that emits whenever any of the
       * scrollable ancestors of an element are scrolled.
       * @param elementRef Element whose ancestors to listen for.
       * @param auditTimeInMs Time to throttle the scroll events.
       */
    ScrollDispatcher.prototype.ancestorScrolled = /**
       * Returns an observable that emits whenever any of the
       * scrollable ancestors of an element are scrolled.
       * @param elementRef Element whose ancestors to listen for.
       * @param auditTimeInMs Time to throttle the scroll events.
       */
    function (elementRef, auditTimeInMs) {
        var ancestors = this.getAncestorScrollContainers(elementRef);
        return this.scrolled(auditTimeInMs).pipe(operators_1.filter(function (target) {
            return !target || ancestors.indexOf(target) > -1;
        }));
    };
    /** Returns all registered Scrollables that contain the provided element. */
    /** Returns all registered Scrollables that contain the provided element. */
    ScrollDispatcher.prototype.getAncestorScrollContainers = /** Returns all registered Scrollables that contain the provided element. */
    function (elementRef) {
        var _this = this;
        var scrollingContainers = [];
        this.scrollContainers.forEach(function (_subscription, scrollable) {
            if (_this._scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /** Returns true if the element is contained within the provided Scrollable. */
    /** Returns true if the element is contained within the provided Scrollable. */
    ScrollDispatcher.prototype._scrollableContainsElement = /** Returns true if the element is contained within the provided Scrollable. */
    function (scrollable, elementRef) {
        var element = elementRef.nativeElement;
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
        return false;
    };
    /** Sets up the global scroll listeners. */
    /** Sets up the global scroll listeners. */
    ScrollDispatcher.prototype._addGlobalListener = /** Sets up the global scroll listeners. */
    function () {
        var _this = this;
        this._globalSubscription = this._ngZone.runOutsideAngular(function () {
            return rxjs_1.fromEvent(window.document, 'scroll').subscribe(function () { return _this._scrolled.next(); });
        });
    };
    /** Cleans up the global scroll listener. */
    /** Cleans up the global scroll listener. */
    ScrollDispatcher.prototype._removeGlobalListener = /** Cleans up the global scroll listener. */
    function () {
        if (this._globalSubscription) {
            this._globalSubscription.unsubscribe();
            this._globalSubscription = null;
        }
    };
    ScrollDispatcher.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ScrollDispatcher.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: platform_1.Platform, },
    ]; };
    ScrollDispatcher.ngInjectableDef = i0.defineInjectable({ factory: function ScrollDispatcher_Factory() { return new ScrollDispatcher(i0.inject(i0.NgZone), i0.inject(i1.Platform)); }, token: ScrollDispatcher, providedIn: "root" });
    return ScrollDispatcher;
}());
exports.ScrollDispatcher = ScrollDispatcher;
/** @docs-private @deprecated @breaking-change 7.0.0 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
exports.SCROLL_DISPATCHER_PROVIDER_FACTORY = SCROLL_DISPATCHER_PROVIDER_FACTORY;
/** @docs-private @deprecated @breaking-change 7.0.0 */
exports.SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new core_1.Optional(), new core_1.SkipSelf(), ScrollDispatcher], core_1.NgZone, platform_1.Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};
//# sourceMappingURL=scroll-dispatcher.js.map