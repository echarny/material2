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
var overlay_1 = require("@angular/cdk/overlay");
/** Injection token for the Dialog's ScrollStrategy. */
exports.DIALOG_SCROLL_STRATEGY = new core_1.InjectionToken('DialogScrollStrategy');
/** Injection token for the Dialog's Data. */
exports.DIALOG_DATA = new core_1.InjectionToken('DialogData');
/** Injection token for the DialogRef constructor. */
exports.DIALOG_REF = new core_1.InjectionToken('DialogRef');
/** Injection token for the DialogConfig. */
exports.DIALOG_CONFIG = new core_1.InjectionToken('DialogConfig');
/** Injection token for the Dialog's DialogContainer component. */
exports.DIALOG_CONTAINER = new core_1.InjectionToken('DialogContainer');
/** @docs-private */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.block(); };
}
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
/** @docs-private */
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: exports.DIALOG_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=dialog-injectors.js.map