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
 * @record
 * @template T
 */
export function CdkDropContainer() { }
function CdkDropContainer_tsickle_Closure_declarations() {
    /**
     * Arbitrary data to attach to all events emitted by this container.
     * @type {?}
     */
    CdkDropContainer.prototype.data;
    /**
     * Unique ID for the drop zone.
     * @type {?}
     */
    CdkDropContainer.prototype.id;
    /**
     * Direction in which the list is oriented.
     * @type {?}
     */
    CdkDropContainer.prototype.orientation;
    /**
     * Locks the position of the draggable elements inside the container along the specified axis.
     * @type {?}
     */
    CdkDropContainer.prototype.lockAxis;
    /**
     * Starts dragging an item.
     * @type {?}
     */
    CdkDropContainer.prototype.start;
    /**
     * Drops an item into this container.
     * \@param item Item being dropped into the container.
     * \@param currentIndex Index at which the item should be inserted.
     * \@param previousContainer Container from which the item got dragged in.
     * @type {?}
     */
    CdkDropContainer.prototype.drop;
    /**
     * Emits an event to indicate that the user moved an item into the container.
     * \@param item Item that was moved into the container.
     * \@param xOffset Position of the item along the X axis.
     * \@param yOffset Position of the item along the Y axis.
     * @type {?}
     */
    CdkDropContainer.prototype.enter;
    /**
     * Removes an item from the container after it was dragged into another container by the user.
     * \@param item Item that was dragged out.
     * @type {?}
     */
    CdkDropContainer.prototype.exit;
    /**
     * Figures out the index of an item in the container.
     * \@param item Item whose index should be determined.
     * @type {?}
     */
    CdkDropContainer.prototype.getItemIndex;
    /** @type {?} */
    CdkDropContainer.prototype._sortItem;
    /** @type {?} */
    CdkDropContainer.prototype._draggables;
    /** @type {?} */
    CdkDropContainer.prototype._getSiblingContainerFromPosition;
}
/**
 * Injection token that is used to provide a CdkDrop instance to CdkDrag.
 * Used for avoiding circular imports.
 */
export var /** @type {?} */ CDK_DROP_CONTAINER = new InjectionToken('CDK_DROP_CONTAINER');
//# sourceMappingURL=drop-container.js.map