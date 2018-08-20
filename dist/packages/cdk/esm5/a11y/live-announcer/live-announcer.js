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
import { ContentObserver } from '@angular/cdk/observers';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Injectable, Input, NgZone, Optional, SkipSelf, } from '@angular/core';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from './live-announcer-token';
import * as i0 from "@angular/core";
import * as i1 from "./live-announcer-token";
import * as i2 from "@angular/common";
var LiveAnnouncer = /** @class */ (function () {
    function LiveAnnouncer(elementToken, _document) {
        // We inject the live element and document as `any` because the constructor signature cannot
        // reference browser globals (HTMLElement, Document) on non-browser environments, since having
        // a class decorator causes TypeScript to preserve the constructor signature types.
        this._document = _document;
        this._liveElement = elementToken || this._createLiveElement();
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     * @returns Promise that will be resolved when the message is added to the DOM.
     */
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?} Promise that will be resolved when the message is added to the DOM.
     */
    LiveAnnouncer.prototype.announce = /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?} Promise that will be resolved when the message is added to the DOM.
     */
    function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this._liveElement.textContent = message;
                resolve();
            }, 100);
        });
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ elementClass = 'cdk-live-announcer-element';
        var /** @type {?} */ previousElements = this._document.getElementsByClassName(elementClass);
        // Remove any old containers. This can happen when coming in from a server-side-rendered page.
        for (var /** @type {?} */ i = 0; i < previousElements.length; i++) {
            /** @type {?} */ ((previousElements[i].parentNode)).removeChild(previousElements[i]);
        }
        var /** @type {?} */ liveEl = this._document.createElement('div');
        liveEl.classList.add(elementClass);
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        this._document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    LiveAnnouncer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    /** @nocollapse */ LiveAnnouncer.ngInjectableDef = i0.defineInjectable({ factory: function LiveAnnouncer_Factory() { return new LiveAnnouncer(i0.inject(i1.LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), i0.inject(i2.DOCUMENT)); }, token: LiveAnnouncer, providedIn: "root" });
    return LiveAnnouncer;
}());
export { LiveAnnouncer };
function LiveAnnouncer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LiveAnnouncer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LiveAnnouncer.ctorParameters;
    /** @type {?} */
    LiveAnnouncer.prototype._liveElement;
    /** @type {?} */
    LiveAnnouncer.prototype._document;
}
/**
 * A directive that works similarly to aria-live, but uses the LiveAnnouncer to ensure compatibility
 * with a wider range of browsers and screen readers.
 */
var CdkAriaLive = /** @class */ (function () {
    function CdkAriaLive(_elementRef, _liveAnnouncer, _contentObserver, _ngZone) {
        this._elementRef = _elementRef;
        this._liveAnnouncer = _liveAnnouncer;
        this._contentObserver = _contentObserver;
        this._ngZone = _ngZone;
        this._politeness = 'off';
    }
    Object.defineProperty(CdkAriaLive.prototype, "politeness", {
        get: /**
         * The aria-live politeness level to use when announcing messages.
         * @return {?}
         */
        function () { return this._politeness; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._politeness = value === 'polite' || value === 'assertive' ? value : 'off';
            if (this._politeness === 'off') {
                if (this._subscription) {
                    this._subscription.unsubscribe();
                    this._subscription = null;
                }
            }
            else {
                if (!this._subscription) {
                    this._subscription = this._ngZone.runOutsideAngular(function () {
                        return _this._contentObserver.observe(_this._elementRef.nativeElement).subscribe(function () {
                            return _this._liveAnnouncer.announce(_this._elementRef.nativeElement.innerText, _this._politeness);
                        });
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkAriaLive.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    };
    CdkAriaLive.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkAriaLive]',
                    exportAs: 'cdkAriaLive',
                },] },
    ];
    /** @nocollapse */
    CdkAriaLive.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: LiveAnnouncer, },
        { type: ContentObserver, },
        { type: NgZone, },
    ]; };
    CdkAriaLive.propDecorators = {
        "politeness": [{ type: Input, args: ['cdkAriaLive',] },],
    };
    return CdkAriaLive;
}());
export { CdkAriaLive };
function CdkAriaLive_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkAriaLive.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkAriaLive.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkAriaLive.propDecorators;
    /** @type {?} */
    CdkAriaLive.prototype._politeness;
    /** @type {?} */
    CdkAriaLive.prototype._subscription;
    /** @type {?} */
    CdkAriaLive.prototype._elementRef;
    /** @type {?} */
    CdkAriaLive.prototype._liveAnnouncer;
    /** @type {?} */
    CdkAriaLive.prototype._contentObserver;
    /** @type {?} */
    CdkAriaLive.prototype._ngZone;
}
/**
 * \@docs-private \@deprecated \@breaking-change 7.0.0
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} _document
 * @return {?}
 */
export function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, _document) {
    return parentDispatcher || new LiveAnnouncer(liveElement, _document);
}
/**
 * \@docs-private \@deprecated \@breaking-change 7.0.0
 */
export var /** @type {?} */ LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        DOCUMENT,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
//# sourceMappingURL=live-announcer.js.map