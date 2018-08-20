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
import { ListKeyManager } from './list-key-manager';
/**
 * This is the interface for highlightable items (used by the ActiveDescendantKeyManager).
 * Each item must know how to style itself as active or inactive and whether or not it is
 * currently disabled.
 * @record
 */
export function Highlightable() { }
function Highlightable_tsickle_Closure_declarations() {
    /**
     * Applies the styles for an active item to this item.
     * @type {?}
     */
    Highlightable.prototype.setActiveStyles;
    /**
     * Applies the styles for an inactive item to this item.
     * @type {?}
     */
    Highlightable.prototype.setInactiveStyles;
}
/**
 * @template T
 */
var /**
 * @template T
 */
ActiveDescendantKeyManager = /** @class */ (function (_super) {
    tslib_1.__extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    };
    return ActiveDescendantKeyManager;
}(ListKeyManager));
/**
 * @template T
 */
export { ActiveDescendantKeyManager };
//# sourceMappingURL=activedescendant-key-manager.js.map