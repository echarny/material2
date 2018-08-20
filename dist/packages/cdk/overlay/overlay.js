"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var overlay_keyboard_dispatcher_1 = require("./keyboard/overlay-keyboard-dispatcher");
var overlay_config_1 = require("./overlay-config");
var overlay_container_1 = require("./overlay-container");
var overlay_ref_1 = require("./overlay-ref");
var overlay_position_builder_1 = require("./position/overlay-position-builder");
var index_1 = require("./scroll/index");
/** Next overlay unique ID. */
var nextUniqueId = 0;
// Note that Overlay is *not* scoped to the app root because the ComponentFactoryResolver
// it needs is different based on where OverlayModule is imported.
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
 */
var Overlay = /** @class */ (function () {
    function Overlay(/** Scrolling strategies that can be used when creating an overlay. */
    scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._injector = _injector;
        this._ngZone = _ngZone;
        this._document = _document;
        this._directionality = _directionality;
    }
    /**
     * Creates an overlay.
     * @param config Configuration applied to the overlay.
     * @returns Reference to the created overlay.
     */
    /**
       * Creates an overlay.
       * @param config Configuration applied to the overlay.
       * @returns Reference to the created overlay.
       */
    Overlay.prototype.create = /**
       * Creates an overlay.
       * @param config Configuration applied to the overlay.
       * @returns Reference to the created overlay.
       */
    function (config) {
        var host = this._createHostElement();
        var pane = this._createPaneElement(host);
        var portalOutlet = this._createPortalOutlet(pane);
        var overlayConfig = new overlay_config_1.OverlayConfig(config);
        overlayConfig.direction = overlayConfig.direction || this._directionality.value;
        return new overlay_ref_1.OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document);
    };
    /**
     * Gets a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @returns An overlay position builder.
     */
    /**
       * Gets a position builder that can be used, via fluent API,
       * to construct and configure a position strategy.
       * @returns An overlay position builder.
       */
    Overlay.prototype.position = /**
       * Gets a position builder that can be used, via fluent API,
       * to construct and configure a position strategy.
       * @returns An overlay position builder.
       */
    function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    /**
       * Creates the DOM element for an overlay and appends it to the overlay container.
       * @returns Newly-created pane element
       */
    Overlay.prototype._createPaneElement = /**
       * Creates the DOM element for an overlay and appends it to the overlay container.
       * @returns Newly-created pane element
       */
    function (host) {
        var pane = this._document.createElement('div');
        pane.id = "cdk-overlay-" + nextUniqueId++;
        pane.classList.add('cdk-overlay-pane');
        host.appendChild(pane);
        return pane;
    };
    /**
     * Creates the host element that wraps around an overlay
     * and can be used for advanced positioning.
     * @returns Newly-create host element.
     */
    /**
       * Creates the host element that wraps around an overlay
       * and can be used for advanced positioning.
       * @returns Newly-create host element.
       */
    Overlay.prototype._createHostElement = /**
       * Creates the host element that wraps around an overlay
       * and can be used for advanced positioning.
       * @returns Newly-create host element.
       */
    function () {
        var host = this._document.createElement('div');
        this._overlayContainer.getContainerElement().appendChild(host);
        return host;
    };
    /**
     * Create a DomPortalOutlet into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal outlet.
     * @returns A portal outlet for the given DOM element.
     */
    /**
       * Create a DomPortalOutlet into which the overlay content can be loaded.
       * @param pane The DOM element to turn into a portal outlet.
       * @returns A portal outlet for the given DOM element.
       */
    Overlay.prototype._createPortalOutlet = /**
       * Create a DomPortalOutlet into which the overlay content can be loaded.
       * @param pane The DOM element to turn into a portal outlet.
       * @returns A portal outlet for the given DOM element.
       */
    function (pane) {
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        if (!this._appRef) {
            this._appRef = this._injector.get(core_1.ApplicationRef);
        }
        return new portal_1.DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector);
    };
    Overlay.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Overlay.ctorParameters = function () { return [
        { type: index_1.ScrollStrategyOptions, },
        { type: overlay_container_1.OverlayContainer, },
        { type: core_1.ComponentFactoryResolver, },
        { type: overlay_position_builder_1.OverlayPositionBuilder, },
        { type: overlay_keyboard_dispatcher_1.OverlayKeyboardDispatcher, },
        { type: core_1.Injector, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: bidi_1.Directionality, },
    ]; };
    return Overlay;
}());
exports.Overlay = Overlay;
//# sourceMappingURL=overlay.js.map