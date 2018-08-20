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
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var /** @type {?} */ hasV8BreakIterator = (typeof Intl !== 'undefined' && (/** @type {?} */ (Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
var Platform = /** @class */ (function () {
    /**
     * @breaking-change v7.0.0 remove optional decorator
     */
    function Platform(_platformId) {
        this._platformId = _platformId;
        /**
         * Whether the Angular application is being rendered in the browser.
         * We want to use the Angular platform check because if the Document is shimmed
         * without the navigator, the following checks will fail. This is preferred because
         * sometimes the Document may be shimmed without the user's knowledge or intention
         */
        this.isBrowser = this._platformId ?
            isPlatformBrowser(this._platformId) : typeof document === 'object' && !!document;
        /**
         * Whether the current browser is Microsoft Edge.
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Microsoft Trident.
         */
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Blink.
         */
        this.BLINK = this.isBrowser && (!!((/** @type {?} */ (window)).chrome || hasV8BreakIterator) &&
            typeof CSS !== 'undefined' && !this.EDGE && !this.TRIDENT);
        /**
         * Whether the current rendering engine is WebKit.
         */
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Whether the current platform is Apple iOS.
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(/** @type {?} */ (window)).MSStream;
        /**
         * Whether the current browser is Firefox.
         */
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        /**
         * Whether the current platform is Android.
         */
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        /**
         * Whether the current browser is Safari.
         */
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
    Platform.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    Platform.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Optional }, { type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    /** @nocollapse */ Platform.ngInjectableDef = i0.defineInjectable({ factory: function Platform_Factory() { return new Platform(i0.inject(i0.PLATFORM_ID, 8)); }, token: Platform, providedIn: "root" });
    return Platform;
}());
export { Platform };
function Platform_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Platform.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Platform.ctorParameters;
    /**
     * Whether the Angular application is being rendered in the browser.
     * We want to use the Angular platform check because if the Document is shimmed
     * without the navigator, the following checks will fail. This is preferred because
     * sometimes the Document may be shimmed without the user's knowledge or intention
     * @type {?}
     */
    Platform.prototype.isBrowser;
    /**
     * Whether the current browser is Microsoft Edge.
     * @type {?}
     */
    Platform.prototype.EDGE;
    /**
     * Whether the current rendering engine is Microsoft Trident.
     * @type {?}
     */
    Platform.prototype.TRIDENT;
    /**
     * Whether the current rendering engine is Blink.
     * @type {?}
     */
    Platform.prototype.BLINK;
    /**
     * Whether the current rendering engine is WebKit.
     * @type {?}
     */
    Platform.prototype.WEBKIT;
    /**
     * Whether the current platform is Apple iOS.
     * @type {?}
     */
    Platform.prototype.IOS;
    /**
     * Whether the current browser is Firefox.
     * @type {?}
     */
    Platform.prototype.FIREFOX;
    /**
     * Whether the current platform is Android.
     * @type {?}
     */
    Platform.prototype.ANDROID;
    /**
     * Whether the current browser is Safari.
     * @type {?}
     */
    Platform.prototype.SAFARI;
    /** @type {?} */
    Platform.prototype._platformId;
}
//# sourceMappingURL=platform.js.map