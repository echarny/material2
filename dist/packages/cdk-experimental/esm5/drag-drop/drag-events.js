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
 * Event emitted when the user starts dragging a draggable.
 * @record
 */
export function CdkDragStart() { }
function CdkDragStart_tsickle_Closure_declarations() {
    /**
     * Draggable that emitted the event.
     * @type {?}
     */
    CdkDragStart.prototype.source;
}
/**
 * Event emitted when the user stops dragging a draggable.
 * @record
 */
export function CdkDragEnd() { }
function CdkDragEnd_tsickle_Closure_declarations() {
    /**
     * Draggable that emitted the event.
     * @type {?}
     */
    CdkDragEnd.prototype.source;
}
/**
 * Event emitted when the user moves an item into a new drop container.
 * @record
 * @template T
 */
export function CdkDragEnter() { }
function CdkDragEnter_tsickle_Closure_declarations() {
    /**
     * Container into which the user has moved the item.
     * @type {?}
     */
    CdkDragEnter.prototype.container;
    /**
     * Item that was removed from the container.
     * @type {?}
     */
    CdkDragEnter.prototype.item;
}
/**
 * Event emitted when the user removes an item from a
 * drop container by moving it into another one.
 * @record
 * @template T
 */
export function CdkDragExit() { }
function CdkDragExit_tsickle_Closure_declarations() {
    /**
     * Container from which the user has a removed an item.
     * @type {?}
     */
    CdkDragExit.prototype.container;
    /**
     * Item that was removed from the container.
     * @type {?}
     */
    CdkDragExit.prototype.item;
}
/**
 * Event emitted when the user drops a draggable item inside a drop container.
 * @record
 * @template T, O
 */
export function CdkDragDrop() { }
function CdkDragDrop_tsickle_Closure_declarations() {
    /**
     * Index of the item when it was picked up.
     * @type {?}
     */
    CdkDragDrop.prototype.previousIndex;
    /**
     * Current index of the item.
     * @type {?}
     */
    CdkDragDrop.prototype.currentIndex;
    /**
     * Item that is being dropped.
     * @type {?}
     */
    CdkDragDrop.prototype.item;
    /**
     * Container in which the item was dropped.
     * @type {?}
     */
    CdkDragDrop.prototype.container;
    /**
     * Container from which the item was picked up. Can be the same as the `container`.
     * @type {?}
     */
    CdkDragDrop.prototype.previousContainer;
}
/**
 * Event emitted as the user is dragging a draggable item.
 * @record
 * @template T
 */
export function CdkDragMove() { }
function CdkDragMove_tsickle_Closure_declarations() {
    /**
     * Item that is being dragged.
     * @type {?}
     */
    CdkDragMove.prototype.source;
    /**
     * Position of the user's pointer on the page.
     * @type {?}
     */
    CdkDragMove.prototype.pointerPosition;
    /**
     * Native event that is causing the dragging.
     * @type {?}
     */
    CdkDragMove.prototype.event;
}
//# sourceMappingURL=drag-events.js.map