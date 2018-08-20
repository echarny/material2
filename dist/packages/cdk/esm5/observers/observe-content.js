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
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Injectable, Input, NgModule, NgZone, Output, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MutationObserverFactory = /** @class */ (function () {
    function MutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MutationObserverFactory.prototype.create = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    MutationObserverFactory.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */ MutationObserverFactory.ngInjectableDef = i0.defineInjectable({ factory: function MutationObserverFactory_Factory() { return new MutationObserverFactory(); }, token: MutationObserverFactory, providedIn: "root" });
    return MutationObserverFactory;
}());
export { MutationObserverFactory };
function MutationObserverFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MutationObserverFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MutationObserverFactory.ctorParameters;
}
/**
 * An injectable service that allows watching elements for changes to their content.
 */
var ContentObserver = /** @class */ (function () {
    function ContentObserver(_mutationObserverFactory) {
        this._mutationObserverFactory = _mutationObserverFactory;
        /**
         * Keeps track of the existing MutationObservers so they can be reused.
         */
        this._observedElements = new Map();
    }
    /**
     * @return {?}
     */
    ContentObserver.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._observedElements.forEach(function (_, element) { return _this._cleanupObserver(element); });
    };
    /**
     * Observe content changes on an element.
     * @param element The element to observe for content changes.
     */
    /**
     * Observe content changes on an element.
     * @param {?} element The element to observe for content changes.
     * @return {?}
     */
    ContentObserver.prototype.observe = /**
     * Observe content changes on an element.
     * @param {?} element The element to observe for content changes.
     * @return {?}
     */
    function (element) {
        var _this = this;
        return Observable.create(function (observer) {
            var /** @type {?} */ stream = _this._observeElement(element);
            var /** @type {?} */ subscription = stream.subscribe(observer);
            return function () {
                subscription.unsubscribe();
                _this._unobserveElement(element);
            };
        });
    };
    /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     * @param {?} element
     * @return {?}
     */
    ContentObserver.prototype._observeElement = /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (!this._observedElements.has(element)) {
            var /** @type {?} */ stream_1 = new Subject();
            var /** @type {?} */ observer = this._mutationObserverFactory.create(function (mutations) { return stream_1.next(mutations); });
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
            /** @type {?} */ ((this._observedElements.get(element))).count++;
        }
        return /** @type {?} */ ((this._observedElements.get(element))).stream;
    };
    /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     * @param {?} element
     * @return {?}
     */
    ContentObserver.prototype._unobserveElement = /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (this._observedElements.has(element)) {
            /** @type {?} */ ((this._observedElements.get(element))).count--;
            if (!/** @type {?} */ ((this._observedElements.get(element))).count) {
                this._cleanupObserver(element);
            }
        }
    };
    /**
     * Clean up the underlying MutationObserver for the specified element.
     * @param {?} element
     * @return {?}
     */
    ContentObserver.prototype._cleanupObserver = /**
     * Clean up the underlying MutationObserver for the specified element.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (this._observedElements.has(element)) {
            var _a = /** @type {?} */ ((this._observedElements.get(element))), observer = _a.observer, stream = _a.stream;
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this._observedElements.delete(element);
        }
    };
    ContentObserver.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ContentObserver.ctorParameters = function () { return [
        { type: MutationObserverFactory, },
    ]; };
    /** @nocollapse */ ContentObserver.ngInjectableDef = i0.defineInjectable({ factory: function ContentObserver_Factory() { return new ContentObserver(i0.inject(MutationObserverFactory)); }, token: ContentObserver, providedIn: "root" });
    return ContentObserver;
}());
export { ContentObserver };
function ContentObserver_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ContentObserver.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ContentObserver.ctorParameters;
    /**
     * Keeps track of the existing MutationObservers so they can be reused.
     * @type {?}
     */
    ContentObserver.prototype._observedElements;
    /** @type {?} */
    ContentObserver.prototype._mutationObserverFactory;
}
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var CdkObserveContent = /** @class */ (function () {
    function CdkObserveContent(_contentObserver, _elementRef, _ngZone) {
        this._contentObserver = _contentObserver;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        this._disabled = false;
        this._currentSubscription = null;
    }
    Object.defineProperty(CdkObserveContent.prototype, "disabled", {
        get: /**
         * Whether observing content is disabled. This option can be used
         * to disconnect the underlying MutationObserver until it is needed.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
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
        get: /**
         * Debounce interval for emitting the changes.
         * @return {?}
         */
        function () { return this._debounce; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._debounce = coerceNumberProperty(value);
            this._subscribe();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkObserveContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (!this._currentSubscription && !this.disabled) {
            this._subscribe();
        }
    };
    /**
     * @return {?}
     */
    CdkObserveContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._unsubscribe();
    };
    /**
     * @return {?}
     */
    CdkObserveContent.prototype._subscribe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._unsubscribe();
        var /** @type {?} */ stream = this._contentObserver.observe(this._elementRef.nativeElement);
        // TODO(mmalerba): We shouldn't be emitting on this @Output() outside the zone.
        // Consider brining it back inside the zone next time we're making breaking changes.
        // Bringing it back inside can cause things like infinite change detection loops and changed
        // after checked errors if people's code isn't handling it properly.
        this._ngZone.runOutsideAngular(function () {
            _this._currentSubscription =
                (_this.debounce ? stream.pipe(debounceTime(_this.debounce)) : stream).subscribe(_this.event);
        });
    };
    /**
     * @return {?}
     */
    CdkObserveContent.prototype._unsubscribe = /**
     * @return {?}
     */
    function () {
        if (this._currentSubscription) {
            this._currentSubscription.unsubscribe();
        }
    };
    CdkObserveContent.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkObserveContent]',
                    exportAs: 'cdkObserveContent',
                },] },
    ];
    /** @nocollapse */
    CdkObserveContent.ctorParameters = function () { return [
        { type: ContentObserver, },
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    CdkObserveContent.propDecorators = {
        "event": [{ type: Output, args: ['cdkObserveContent',] },],
        "disabled": [{ type: Input, args: ['cdkObserveContentDisabled',] },],
        "debounce": [{ type: Input },],
    };
    return CdkObserveContent;
}());
export { CdkObserveContent };
function CdkObserveContent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkObserveContent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkObserveContent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkObserveContent.propDecorators;
    /**
     * Event emitted for each change in the element's content.
     * @type {?}
     */
    CdkObserveContent.prototype.event;
    /** @type {?} */
    CdkObserveContent.prototype._disabled;
    /** @type {?} */
    CdkObserveContent.prototype._debounce;
    /** @type {?} */
    CdkObserveContent.prototype._currentSubscription;
    /** @type {?} */
    CdkObserveContent.prototype._contentObserver;
    /** @type {?} */
    CdkObserveContent.prototype._elementRef;
    /** @type {?} */
    CdkObserveContent.prototype._ngZone;
}
var ObserversModule = /** @class */ (function () {
    function ObserversModule() {
    }
    ObserversModule.decorators = [
        { type: NgModule, args: [{
                    exports: [CdkObserveContent],
                    declarations: [CdkObserveContent],
                    providers: [MutationObserverFactory]
                },] },
    ];
    return ObserversModule;
}());
export { ObserversModule };
function ObserversModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ObserversModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ObserversModule.ctorParameters;
}
//# sourceMappingURL=observe-content.js.map