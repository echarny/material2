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
var drag_1 = require("./drag");
var drop_container_1 = require("./drop-container");
var drag_drop_registry_1 = require("./drag-drop-registry");
/** Counter used to generate unique ids for drop zones. */
var _uniqueIdCounter = 0;
/** Container that wraps a set of draggable items. */
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
        /** Direction in which the list is oriented. */
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
        /** Emits when the user drops an item inside the container. */
        this.dropped = new core_1.EventEmitter();
        /**
           * Emits when the user has moved a new drag item into this container.
           */
        this.entered = new core_1.EventEmitter();
        /**
           * Emits when the user removes an item from the container
           * by dragging it into another container.
           */
        this.exited = new core_1.EventEmitter();
        /** Whether an item in the container is being dragged. */
        this._dragging = false;
        /** Cache of the dimensions of all the items and the sibling containers. */
        this._positionCache = {
            items: [],
            siblings: []
        };
    }
    CdkDrop.prototype.ngOnInit = function () {
        this._dragDropRegistry.registerDropContainer(this);
    };
    CdkDrop.prototype.ngOnDestroy = function () {
        this._dragDropRegistry.removeDropContainer(this);
    };
    /** Starts dragging an item. */
    /** Starts dragging an item. */
    CdkDrop.prototype.start = /** Starts dragging an item. */
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
       * @param item Item being dropped into the container.
       * @param currentIndex Index at which the item should be inserted.
       * @param previousContainer Container from which the item got dragged in.
       */
    CdkDrop.prototype.drop = /**
       * Drops an item into this container.
       * @param item Item being dropped into the container.
       * @param currentIndex Index at which the item should be inserted.
       * @param previousContainer Container from which the item got dragged in.
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
       * @param item Item that was moved into the container.
       * @param xOffset Position of the item along the X axis.
       * @param yOffset Position of the item along the Y axis.
       */
    CdkDrop.prototype.enter = /**
       * Emits an event to indicate that the user moved an item into the container.
       * @param item Item that was moved into the container.
       * @param xOffset Position of the item along the X axis.
       * @param yOffset Position of the item along the Y axis.
       */
    function (item, xOffset, yOffset) {
        this.entered.emit({ item: item, container: this });
        this.start();
        // We use the coordinates of where the item entered the drop
        // zone to figure out at which index it should be inserted.
        var newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        var currentIndex = this._activeDraggables.indexOf(item);
        var newPositionReference = this._activeDraggables[newIndex];
        var placeholder = item.getPlaceholderElement();
        // Since the item may be in the `activeDraggables` already (e.g. if the user dragged it
        // into another container and back again), we have to ensure that it isn't duplicated.
        if (currentIndex > -1) {
            this._activeDraggables.splice(currentIndex, 1);
        }
        // Don't use items that are being dragged as a reference, because
        // their element has been moved down to the bottom of the body.
        if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
            var element = newPositionReference.element.nativeElement;
            element.parentElement.insertBefore(placeholder, element);
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
       * @param item Item that was dragged out.
       */
    CdkDrop.prototype.exit = /**
       * Removes an item from the container after it was dragged into another container by the user.
       * @param item Item that was dragged out.
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
       * @param item Item whose index should be determined.
       */
    CdkDrop.prototype.getItemIndex = /**
       * Figures out the index of an item in the container.
       * @param item Item whose index should be determined.
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
       * @param item Item to be sorted.
       * @param xOffset Position of the item along the X axis.
       * @param yOffset Position of the item along the Y axis.
       */
    CdkDrop.prototype._sortItem = /**
       * Sorts an item inside the container based on its position.
       * @param item Item to be sorted.
       * @param xOffset Position of the item along the X axis.
       * @param yOffset Position of the item along the Y axis.
       */
    function (item, xOffset, yOffset) {
        var siblings = this._positionCache.items;
        var isHorizontal = this.orientation === 'horizontal';
        var newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        var placeholder = item.getPlaceholderElement();
        if (newIndex === -1 && siblings.length > 0) {
            return;
        }
        var currentIndex = siblings.findIndex(function (currentItem) { return currentItem.drag === item; });
        var currentPosition = siblings[currentIndex];
        var newPosition = siblings[newIndex];
        // Figure out the offset necessary for the items to be swapped.
        var offset = isHorizontal ?
            currentPosition.clientRect.left - newPosition.clientRect.left :
            currentPosition.clientRect.top - newPosition.clientRect.top;
        var topAdjustment = isHorizontal ? 0 : offset;
        var leftAdjustment = isHorizontal ? offset : 0;
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
       * @param item Drag item that is being moved.
       * @param x Position of the item along the X axis.
       * @param y Position of the item along the Y axis.
       */
    CdkDrop.prototype._getSiblingContainerFromPosition = /**
       * Figures out whether an item should be moved into a sibling
       * drop container, based on its current position.
       * @param item Drag item that is being moved.
       * @param x Position of the item along the X axis.
       * @param y Position of the item along the Y axis.
       */
    function (item, x, y) {
        var result = this._positionCache.siblings.find(function (_a) {
            var clientRect = _a.clientRect;
            var top = clientRect.top, bottom = clientRect.bottom, left = clientRect.left, right = clientRect.right;
            return y >= top && y <= bottom && x >= left && x <= right;
        });
        return result && result.drop.enterPredicate(item, this) ? result.drop : null;
    };
    /** Refreshes the position cache of the items and sibling containers. */
    /** Refreshes the position cache of the items and sibling containers. */
    CdkDrop.prototype._cachePositions = /** Refreshes the position cache of the items and sibling containers. */
    function () {
        var _this = this;
        this._positionCache.items = this._activeDraggables
            .map(function (drag) {
            var elementToMeasure = _this._dragDropRegistry.isDragging(drag) ?
                // If the element is being dragged, we have to measure the
                // placeholder, because the element is hidden.
                drag.getPlaceholderElement() :
                drag.element.nativeElement;
            var clientRect = elementToMeasure.getBoundingClientRect();
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
            .map(function (drop) { return typeof drop === 'string' ? _this._dragDropRegistry.getDropContainer(drop) : drop; })
            .filter(function (drop) { return drop && drop !== _this; })
            .map(function (drop) { return ({ drop: drop, clientRect: drop.element.nativeElement.getBoundingClientRect() }); });
    };
    /** Resets the container to its initial state. */
    /** Resets the container to its initial state. */
    CdkDrop.prototype._reset = /** Resets the container to its initial state. */
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
     * @param clientRect `ClientRect` that should be updated.
     * @param top New value for the `top` position.
     * @param left New value for the `left` position.
     */
    /**
       * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
       * @param clientRect `ClientRect` that should be updated.
       * @param top New value for the `top` position.
       * @param left New value for the `left` position.
       */
    CdkDrop.prototype._adjustClientRect = /**
       * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
       * @param clientRect `ClientRect` that should be updated.
       * @param top New value for the `top` position.
       * @param left New value for the `left` position.
       */
    function (clientRect, top, left) {
        clientRect.top += top;
        clientRect.bottom = clientRect.top + clientRect.height;
        clientRect.left += left;
        clientRect.right = clientRect.left + clientRect.width;
    };
    /**
     * Gets the index of an item in the drop container, based on the position of the user's pointer.
     * @param item Item that is being sorted.
     * @param xOffset Position of the user's pointer along the X axis.
     * @param yOffset Position of the user's pointer along the Y axis.
     */
    /**
       * Gets the index of an item in the drop container, based on the position of the user's pointer.
       * @param item Item that is being sorted.
       * @param xOffset Position of the user's pointer along the X axis.
       * @param yOffset Position of the user's pointer along the Y axis.
       */
    CdkDrop.prototype._getItemIndexFromPointerPosition = /**
       * Gets the index of an item in the drop container, based on the position of the user's pointer.
       * @param item Item that is being sorted.
       * @param xOffset Position of the user's pointer along the X axis.
       * @param yOffset Position of the user's pointer along the Y axis.
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
        { type: core_1.Component, args: [{selector: 'cdk-drop',
                    exportAs: 'cdkDrop',
                    template: '<ng-content></ng-content>',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styles: [".cdk-drag-preview{position:fixed;top:0;left:0;z-index:1000}.cdk-drag,.cdk-drag-handle{touch-action:none;-webkit-user-drag:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                    providers: [
                        { provide: drop_container_1.CDK_DROP_CONTAINER, useExisting: CdkDrop },
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
        { type: core_1.ElementRef, },
        { type: drag_drop_registry_1.DragDropRegistry, },
    ]; };
    CdkDrop.propDecorators = {
        "_draggables": [{ type: core_1.ContentChildren, args: [core_1.forwardRef(function () { return drag_1.CdkDrag; }),] },],
        "connectedTo": [{ type: core_1.Input },],
        "data": [{ type: core_1.Input },],
        "orientation": [{ type: core_1.Input },],
        "id": [{ type: core_1.Input },],
        "lockAxis": [{ type: core_1.Input },],
        "enterPredicate": [{ type: core_1.Input },],
        "dropped": [{ type: core_1.Output },],
        "entered": [{ type: core_1.Output },],
        "exited": [{ type: core_1.Output },],
    };
    return CdkDrop;
}());
exports.CdkDrop = CdkDrop;
//# sourceMappingURL=drop.js.map