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
/**
 * Describes a strategy that will be used by an overlay to handle scroll events while it is open.
 * @record
 */
export function ScrollStrategy() { }
function ScrollStrategy_tsickle_Closure_declarations() {
    /**
     * Enable this scroll strategy (called when the attached overlay is attached to a portal).
     * @type {?}
     */
    ScrollStrategy.prototype.enable;
    /**
     * Disable this scroll strategy (called when the attached overlay is detached from a portal).
     * @type {?}
     */
    ScrollStrategy.prototype.disable;
    /**
     * Attaches this `ScrollStrategy` to an overlay.
     * @type {?}
     */
    ScrollStrategy.prototype.attach;
}
/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 * @return {?}
 */
export function getMatScrollStrategyAlreadyAttachedError() {
    return Error("Scroll strategy has already been attached.");
}
//# sourceMappingURL=scroll-strategy.js.map