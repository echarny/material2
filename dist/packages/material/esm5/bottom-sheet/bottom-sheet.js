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
import * as tslib_1 from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { of as observableOf } from 'rxjs';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetConfig } from './bottom-sheet-config';
import { MatBottomSheetContainer } from './bottom-sheet-container';
import { MatBottomSheetModule } from './bottom-sheet-module';
import { MatBottomSheetRef } from './bottom-sheet-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/common";
import * as i3 from "./bottom-sheet-module";
/**
 * Service to trigger Material Design bottom sheets.
 */
var MatBottomSheet = /** @class */ (function () {
    function MatBottomSheet(_overlay, _injector, _parentBottomSheet, _location) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._parentBottomSheet = _parentBottomSheet;
        this._location = _location;
        this._bottomSheetRefAtThisLevel = null;
    }
    Object.defineProperty(MatBottomSheet.prototype, "_openedBottomSheetRef", {
        /** Reference to the currently opened bottom sheet. */
        get: /**
         * Reference to the currently opened bottom sheet.
         * @return {?}
         */
        function () {
            var /** @type {?} */ parent = this._parentBottomSheet;
            return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._parentBottomSheet) {
                this._parentBottomSheet._openedBottomSheetRef = value;
            }
            else {
                this._bottomSheetRefAtThisLevel = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T, D, R
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    MatBottomSheet.prototype.open = /**
     * @template T, D, R
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    function (componentOrTemplateRef, config) {
        var _this = this;
        var /** @type {?} */ _config = _applyConfigDefaults(config);
        var /** @type {?} */ overlayRef = this._createOverlay(_config);
        var /** @type {?} */ container = this._attachContainer(overlayRef, _config);
        var /** @type {?} */ ref = new MatBottomSheetRef(container, overlayRef, this._location);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, /** @type {?} */ ((null)), /** @type {?} */ ({
                $implicit: _config.data,
                bottomSheetRef: ref
            })));
        }
        else {
            var /** @type {?} */ portal = new ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(_config, ref));
            var /** @type {?} */ contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        // When the bottom sheet is dismissed, clear the reference to it.
        ref.afterDismissed().subscribe(function () {
            // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
            if (_this._openedBottomSheetRef == ref) {
                _this._openedBottomSheetRef = null;
            }
        });
        if (this._openedBottomSheetRef) {
            // If a bottom sheet is already in view, dismiss it and enter the
            // new bottom sheet after exit animation is complete.
            this._openedBottomSheetRef.afterDismissed().subscribe(function () { return ref.containerInstance.enter(); });
            this._openedBottomSheetRef.dismiss();
        }
        else {
            // If no bottom sheet is in view, enter the new bottom sheet.
            ref.containerInstance.enter();
        }
        this._openedBottomSheetRef = ref;
        return ref;
    };
    /**
     * Dismisses the currently-visible bottom sheet.
     */
    /**
     * Dismisses the currently-visible bottom sheet.
     * @return {?}
     */
    MatBottomSheet.prototype.dismiss = /**
     * Dismisses the currently-visible bottom sheet.
     * @return {?}
     */
    function () {
        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.dismiss();
        }
    };
    /**
     * Attaches the bottom sheet container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    MatBottomSheet.prototype._attachContainer = /**
     * Attaches the bottom sheet container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var /** @type {?} */ injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [MatBottomSheetConfig, config]
        ]));
        var /** @type {?} */ containerPortal = new ComponentPortal(MatBottomSheetContainer, config.viewContainerRef, injector);
        var /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified bottom sheet config.
     * @return {?}
     */
    MatBottomSheet.prototype._createOverlay = /**
     * Creates a new overlay and places it in the correct location.
     * @param {?} config The user-specified bottom sheet config.
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ overlayConfig = new OverlayConfig({
            direction: config.direction,
            hasBackdrop: config.hasBackdrop,
            maxWidth: '100%',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .global()
                .centerHorizontally()
                .bottom('0')
        });
        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an injector to be used inside of a bottom sheet component.
     * @template T
     * @param {?} config Config that was used to create the bottom sheet.
     * @param {?} bottomSheetRef Reference to the bottom sheet.
     * @return {?}
     */
    MatBottomSheet.prototype._createInjector = /**
     * Creates an injector to be used inside of a bottom sheet component.
     * @template T
     * @param {?} config Config that was used to create the bottom sheet.
     * @param {?} bottomSheetRef Reference to the bottom sheet.
     * @return {?}
     */
    function (config, bottomSheetRef) {
        var /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var /** @type {?} */ injectionTokens = new WeakMap([
            [MatBottomSheetRef, bottomSheetRef],
            [MAT_BOTTOM_SHEET_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: observableOf()
            });
        }
        return new PortalInjector(userInjector || this._injector, injectionTokens);
    };
    MatBottomSheet.decorators = [
        { type: Injectable, args: [{ providedIn: MatBottomSheetModule },] },
    ];
    /** @nocollapse */
    MatBottomSheet.ctorParameters = function () { return [
        { type: Overlay, },
        { type: Injector, },
        { type: MatBottomSheet, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: Location, decorators: [{ type: Optional },] },
    ]; };
    /** @nocollapse */ MatBottomSheet.ngInjectableDef = i0.defineInjectable({ factory: function MatBottomSheet_Factory() { return new MatBottomSheet(i0.inject(i1.Overlay), i0.inject(i0.INJECTOR), i0.inject(MatBottomSheet, 12), i0.inject(i2.Location, 8)); }, token: MatBottomSheet, providedIn: i3.MatBottomSheetModule });
    return MatBottomSheet;
}());
export { MatBottomSheet };
function MatBottomSheet_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatBottomSheet.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatBottomSheet.ctorParameters;
    /** @type {?} */
    MatBottomSheet.prototype._bottomSheetRefAtThisLevel;
    /** @type {?} */
    MatBottomSheet.prototype._overlay;
    /** @type {?} */
    MatBottomSheet.prototype._injector;
    /** @type {?} */
    MatBottomSheet.prototype._parentBottomSheet;
    /** @type {?} */
    MatBottomSheet.prototype._location;
}
/**
 * Applies default options to the bottom sheet config.
 * @param {?=} config The configuration to which the defaults will be applied.
 * @return {?} The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config) {
    return tslib_1.__assign({}, new MatBottomSheetConfig(), config);
}
//# sourceMappingURL=bottom-sheet.js.map