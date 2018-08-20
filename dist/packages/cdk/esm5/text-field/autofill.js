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
import { Platform, supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Directive, ElementRef, EventEmitter, Injectable, NgZone, Output, } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
/**
 * Options to pass to the animationstart listener.
 */
var /** @type {?} */ listenerOptions = supportsPassiveEventListeners() ? { passive: true } : false;
/**
 * An injectable service that can be used to monitor the autofill state of an input.
 * Based on the following blog post:
 * https://medium.com/\@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
 */
var AutofillMonitor = /** @class */ (function () {
    function AutofillMonitor(_platform, _ngZone) {
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._monitoredElements = new Map();
    }
    /**
     * Monitor for changes in the autofill state of the given input element.
     * @param element The element to monitor.
     * @return A stream of autofill state changes.
     */
    /**
     * Monitor for changes in the autofill state of the given input element.
     * @param {?} element The element to monitor.
     * @return {?} A stream of autofill state changes.
     */
    AutofillMonitor.prototype.monitor = /**
     * Monitor for changes in the autofill state of the given input element.
     * @param {?} element The element to monitor.
     * @return {?} A stream of autofill state changes.
     */
    function (element) {
        var _this = this;
        if (!this._platform.isBrowser) {
            return EMPTY;
        }
        var /** @type {?} */ info = this._monitoredElements.get(element);
        if (info) {
            return info.subject.asObservable();
        }
        var /** @type {?} */ result = new Subject();
        var /** @type {?} */ cssClass = 'cdk-text-field-autofilled';
        var /** @type {?} */ listener = function (event) {
            // Animation events fire on initial element render, we check for the presence of the autofill
            // CSS class to make sure this is a real change in state, not just the initial render before
            // we fire off events.
            if (event.animationName === 'cdk-text-field-autofill-start' &&
                !element.classList.contains(cssClass)) {
                element.classList.add(cssClass);
                _this._ngZone.run(function () { return result.next({ target: /** @type {?} */ (event.target), isAutofilled: true }); });
            }
            else if (event.animationName === 'cdk-text-field-autofill-end' &&
                element.classList.contains(cssClass)) {
                element.classList.remove(cssClass);
                _this._ngZone.run(function () { return result.next({ target: /** @type {?} */ (event.target), isAutofilled: false }); });
            }
        };
        this._ngZone.runOutsideAngular(function () {
            element.addEventListener('animationstart', listener, listenerOptions);
            element.classList.add('cdk-text-field-autofill-monitored');
        });
        this._monitoredElements.set(element, {
            subject: result,
            unlisten: function () {
                element.removeEventListener('animationstart', listener, listenerOptions);
            }
        });
        return result.asObservable();
    };
    /**
     * Stop monitoring the autofill state of the given input element.
     * @param element The element to stop monitoring.
     */
    /**
     * Stop monitoring the autofill state of the given input element.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    AutofillMonitor.prototype.stopMonitoring = /**
     * Stop monitoring the autofill state of the given input element.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ info = this._monitoredElements.get(element);
        if (info) {
            info.unlisten();
            info.subject.complete();
            element.classList.remove('cdk-text-field-autofill-monitored');
            element.classList.remove('cdk-text-field-autofilled');
            this._monitoredElements.delete(element);
        }
    };
    /**
     * @return {?}
     */
    AutofillMonitor.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._monitoredElements.forEach(function (_info, element) { return _this.stopMonitoring(element); });
    };
    AutofillMonitor.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AutofillMonitor.ctorParameters = function () { return [
        { type: Platform, },
        { type: NgZone, },
    ]; };
    /** @nocollapse */ AutofillMonitor.ngInjectableDef = i0.defineInjectable({ factory: function AutofillMonitor_Factory() { return new AutofillMonitor(i0.inject(i1.Platform), i0.inject(i0.NgZone)); }, token: AutofillMonitor, providedIn: "root" });
    return AutofillMonitor;
}());
export { AutofillMonitor };
function AutofillMonitor_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AutofillMonitor.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AutofillMonitor.ctorParameters;
    /** @type {?} */
    AutofillMonitor.prototype._monitoredElements;
    /** @type {?} */
    AutofillMonitor.prototype._platform;
    /** @type {?} */
    AutofillMonitor.prototype._ngZone;
}
/**
 * A directive that can be used to monitor the autofill state of an input.
 */
var CdkAutofill = /** @class */ (function () {
    function CdkAutofill(_elementRef, _autofillMonitor) {
        this._elementRef = _elementRef;
        this._autofillMonitor = _autofillMonitor;
        /**
         * Emits when the autofill state of the element changes.
         */
        this.cdkAutofill = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CdkAutofill.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._autofillMonitor
            .monitor(this._elementRef.nativeElement)
            .subscribe(function (event) { return _this.cdkAutofill.emit(event); });
    };
    /**
     * @return {?}
     */
    CdkAutofill.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    CdkAutofill.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkAutofill]',
                },] },
    ];
    /** @nocollapse */
    CdkAutofill.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: AutofillMonitor, },
    ]; };
    CdkAutofill.propDecorators = {
        "cdkAutofill": [{ type: Output },],
    };
    return CdkAutofill;
}());
export { CdkAutofill };
function CdkAutofill_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkAutofill.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkAutofill.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkAutofill.propDecorators;
    /**
     * Emits when the autofill state of the element changes.
     * @type {?}
     */
    CdkAutofill.prototype.cdkAutofill;
    /** @type {?} */
    CdkAutofill.prototype._elementRef;
    /** @type {?} */
    CdkAutofill.prototype._autofillMonitor;
}
//# sourceMappingURL=autofill.js.map