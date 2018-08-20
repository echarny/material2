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
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewEncapsulation, } from '@angular/core';
import { CdkDrag } from './drag';
import { CDK_DROP_CONTAINER } from './drop-container';
import { DragDropRegistry } from './drag-drop-registry';
/**
 * Counter used to generate unique ids for drop zones.
 */
var /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Container that wraps a set of draggable items.
 * @template T
 */
var CdkDrop = /** @class */ (function () {
    function CdkDrop(element, _dragDropRegistry) {
        this.element = element;
        this._dragDropRegistry = _dragDropRegistry;
        /**
         * Other draggable containers that this container is connected to and into which the
         * container's items can be transferred. Can either be references to other drop containers,
         * or their unique IDs.
         */
        this.connectedTo = [];
        /**
         * Direction in which the list is oriented.
         */
        this.orientation = 'vertical';
        /**
         * Unique ID for the drop zone. Can be used as a reference
         * in the `connectedTo` of another `CdkDrop`.
         */
        this.id = "cdk-drop-" + _uniqueIdCounter++;
        /**
         * Function that is used to determine whether an item
         * is allowed to be moved into a drop container.
         */
        this.enterPredicate = function () { return true; };
        /**
         * Emits when the user drops an item inside the container.
         */
        this.dropped = new EventEmitter();
        /**
         * Emits when the user has moved a new drag item into this container.
         */
        this.entered = new EventEmitter();
        /**
         * Emits when the user removes an item from the container
         * by dragging it into another container.
         */
        this.exited = new EventEmitter();
        /**
         * Whether an item in the container is being dragged.
         */
        this._dragging = false;
        /**
         * Cache of the dimensions of all the items and the sibling containers.
         */
        this._positionCache = {
            items: /** @type {?} */ ([]),
            siblings: /** @type {?} */ ([])
        };
    }
    /**
     * @return {?}
     */
    CdkDrop.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._dragDropRegistry.registerDropContainer(this);
    };
    /**
     * @return {?}
     */
    CdkDrop.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._dragDropRegistry.removeDropContainer(this);
    };
    /** Starts dragging an item. */
    /**
     * Starts dragging an item.
     * @return {?}
     */
    CdkDrop.prototype.start = /**
     * Starts dragging an item.
     * @return {?}
     */
    function () {
        this._dragging = true;
        this._activeDraggables = this._draggables.toArray();
        this._cachePositions();
    };
    /**
     * Drops an item into this container.
     * @param item Item being dropped into the container.
     * @param currentIndex Index at which the item should be inserted.
     * @param previousContainer Container from which the item got dragged in.
     */
    /**
     * Drops an item into this container.
     * @param {?} item Item being dropped into the container.
     * @param {?} currentIndex Index at which the item should be inserted.
     * @param {?} previousContainer Container from which the item got dragged in.
     * @return {?}
     */
    CdkDrop.prototype.drop = /**
     * Drops an item into this container.
     * @param {?} item Item being dropped into the container.
     * @param {?} currentIndex Index at which the item should be inserted.
     * @param {?} previousContainer Container from which the item got dragged in.
     * @return {?}
     */
    function (item, currentIndex, previousContainer) {
        this._reset();
        this.dropped.emit({
            item: item,
            currentIndex: currentIndex,
            previousIndex: previousContainer.getItemIndex(item),
            container: this,
            // TODO(crisbeto): reconsider whether to make this null if the containers are the same.
            previousContainer: previousContainer
        });
    };
    /**
     * Emits an event to indicate that the user moved an item into the container.
     * @param item Item that was moved into the container.
     * @param xOffset Position of the item along the X axis.
     * @param yOffset Position of the item along the Y axis.
     */
    /**
     * Emits an event to indicate that the user moved an item into the container.
     * @param {?} item Item that was moved into the container.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    CdkDrop.prototype.enter = /**
     * Emits an event to indicate that the user moved an item into the container.
     * @param {?} item Item that was moved into the container.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    function (item, xOffset, yOffset) {
        this.entered.emit({ item: item, container: this });
        this.start();
        // We use the coordinates of where the item entered the drop
        // zone to figure out at which index it should be inserted.
        var /** @type {?} */ newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        var /** @type {?} */ currentIndex = this._activeDraggables.indexOf(item);
        var /** @type {?} */ newPositionReference = this._activeDraggables[newIndex];
        var /** @type {?} */ placeholder = item.getPlaceholderElement();
        // Since the item may be in the `activeDraggables` already (e.g. if the user dragged it
        // into another container and back again), we have to ensure that it isn't duplicated.
        if (currentIndex > -1) {
            this._activeDraggables.splice(currentIndex, 1);
        }
        // Don't use items that are being dragged as a reference, because
        // their element has been moved down to the bottom of the body.
        if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
            var /** @type {?} */ element = newPositionReference.element.nativeElement; /** @type {?} */
            ((element.parentElement)).insertBefore(placeholder, element);
            this._activeDraggables.splice(newIndex, 0, item);
        }
        else {
            this.element.nativeElement.appendChild(placeholder);
            this._activeDraggables.push(item);
        }
        // The transform needs to be cleared so it doesn't throw off the measurements.
        placeholder.style.transform = '';
        // Note that the positions were already cached when we called `start` above,
        // but we need to refresh them since the amount of items has changed.
        this._cachePositions();
    };
    /**
     * Removes an item from the container after it was dragged into another container by the user.
     * @param item Item that was dragged out.
     */
    /**
     * Removes an item from the container after it was dragged into another container by the user.
     * @param {?} item Item that was dragged out.
     * @return {?}
     */
    CdkDrop.prototype.exit = /**
     * Removes an item from the container after it was dragged into another container by the user.
     * @param {?} item Item that was dragged out.
     * @return {?}
     */
    function (item) {
        this._reset();
        this.exited.emit({ item: item, container: this });
    };
    /**
     * Figures out the index of an item in the container.
     * @param item Item whose index should be determined.
     */
    /**
     * Figures out the index of an item in the container.
     * @param {?} item Item whose index should be determined.
     * @return {?}
     */
    CdkDrop.prototype.getItemIndex = /**
     * Figures out the index of an item in the container.
     * @param {?} item Item whose index should be determined.
     * @return {?}
     */
    function (item) {
        return this._dragging ?
            this._positionCache.items.findIndex(function (currentItem) { return currentItem.drag === item; }) :
            this._draggables.toArray().indexOf(item);
    };
    /**
     * Sorts an item inside the container based on its position.
     * @param item Item to be sorted.
     * @param xOffset Position of the item along the X axis.
     * @param yOffset Position of the item along the Y axis.
     */
    /**
     * Sorts an item inside the container based on its position.
     * @param {?} item Item to be sorted.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    CdkDrop.prototype._sortItem = /**
     * Sorts an item inside the container based on its position.
     * @param {?} item Item to be sorted.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    function (item, xOffset, yOffset) {
        var /** @type {?} */ siblings = this._positionCache.items;
        var /** @type {?} */ isHorizontal = this.orientation === 'horizontal';
        var /** @type {?} */ newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        var /** @type {?} */ placeholder = item.getPlaceholderElement();
        if (newIndex === -1 && siblings.length > 0) {
            return;
        }
        var /** @type {?} */ currentIndex = siblings.findIndex(function (currentItem) { return currentItem.drag === item; });
        var /** @type {?} */ currentPosition = siblings[currentIndex];
        var /** @type {?} */ newPosition = siblings[newIndex];
        // Figure out the offset necessary for the items to be swapped.
        var /** @type {?} */ offset = isHorizontal ?
            currentPosition.clientRect.left - newPosition.clientRect.left :
            currentPosition.clientRect.top - newPosition.clientRect.top;
        var /** @type {?} */ topAdjustment = isHorizontal ? 0 : offset;
        var /** @type {?} */ leftAdjustment = isHorizontal ? offset : 0;
        // Since we've moved the items with a `transform`, we need to adjust their cached
        // client rects to reflect their new position, as well as swap their positions in the cache.
        // Note that we shouldn't use `getBoundingClientRect` here to update the cache, because the
        // elements may be mid-animation which will give us a wrong result.
        this._adjustClientRect(currentPosition.clientRect, -topAdjustment, -leftAdjustment);
        currentPosition.offset -= offset;
        siblings[currentIndex] = newPosition;
        this._adjustClientRect(newPosition.clientRect, topAdjustment, leftAdjustment);
        newPosition.offset += offset;
        siblings[newIndex] = currentPosition;
        // Swap the placeholder's position with the one of the target draggable.
        placeholder.style.transform = isHorizontal ?
            "translate3d(" + currentPosition.offset + "px, 0, 0)" :
            "translate3d(0, " + currentPosition.offset + "px, 0)";
        newPosition.drag.element.nativeElement.style.transform = isHorizontal ?
            "translate3d(" + newPosition.offset + "px, 0, 0)" :
            "translate3d(0, " + newPosition.offset + "px, 0)";
    };
    /**
     * Figures out whether an item should be moved into a sibling
     * drop container, based on its current position.
     * @param item Drag item that is being moved.
     * @param x Position of the item along the X axis.
     * @param y Position of the item along the Y axis.
     */
    /**
     * Figures out whether an item should be moved into a sibling
     * drop container, based on its current position.
     * @param {?} item Drag item that is being moved.
     * @param {?} x Position of the item along the X axis.
     * @param {?} y Position of the item along the Y axis.
     * @return {?}
     */
    CdkDrop.prototype._getSiblingContainerFromPosition = /**
     * Figures out whether an item should be moved into a sibling
     * drop container, based on its current position.
     * @param {?} item Drag item that is being moved.
     * @param {?} x Position of the item along the X axis.
     * @param {?} y Position of the item along the Y axis.
     * @return {?}
     */
    function (item, x, y) {
        var /** @type {?} */ result = this._positionCache.siblings.find(function (_a) {
            var clientRect = _a.clientRect;
            var top = clientRect.top, bottom = clientRect.bottom, left = clientRect.left, right = clientRect.right;
            return y >= top && y <= bottom && x >= left && x <= right;
        });
        return result && result.drop.enterPredicate(item, this) ? result.drop : null;
    };
    /**
     * Refreshes the position cache of the items and sibling containers.
     * @return {?}
     */
    CdkDrop.prototype._cachePositions = /**
     * Refreshes the position cache of the items and sibling containers.
     * @return {?}
     */
    function () {
        var _this = this;
        this._positionCache.items = this._activeDraggables
            .map(function (drag) {
            var /** @type {?} */ elementToMeasure = _this._dragDropRegistry.isDragging(drag) ?
                // If the element is being dragged, we have to measure the
                // placeholder, because the element is hidden.
                drag.getPlaceholderElement() :
                drag.element.nativeElement;
            var /** @type {?} */ clientRect = elementToMeasure.getBoundingClientRect();
            return {
                drag: drag,
                offset: 0,
                // We need to clone the `clientRect` here, because all the values on it are readonly
                // and we need to be able to update them. Also we can't use a spread here, because
                // the values on a `ClientRect` aren't own properties. See:
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Notes
                clientRect: {
                    top: clientRect.top,
                    right: clientRect.right,
                    bottom: clientRect.bottom,
                    left: clientRect.left,
                    width: clientRect.width,
                    height: clientRect.height
                }
            };
        })
            .sort(function (a, b) { return a.clientRect.top - b.clientRect.top; });
        this._positionCache.siblings = this.connectedTo
            .map(function (drop) { return typeof drop === 'string' ? /** @type {?} */ ((_this._dragDropRegistry.getDropContainer(drop))) : drop; })
            .filter(function (drop) { return drop && drop !== _this; })
            .map(function (drop) { return ({ drop: drop, clientRect: drop.element.nativeElement.getBoundingClientRect() }); });
    };
    /**
     * Resets the container to its initial state.
     * @return {?}
     */
    CdkDrop.prototype._reset = /**
     * Resets the container to its initial state.
     * @return {?}
     */
    function () {
        this._dragging = false;
        // TODO(crisbeto): may have to wait for the animations to finish.
        this._activeDraggables.forEach(function (item) { return item.element.nativeElement.style.transform = ''; });
        this._activeDraggables = [];
        this._positionCache.items = [];
        this._positionCache.siblings = [];
    };
    /**
     * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
     * @param {?} clientRect `ClientRect` that should be updated.
     * @param {?} top New value for the `top` position.
     * @param {?} left New value for the `left` position.
     * @return {?}
     */
    CdkDrop.prototype._adjustClientRect = /**
     * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
     * @param {?} clientRect `ClientRect` that should be updated.
     * @param {?} top New value for the `top` position.
     * @param {?} left New value for the `left` position.
     * @return {?}
     */
    function (clientRect, top, left) {
        clientRect.top += top;
        clientRect.bottom = clientRect.top + clientRect.height;
        clientRect.left += left;
        clientRect.right = clientRect.left + clientRect.width;
    };
    /**
     * Gets the index of an item in the drop container, based on the position of the user's pointer.
     * @param {?} item Item that is being sorted.
     * @param {?} xOffset Position of the user's pointer along the X axis.
     * @param {?} yOffset Position of the user's pointer along the Y axis.
     * @return {?}
     */
    CdkDrop.prototype._getItemIndexFromPointerPosition = /**
     * Gets the index of an item in the drop container, based on the position of the user's pointer.
     * @param {?} item Item that is being sorted.
     * @param {?} xOffset Position of the user's pointer along the X axis.
     * @param {?} yOffset Position of the user's pointer along the Y axis.
     * @return {?}
     */
    function (item, xOffset, yOffset) {
        var _this = this;
        return this._positionCache.items.findIndex(function (_a, _, array) {
            var drag = _a.drag, clientRect = _a.clientRect;
            if (drag === item) {
                // If there's only one item left in the container, it must be
                // the dragged item itself so we use it as a reference.
                return array.length < 2;
            }
            return _this.orientation === 'horizontal' ?
                // Round these down since most browsers report client rects with
                // sub-pixel precision, whereas the mouse coordinates are rounded to pixels.
                xOffset >= Math.floor(clientRect.left) && xOffset <= Math.floor(clientRect.right) :
                yOffset >= Math.floor(clientRect.top) && yOffset <= Math.floor(clientRect.bottom);
        });
    };
    CdkDrop.decorators = [
        { type: Component, args: [{selector: 'cdk-drop',
                    exportAs: 'cdkDrop',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".cdk-drag-preview{position:fixed;top:0;left:0;z-index:1000}.cdk-drag,.cdk-drag-handle{touch-action:none;-webkit-user-drag:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                    providers: [
                        { provide: CDK_DROP_CONTAINER, useExisting: CdkDrop },
                    ],
                    host: {
                        'class': 'cdk-drop',
                        '[id]': 'id',
                        '[class.cdk-drop-dragging]': '_dragging'
                    }
                },] },
    ];
    /** @nocollapse */
    CdkDrop.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DragDropRegistry, },
    ]; };
    CdkDrop.propDecorators = {
        "_draggables": [{ type: ContentChildren, args: [forwardRef(function () { return CdkDrag; }),] },],
        "connectedTo": [{ type: Input },],
        "data": [{ type: Input },],
        "orientation": [{ type: Input },],
        "id": [{ type: Input },],
        "lockAxis": [{ type: Input },],
        "enterPredicate": [{ type: Input },],
        "dropped": [{ type: Output },],
        "entered": [{ type: Output },],
        "exited": [{ type: Output },],
    };
    return CdkDrop;
}());
export { CdkDrop };
function CdkDrop_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkDrop.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkDrop.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkDrop.propDecorators;
    /**
     * Draggable items in the container.
     * @type {?}
     */
    CdkDrop.prototype._draggables;
    /**
     * Other draggable containers that this container is connected to and into which the
     * container's items can be transferred. Can either be references to other drop containers,
     * or their unique IDs.
     * @type {?}
     */
    CdkDrop.prototype.connectedTo;
    /**
     * Arbitrary data to attach to this container.
     * @type {?}
     */
    CdkDrop.prototype.data;
    /**
     * Direction in which the list is oriented.
     * @type {?}
     */
    CdkDrop.prototype.orientation;
    /**
     * Unique ID for the drop zone. Can be used as a reference
     * in the `connectedTo` of another `CdkDrop`.
     * @type {?}
     */
    CdkDrop.prototype.id;
    /**
     * Locks the position of the draggable elements inside the container along the specified axis.
     * @type {?}
     */
    CdkDrop.prototype.lockAxis;
    /**
     * Function that is used to determine whether an item
     * is allowed to be moved into a drop container.
     * @type {?}
     */
    CdkDrop.prototype.enterPredicate;
    /**
     * Emits when the user drops an item inside the container.
     * @type {?}
     */
    CdkDrop.prototype.dropped;
    /**
     * Emits when the user has moved a new drag item into this container.
     * @type {?}
     */
    CdkDrop.prototype.entered;
    /**
     * Emits when the user removes an item from the container
     * by dragging it into another container.
     * @type {?}
     */
    CdkDrop.prototype.exited;
    /**
     * Whether an item in the container is being dragged.
     * @type {?}
     */
    CdkDrop.prototype._dragging;
    /**
     * Cache of the dimensions of all the items and the sibling containers.
     * @type {?}
     */
    CdkDrop.prototype._positionCache;
    /**
     * Draggable items that are currently active inside the container. Includes the items
     * from `_draggables`, as well as any items that have been dragged in, but haven't
     * been dropped yet.
     * @type {?}
     */
    CdkDrop.prototype._activeDraggables;
    /** @type {?} */
    CdkDrop.prototype.element;
    /** @type {?} */
    CdkDrop.prototype._dragDropRegistry;
}
//# sourceMappingURL=drop.js.map