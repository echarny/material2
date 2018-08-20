"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
__export(require("./overlay-config"));
__export(require("./position/connected-position"));
__export(require("./scroll/index"));
__export(require("./overlay-module"));
var overlay_1 = require("./overlay");
exports.Overlay = overlay_1.Overlay;
var overlay_container_1 = require("./overlay-container");
exports.OverlayContainer = overlay_container_1.OverlayContainer;
var overlay_directives_1 = require("./overlay-directives");
exports.CdkOverlayOrigin = overlay_directives_1.CdkOverlayOrigin;
exports.CdkConnectedOverlay = overlay_directives_1.CdkConnectedOverlay;
var fullscreen_overlay_container_1 = require("./fullscreen-overlay-container");
exports.FullscreenOverlayContainer = fullscreen_overlay_container_1.FullscreenOverlayContainer;
var overlay_ref_1 = require("./overlay-ref");
exports.OverlayRef = overlay_ref_1.OverlayRef;
var scrolling_1 = require("@angular/cdk/scrolling");
exports.ViewportRuler = scrolling_1.ViewportRuler;
var overlay_keyboard_dispatcher_1 = require("./keyboard/overlay-keyboard-dispatcher");
exports.OverlayKeyboardDispatcher = overlay_keyboard_dispatcher_1.OverlayKeyboardDispatcher;
var overlay_position_builder_1 = require("./position/overlay-position-builder");
exports.OverlayPositionBuilder = overlay_position_builder_1.OverlayPositionBuilder;
var global_position_strategy_1 = require("./position/global-position-strategy");
exports.GlobalPositionStrategy = global_position_strategy_1.GlobalPositionStrategy;
var connected_position_strategy_1 = require("./position/connected-position-strategy");
exports.ConnectedPositionStrategy = connected_position_strategy_1.ConnectedPositionStrategy;
var flexible_connected_position_strategy_1 = require("./position/flexible-connected-position-strategy");
exports.FlexibleConnectedPositionStrategy = flexible_connected_position_strategy_1.FlexibleConnectedPositionStrategy;
var scrolling_2 = require("@angular/cdk/scrolling");
exports.VIEWPORT_RULER_PROVIDER = scrolling_2.VIEWPORT_RULER_PROVIDER;
//# sourceMappingURL=public-api.js.map