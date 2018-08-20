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
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var overlay_keyboard_dispatcher_1 = require("./keyboard/overlay-keyboard-dispatcher");
var overlay_1 = require("./overlay");
var overlay_container_1 = require("./overlay-container");
var overlay_directives_1 = require("./overlay-directives");
var overlay_position_builder_1 = require("./position/overlay-position-builder");
var OverlayModule = /** @class */ (function () {
    function OverlayModule() {
    }
    OverlayModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [bidi_1.BidiModule, portal_1.PortalModule, scrolling_1.ScrollingModule],
                    exports: [overlay_directives_1.CdkConnectedOverlay, overlay_directives_1.CdkOverlayOrigin, scrolling_1.ScrollingModule],
                    declarations: [overlay_directives_1.CdkConnectedOverlay, overlay_directives_1.CdkOverlayOrigin],
                    providers: [
                        overlay_1.Overlay,
                        overlay_directives_1.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER,
                    ],
                },] },
    ];
    return OverlayModule;
}());
exports.OverlayModule = OverlayModule;
/**
 * @deprecated Use `OverlayModule` instead.
 * @breaking-change 7.0.0
 */
exports.OVERLAY_PROVIDERS = [
    overlay_1.Overlay,
    overlay_position_builder_1.OverlayPositionBuilder,
    overlay_keyboard_dispatcher_1.OVERLAY_KEYBOARD_DISPATCHER_PROVIDER,
    scrolling_1.VIEWPORT_RULER_PROVIDER,
    overlay_container_1.OVERLAY_CONTAINER_PROVIDER,
    overlay_directives_1.CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER,
];
//# sourceMappingURL=overlay-module.js.map