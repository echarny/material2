"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var connected_position_strategy_1 = require("./connected-position-strategy");
var flexible_connected_position_strategy_1 = require("./flexible-connected-position-strategy");
var global_position_strategy_1 = require("./global-position-strategy");
var platform_1 = require("@angular/cdk/platform");
var overlay_container_1 = require("../overlay-container");
var i0 = require("@angular/core");
var i1 = require("../../scrolling/viewport-ruler");
var i2 = require("@angular/common");
var i3 = require("../../platform/platform");
var i4 = require("../overlay-container");
/** Builder for overlay position strategy. */
var OverlayPositionBuilder = /** @class */ (function () {
    function OverlayPositionBuilder(_viewportRuler, _document, 
    // @breaking-change 7.0.0 `_platform` and `_overlayContainer` parameters to be made required.
    _platform, _overlayContainer) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
        this._overlayContainer = _overlayContainer;
    }
    /**
     * Creates a global position strategy.
     */
    /**
       * Creates a global position strategy.
       */
    OverlayPositionBuilder.prototype.global = /**
       * Creates a global position strategy.
       */
    function () {
        return new global_position_strategy_1.GlobalPositionStrategy();
    };
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     * @deprecated Use `flexibleConnectedTo` instead.
     * @breaking-change 7.0.0
     */
    /**
       * Creates a relative position strategy.
       * @param elementRef
       * @param originPos
       * @param overlayPos
       * @deprecated Use `flexibleConnectedTo` instead.
       * @breaking-change 7.0.0
       */
    OverlayPositionBuilder.prototype.connectedTo = /**
       * Creates a relative position strategy.
       * @param elementRef
       * @param originPos
       * @param overlayPos
       * @deprecated Use `flexibleConnectedTo` instead.
       * @breaking-change 7.0.0
       */
    function (elementRef, originPos, overlayPos) {
        return new connected_position_strategy_1.ConnectedPositionStrategy(originPos, overlayPos, elementRef, this._viewportRuler, this._document);
    };
    /**
     * Creates a flexible position strategy.
     * @param elementRef
     */
    /**
       * Creates a flexible position strategy.
       * @param elementRef
       */
    OverlayPositionBuilder.prototype.flexibleConnectedTo = /**
       * Creates a flexible position strategy.
       * @param elementRef
       */
    function (elementRef) {
        return new flexible_connected_position_strategy_1.FlexibleConnectedPositionStrategy(elementRef, this._viewportRuler, this._document, this._platform, this._overlayContainer);
    };
    OverlayPositionBuilder.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    OverlayPositionBuilder.ctorParameters = function () { return [
        { type: scrolling_1.ViewportRuler, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: platform_1.Platform, decorators: [{ type: core_1.Optional },] },
        { type: overlay_container_1.OverlayContainer, decorators: [{ type: core_1.Optional },] },
    ]; };
    OverlayPositionBuilder.ngInjectableDef = i0.defineInjectable({ factory: function OverlayPositionBuilder_Factory() { return new OverlayPositionBuilder(i0.inject(i1.ViewportRuler), i0.inject(i2.DOCUMENT), i0.inject(i3.Platform, 8), i0.inject(i4.OverlayContainer, 8)); }, token: OverlayPositionBuilder, providedIn: "root" });
    return OverlayPositionBuilder;
}());
exports.OverlayPositionBuilder = OverlayPositionBuilder;
//# sourceMappingURL=overlay-position-builder.js.map