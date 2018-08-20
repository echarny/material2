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
import { InjectionToken } from '@angular/core';
/**
 * The injection token used to specify the virtual scrolling strategy.
 */
export var /** @type {?} */ VIRTUAL_SCROLL_STRATEGY = new InjectionToken('VIRTUAL_SCROLL_STRATEGY');
/**
 * A strategy that dictates which items should be rendered in the viewport.
 * @record
 */
export function VirtualScrollStrategy() { }
function VirtualScrollStrategy_tsickle_Closure_declarations() {
    /**
     * Emits when the index of the first element visible in the viewport changes.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.scrolledIndexChange;
    /**
     * Attaches this scroll strategy to a viewport.
     * \@param viewport The viewport to attach this strategy to.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.attach;
    /**
     * Detaches this scroll strategy from the currently attached viewport.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.detach;
    /**
     * Called when the viewport is scrolled (debounced using requestAnimationFrame).
     * @type {?}
     */
    VirtualScrollStrategy.prototype.onContentScrolled;
    /**
     * Called when the length of the data changes.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.onDataLengthChanged;
    /**
     * Called when the range of items rendered in the DOM has changed.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.onContentRendered;
    /**
     * Called when the offset of the rendered items changed.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.onRenderedOffsetChanged;
    /**
     * Scroll to the offset for the given index.
     * \@param index The index of the element to scroll to.
     * \@param behavior The ScrollBehavior to use when scrolling.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.scrollToIndex;
}
//# sourceMappingURL=virtual-scroll-strategy.js.map