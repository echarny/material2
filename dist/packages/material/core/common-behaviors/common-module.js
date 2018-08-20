"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bidi_1 = require("@angular/cdk/bidi");
/** Injection token that configures whether the Material sanity checks are enabled. */
exports.MATERIAL_SANITY_CHECKS = new core_1.InjectionToken('mat-sanity-checks', {
    providedIn: 'root',
    factory: MATERIAL_SANITY_CHECKS_FACTORY,
});
/** @docs-private */
function MATERIAL_SANITY_CHECKS_FACTORY() {
    return true;
}
exports.MATERIAL_SANITY_CHECKS_FACTORY = MATERIAL_SANITY_CHECKS_FACTORY;
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
var MatCommonModule = /** @class */ (function () {
    function MatCommonModule(_sanityChecksEnabled) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
        this._hasDoneGlobalChecks = false;
        /** Whether we've already checked for HammerJs availability. */
        this._hasCheckedHammer = false;
        /** Reference to the global `document` object. */
        this._document = typeof document === 'object' && document ? document : null;
        /** Reference to the global 'window' object. */
        this._window = typeof window === 'object' && window ? window : null;
        if (this._areChecksEnabled() && !this._hasDoneGlobalChecks) {
            this._checkDoctypeIsDefined();
            this._checkThemeIsPresent();
            this._hasDoneGlobalChecks = true;
        }
    }
    /** Whether any sanity checks are enabled */
    /** Whether any sanity checks are enabled */
    MatCommonModule.prototype._areChecksEnabled = /** Whether any sanity checks are enabled */
    function () {
        return this._sanityChecksEnabled && core_1.isDevMode() && !this._isTestEnv();
    };
    /** Whether the code is running in tests. */
    /** Whether the code is running in tests. */
    MatCommonModule.prototype._isTestEnv = /** Whether the code is running in tests. */
    function () {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    };
    MatCommonModule.prototype._checkDoctypeIsDefined = function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    MatCommonModule.prototype._checkThemeIsPresent = function () {
        // We need to assert that the `body` is defined, because these checks run very early
        // and the `body` won't be defined if the consumer put their scripts in the `head`.
        if (this._document && this._document.body && typeof getComputedStyle === 'function') {
            var testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            var computedStyle = getComputedStyle(testElement);
            // In some situations the computed style of the test element can be null. For example in
            // Firefox, the computed style is null if an application is running inside of a hidden iframe.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            if (computedStyle && computedStyle.display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
    /** Checks whether HammerJS is available. */
    /** Checks whether HammerJS is available. */
    MatCommonModule.prototype._checkHammerIsAvailable = /** Checks whether HammerJS is available. */
    function () {
        if (this._hasCheckedHammer || !this._window) {
            return;
        }
        if (this._areChecksEnabled() && !this._window['Hammer']) {
            console.warn('Could not find HammerJS. Certain Angular Material components may not work correctly.');
        }
        this._hasCheckedHammer = true;
    };
    MatCommonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [bidi_1.BidiModule],
                    exports: [bidi_1.BidiModule],
                },] },
    ];
    /** @nocollapse */
    MatCommonModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.MATERIAL_SANITY_CHECKS,] },] },
    ]; };
    return MatCommonModule;
}());
exports.MatCommonModule = MatCommonModule;
//# sourceMappingURL=common-module.js.map