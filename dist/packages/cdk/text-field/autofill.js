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
var i0 = require("@angular/core");
var i1 = require("../platform/platform");
/** Options to pass to the animationstart listener. */
var listenerOptions = platform_1.supportsPassiveEventListeners() ? { passive: true } : false;
/**
 * An injectable service that can be used to monitor the autofill state of an input.
 * Based on the following blog post:
 * https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
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
       * @param element The element to monitor.
       * @return A stream of autofill state changes.
       */
    AutofillMonitor.prototype.monitor = /**
       * Monitor for changes in the autofill state of the given input element.
       * @param element The element to monitor.
       * @return A stream of autofill state changes.
       */
    function (element) {
        var _this = this;
        if (!this._platform.isBrowser) {
            return rxjs_1.EMPTY;
        }
        var info = this._monitoredElements.get(element);
        if (info) {
            return info.subject.asObservable();
        }
        var result = new rxjs_1.Subject();
        var cssClass = 'cdk-text-field-autofilled';
        var listener = function (event) {
            // Animation events fire on initial element render, we check for the presence of the autofill
            // CSS class to make sure this is a real change in state, not just the initial render before
            // we fire off events.
            if (event.animationName === 'cdk-text-field-autofill-start' &&
                !element.classList.contains(cssClass)) {
                element.classList.add(cssClass);
                _this._ngZone.run(function () { return result.next({ target: event.target, isAutofilled: true }); });
            }
            else if (event.animationName === 'cdk-text-field-autofill-end' &&
                element.classList.contains(cssClass)) {
                element.classList.remove(cssClass);
                _this._ngZone.run(function () { return result.next({ target: event.target, isAutofilled: false }); });
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
       * @param element The element to stop monitoring.
       */
    AutofillMonitor.prototype.stopMonitoring = /**
       * Stop monitoring the autofill state of the given input element.
       * @param element The element to stop monitoring.
       */
    function (element) {
        var info = this._monitoredElements.get(element);
        if (info) {
            info.unlisten();
            info.subject.complete();
            element.classList.remove('cdk-text-field-autofill-monitored');
            element.classList.remove('cdk-text-field-autofilled');
            this._monitoredElements.delete(element);
        }
    };
    AutofillMonitor.prototype.ngOnDestroy = function () {
        var _this = this;
        this._monitoredElements.forEach(function (_info, element) { return _this.stopMonitoring(element); });
    };
    AutofillMonitor.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AutofillMonitor.ctorParameters = function () { return [
        { type: platform_1.Platform, },
        { type: core_1.NgZone, },
    ]; };
    AutofillMonitor.ngInjectableDef = i0.defineInjectable({ factory: function AutofillMonitor_Factory() { return new AutofillMonitor(i0.inject(i1.Platform), i0.inject(i0.NgZone)); }, token: AutofillMonitor, providedIn: "root" });
    return AutofillMonitor;
}());
exports.AutofillMonitor = AutofillMonitor;
/** A directive that can be used to monitor the autofill state of an input. */
var CdkAutofill = /** @class */ (function () {
    function CdkAutofill(_elementRef, _autofillMonitor) {
        this._elementRef = _elementRef;
        this._autofillMonitor = _autofillMonitor;
        /** Emits when the autofill state of the element changes. */
        this.cdkAutofill = new core_1.EventEmitter();
    }
    CdkAutofill.prototype.ngOnInit = function () {
        var _this = this;
        this._autofillMonitor
            .monitor(this._elementRef.nativeElement)
            .subscribe(function (event) { return _this.cdkAutofill.emit(event); });
    };
    CdkAutofill.prototype.ngOnDestroy = function () {
        this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    CdkAutofill.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkAutofill]',
                },] },
    ];
    /** @nocollapse */
    CdkAutofill.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: AutofillMonitor, },
    ]; };
    CdkAutofill.propDecorators = {
        "cdkAutofill": [{ type: core_1.Output },],
    };
    return CdkAutofill;
}());
exports.CdkAutofill = CdkAutofill;
//# sourceMappingURL=autofill.js.map