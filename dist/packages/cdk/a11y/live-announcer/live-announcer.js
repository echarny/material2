"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var live_announcer_token_1 = require("./live-announcer-token");
var i0 = require("@angular/core");
var i1 = require("./live-announcer-token");
var i2 = require("@angular/common");
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
       * @param message Message to be announced to the screenreader
       * @param politeness The politeness of the announcer element
       * @returns Promise that will be resolved when the message is added to the DOM.
       */
    LiveAnnouncer.prototype.announce = /**
       * Announces a message to screenreaders.
       * @param message Message to be announced to the screenreader
       * @param politeness The politeness of the announcer element
       * @returns Promise that will be resolved when the message is added to the DOM.
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
    LiveAnnouncer.prototype.ngOnDestroy = function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    LiveAnnouncer.prototype._createLiveElement = function () {
        var elementClass = 'cdk-live-announcer-element';
        var previousElements = this._document.getElementsByClassName(elementClass);
        // Remove any old containers. This can happen when coming in from a server-side-rendered page.
        for (var i = 0; i < previousElements.length; i++) {
            previousElements[i].parentNode.removeChild(previousElements[i]);
        }
        var liveEl = this._document.createElement('div');
        liveEl.classList.add(elementClass);
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        this._document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    LiveAnnouncer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [live_announcer_token_1.LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    LiveAnnouncer.ngInjectableDef = i0.defineInjectable({ factory: function LiveAnnouncer_Factory() { return new LiveAnnouncer(i0.inject(i1.LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), i0.inject(i2.DOCUMENT)); }, token: LiveAnnouncer, providedIn: "root" });
    return LiveAnnouncer;
}());
exports.LiveAnnouncer = LiveAnnouncer;
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
        get: /** The aria-live politeness level to use when announcing messages. */
        function () { return this._politeness; },
        set: function (value) {
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
    CdkAriaLive.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    };
    CdkAriaLive.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkAriaLive]',
                    exportAs: 'cdkAriaLive',
                },] },
    ];
    /** @nocollapse */
    CdkAriaLive.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: LiveAnnouncer, },
        { type: observers_1.ContentObserver, },
        { type: core_1.NgZone, },
    ]; };
    CdkAriaLive.propDecorators = {
        "politeness": [{ type: core_1.Input, args: ['cdkAriaLive',] },],
    };
    return CdkAriaLive;
}());
exports.CdkAriaLive = CdkAriaLive;
/** @docs-private @deprecated @breaking-change 7.0.0 */
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, _document) {
    return parentDispatcher || new LiveAnnouncer(liveElement, _document);
}
exports.LIVE_ANNOUNCER_PROVIDER_FACTORY = LIVE_ANNOUNCER_PROVIDER_FACTORY;
/** @docs-private @deprecated @breaking-change 7.0.0 */
exports.LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new core_1.Optional(), new core_1.SkipSelf(), LiveAnnouncer],
        [new core_1.Optional(), new core_1.Inject(live_announcer_token_1.LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        common_1.DOCUMENT,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
//# sourceMappingURL=live-announcer.js.map