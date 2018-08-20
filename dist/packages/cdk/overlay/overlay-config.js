"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var noop_scroll_strategy_1 = require("./scroll/noop-scroll-strategy");
/** Initial configuration used when creating an overlay. */
var /** Initial configuration used when creating an overlay. */
OverlayConfig = /** @class */ (function () {
    function OverlayConfig(config) {
        var _this = this;
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = new noop_scroll_strategy_1.NoopScrollStrategy();
        /** Custom class to add to the overlay pane. */
        this.panelClass = '';
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        if (config) {
            Object.keys(config)
                .filter(function (key) { return typeof config[key] !== 'undefined'; })
                .forEach(function (key) { return _this[key] = config[key]; });
        }
    }
    return OverlayConfig;
}());
exports.OverlayConfig = OverlayConfig;
//# sourceMappingURL=overlay-config.js.map