"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var bottom_sheet_config_1 = require("./bottom-sheet-config");
var bottom_sheet_container_1 = require("./bottom-sheet-container");
var bottom_sheet_module_1 = require("./bottom-sheet-module");
var bottom_sheet_ref_1 = require("./bottom-sheet-ref");
var i0 = require("@angular/core");
var i1 = require("@angular/cdk/overlay");
var i2 = require("@angular/common");
var i3 = require("./bottom-sheet-module");
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
        get: /** Reference to the currently opened bottom sheet. */
        function () {
            var parent = this._parentBottomSheet;
            return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
        },
        set: function (value) {
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
    MatBottomSheet.prototype.open = function (componentOrTemplateRef, config) {
        var _this = this;
        var _config = _applyConfigDefaults(config);
        var overlayRef = this._createOverlay(_config);
        var container = this._attachContainer(overlayRef, _config);
        var ref = new bottom_sheet_ref_1.MatBottomSheetRef(container, overlayRef, this._location);
        if (componentOrTemplateRef instanceof core_1.TemplateRef) {
            container.attachTemplatePortal(new portal_1.TemplatePortal(componentOrTemplateRef, (null), {
                $implicit: _config.data,
                bottomSheetRef: ref
            }));
        }
        else {
            var portal = new portal_1.ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(_config, ref));
            var contentRef = container.attachComponentPortal(portal);
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
       */
    MatBottomSheet.prototype.dismiss = /**
       * Dismisses the currently-visible bottom sheet.
       */
    function () {
        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.dismiss();
        }
    };
    /**
     * Attaches the bottom sheet container component to the overlay.
     */
    /**
       * Attaches the bottom sheet container component to the overlay.
       */
    MatBottomSheet.prototype._attachContainer = /**
       * Attaches the bottom sheet container component to the overlay.
       */
    function (overlayRef, config) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new portal_1.PortalInjector(userInjector || this._injector, new WeakMap([
            [bottom_sheet_config_1.MatBottomSheetConfig, config]
        ]));
        var containerPortal = new portal_1.ComponentPortal(bottom_sheet_container_1.MatBottomSheetContainer, config.viewContainerRef, injector);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified bottom sheet config.
     */
    /**
       * Creates a new overlay and places it in the correct location.
       * @param config The user-specified bottom sheet config.
       */
    MatBottomSheet.prototype._createOverlay = /**
       * Creates a new overlay and places it in the correct location.
       * @param config The user-specified bottom sheet config.
       */
    function (config) {
        var overlayConfig = new overlay_1.OverlayConfig({
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
     * @param config Config that was used to create the bottom sheet.
     * @param bottomSheetRef Reference to the bottom sheet.
     */
    /**
       * Creates an injector to be used inside of a bottom sheet component.
       * @param config Config that was used to create the bottom sheet.
       * @param bottomSheetRef Reference to the bottom sheet.
       */
    MatBottomSheet.prototype._createInjector = /**
       * Creates an injector to be used inside of a bottom sheet component.
       * @param config Config that was used to create the bottom sheet.
       * @param bottomSheetRef Reference to the bottom sheet.
       */
    function (config, bottomSheetRef) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injectionTokens = new WeakMap([
            [bottom_sheet_ref_1.MatBottomSheetRef, bottomSheetRef],
            [bottom_sheet_config_1.MAT_BOTTOM_SHEET_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(bidi_1.Directionality, null))) {
            injectionTokens.set(bidi_1.Directionality, {
                value: config.direction,
                change: rxjs_1.of()
            });
        }
        return new portal_1.PortalInjector(userInjector || this._injector, injectionTokens);
    };
    MatBottomSheet.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: bottom_sheet_module_1.MatBottomSheetModule },] },
    ];
    /** @nocollapse */
    MatBottomSheet.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.Injector, },
        { type: MatBottomSheet, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: common_1.Location, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatBottomSheet.ngInjectableDef = i0.defineInjectable({ factory: function MatBottomSheet_Factory() { return new MatBottomSheet(i0.inject(i1.Overlay), i0.inject(i0.INJECTOR), i0.inject(MatBottomSheet, 12), i0.inject(i2.Location, 8)); }, token: MatBottomSheet, providedIn: i3.MatBottomSheetModule });
    return MatBottomSheet;
}());
exports.MatBottomSheet = MatBottomSheet;
/**
 * Applies default options to the bottom sheet config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config) {
    return __assign({}, new bottom_sheet_config_1.MatBottomSheetConfig(), config);
}
//# sourceMappingURL=bottom-sheet.js.map