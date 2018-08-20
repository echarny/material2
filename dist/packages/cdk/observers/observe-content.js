"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var i0 = require("@angular/core");
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
var MutationObserverFactory = /** @class */ (function () {
    function MutationObserverFactory() {
    }
    MutationObserverFactory.prototype.create = function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    MutationObserverFactory.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    MutationObserverFactory.ngInjectableDef = i0.defineInjectable({ factory: function MutationObserverFactory_Factory() { return new MutationObserverFactory(); }, token: MutationObserverFactory, providedIn: "root" });
    return MutationObserverFactory;
}());
exports.MutationObserverFactory = MutationObserverFactory;
/** An injectable service that allows watching elements for changes to their content. */
var ContentObserver = /** @class */ (function () {
    function ContentObserver(_mutationObserverFactory) {
        this._mutationObserverFactory = _mutationObserverFactory;
        /** Keeps track of the existing MutationObservers so they can be reused. */
        this._observedElements = new Map();
    }
    ContentObserver.prototype.ngOnDestroy = function () {
        var _this = this;
        this._observedElements.forEach(function (_, element) { return _this._cleanupObserver(element); });
    };
    /**
     * Observe content changes on an element.
     * @param element The element to observe for content changes.
     */
    /**
       * Observe content changes on an element.
       * @param element The element to observe for content changes.
       */
    ContentObserver.prototype.observe = /**
       * Observe content changes on an element.
       * @param element The element to observe for content changes.
       */
    function (element) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var stream = _this._observeElement(element);
            var subscription = stream.subscribe(observer);
            return function () {
                subscription.unsubscribe();
                _this._unobserveElement(element);
            };
        });
    };
    /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     */
    /**
       * Observes the given element by using the existing MutationObserver if available, or creating a
       * new one if not.
       */
    ContentObserver.prototype._observeElement = /**
       * Observes the given element by using the existing MutationObserver if available, or creating a
       * new one if not.
       */
    function (element) {
        if (!this._observedElements.has(element)) {
            var stream_1 = new rxjs_1.Subject();
            var observer = this._mutationObserverFactory.create(function (mutations) { return stream_1.next(mutations); });
            if (observer) {
                observer.observe(element, {
                    characterData: true,
                    childList: true,
                    subtree: true
                });
            }
            this._observedElements.set(element, { observer: observer, stream: stream_1, count: 1 });
        }
        else {
            this._observedElements.get(element).count++;
        }
        return this._observedElements.get(element).stream;
    };
    /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     */
    /**
       * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
       * observing this element.
       */
    ContentObserver.prototype._unobserveElement = /**
       * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
       * observing this element.
       */
    function (element) {
        if (this._observedElements.has(element)) {
            this._observedElements.get(element).count--;
            if (!this._observedElements.get(element).count) {
                this._cleanupObserver(element);
            }
        }
    };
    /** Clean up the underlying MutationObserver for the specified element. */
    /** Clean up the underlying MutationObserver for the specified element. */
    ContentObserver.prototype._cleanupObserver = /** Clean up the underlying MutationObserver for the specified element. */
    function (element) {
        if (this._observedElements.has(element)) {
            var _a = (this._observedElements.get(element)), observer = _a.observer, stream = _a.stream;
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this._observedElements.delete(element);
        }
    };
    ContentObserver.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ContentObserver.ctorParameters = function () { return [
        { type: MutationObserverFactory, },
    ]; };
    ContentObserver.ngInjectableDef = i0.defineInjectable({ factory: function ContentObserver_Factory() { return new ContentObserver(i0.inject(MutationObserverFactory)); }, token: ContentObserver, providedIn: "root" });
    return ContentObserver;
}());
exports.ContentObserver = ContentObserver;
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var CdkObserveContent = /** @class */ (function () {
    function CdkObserveContent(_contentObserver, _elementRef, _ngZone) {
        this._contentObserver = _contentObserver;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /** Event emitted for each change in the element's content. */
        this.event = new core_1.EventEmitter();
        this._disabled = false;
        this._currentSubscription = null;
    }
    Object.defineProperty(CdkObserveContent.prototype, "disabled", {
        get: /**
           * Whether observing content is disabled. This option can be used
           * to disconnect the underlying MutationObserver until it is needed.
           */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            if (this._disabled) {
                this._unsubscribe();
            }
            else {
                this._subscribe();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkObserveContent.prototype, "debounce", {
        get: /** Debounce interval for emitting the changes. */
        function () { return this._debounce; },
        set: function (value) {
            this._debounce = coercion_1.coerceNumberProperty(value);
            this._subscribe();
        },
        enumerable: true,
        configurable: true
    });
    CdkObserveContent.prototype.ngAfterContentInit = function () {
        if (!this._currentSubscription && !this.disabled) {
            this._subscribe();
        }
    };
    CdkObserveContent.prototype.ngOnDestroy = function () {
        this._unsubscribe();
    };
    CdkObserveContent.prototype._subscribe = function () {
        var _this = this;
        this._unsubscribe();
        var stream = this._contentObserver.observe(this._elementRef.nativeElement);
        // TODO(mmalerba): We shouldn't be emitting on this @Output() outside the zone.
        // Consider brining it back inside the zone next time we're making breaking changes.
        // Bringing it back inside can cause things like infinite change detection loops and changed
        // after checked errors if people's code isn't handling it properly.
        this._ngZone.runOutsideAngular(function () {
            _this._currentSubscription =
                (_this.debounce ? stream.pipe(operators_1.debounceTime(_this.debounce)) : stream).subscribe(_this.event);
        });
    };
    CdkObserveContent.prototype._unsubscribe = function () {
        if (this._currentSubscription) {
            this._currentSubscription.unsubscribe();
        }
    };
    CdkObserveContent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkObserveContent]',
                    exportAs: 'cdkObserveContent',
                },] },
    ];
    /** @nocollapse */
    CdkObserveContent.ctorParameters = function () { return [
        { type: ContentObserver, },
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ]; };
    CdkObserveContent.propDecorators = {
        "event": [{ type: core_1.Output, args: ['cdkObserveContent',] },],
        "disabled": [{ type: core_1.Input, args: ['cdkObserveContentDisabled',] },],
        "debounce": [{ type: core_1.Input },],
    };
    return CdkObserveContent;
}());
exports.CdkObserveContent = CdkObserveContent;
var ObserversModule = /** @class */ (function () {
    function ObserversModule() {
    }
    ObserversModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [CdkObserveContent],
                    declarations: [CdkObserveContent],
                    providers: [MutationObserverFactory]
                },] },
    ];
    return ObserversModule;
}());
exports.ObserversModule = ObserversModule;
//# sourceMappingURL=observe-content.js.map