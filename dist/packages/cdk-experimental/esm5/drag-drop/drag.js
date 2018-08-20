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
import { ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, QueryList, SkipSelf, ViewContainerRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { CdkDragHandle } from './drag-handle';
import { CDK_DROP_CONTAINER } from './drop-container';
import { CdkDragPreview } from './drag-preview';
import { CdkDragPlaceholder } from './drag-placeholder';
import { ViewportRuler } from '@angular/cdk/overlay';
import { DragDropRegistry } from './drag-drop-registry';
import { Subject, merge, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Element that can be moved inside a CdkDrop container.
 * @template T
 */
var CdkDrag = /** @class */ (function () {
    function CdkDrag(element, /** Droppable container that the draggable is a part of. */
    dropContainer, document, _ngZone, _viewContainerRef, _viewportRuler, _dragDropRegistry, _dir) {
        var _this = this;
        this.element = element;
        this.dropContainer = dropContainer;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
        this._dir = _dir;
        this._destroyed = new Subject();
        /**
         * CSS `transform` applied to the element when it isn't being dragged. We need a
         * passive transform in order for the dragged element to retain its new position
         * after the user has stopped dragging and because we need to know the relative
         * position in case they start dragging again. This corresponds to `element.style.transform`.
         */
        this._passiveTransform = { x: 0, y: 0 };
        /**
         * CSS `transform` that is applied to the element while it's being dragged.
         */
        this._activeTransform = { x: 0, y: 0 };
        /**
         * Whether the element has moved since the user started dragging it.
         */
        this._hasMoved = false;
        /**
         * Emits when the item is being moved.
         */
        this._moveEvents = new Subject();
        /**
         * Amount of subscriptions to the move event. Used to avoid
         * hitting the zone if the consumer didn't subscribe to it.
         */
        this._moveEventSubscriptions = 0;
        /**
         * Emits when the user starts dragging the item.
         */
        this.started = new EventEmitter();
        /**
         * Emits when the user stops dragging an item in the container.
         */
        this.ended = new EventEmitter();
        /**
         * Emits when the user has moved the item into a new container.
         */
        this.entered = new EventEmitter();
        /**
         * Emits when the user removes the item its container by dragging it into another container.
         */
        this.exited = new EventEmitter();
        /**
         * Emits when the user drops the item inside a container.
         */
        this.dropped = new EventEmitter();
        /**
         * Emits as the user is dragging the item. Use with caution,
         * because this event will fire for every pixel that the user has dragged.
         */
        this.moved = Observable.create(function (observer) {
            var /** @type {?} */ subscription = _this._moveEvents.subscribe(observer);
            _this._moveEventSubscriptions++;
            return function () {
                subscription.unsubscribe();
                _this._moveEventSubscriptions--;
            };
        });
        /**
         * Handler for when the pointer is pressed down on the element or the handle.
         */
        this._pointerDown = function (referenceElement, event) {
            if (_this._dragDropRegistry.isDragging(_this)) {
                return;
            }
            var /** @type {?} */ endedOrDestroyed = merge(_this.ended, _this._destroyed);
            _this._dragDropRegistry.pointerMove
                .pipe(takeUntil(endedOrDestroyed))
                .subscribe(_this._pointerMove);
            _this._dragDropRegistry.pointerUp
                .pipe(takeUntil(endedOrDestroyed))
                .subscribe(_this._pointerUp);
            _this._dragDropRegistry.startDragging(_this, event);
            _this._initialContainer = _this.dropContainer;
            _this._scrollPosition = _this._viewportRuler.getViewportScrollPosition();
            // If we have a custom preview template, the element won't be visible anyway so we avoid the
            // extra `getBoundingClientRect` calls and just move the preview next to the cursor.
            // If we have a custom preview template, the element won't be visible anyway so we avoid the
            // extra `getBoundingClientRect` calls and just move the preview next to the cursor.
            _this._pickupPositionInElement = _this._previewTemplate ? { x: 0, y: 0 } :
                _this._getPointerPositionInElement(referenceElement, event);
            _this._pickupPositionOnPage = _this._getPointerPositionOnPage(event);
            // Emit the event on the item before the one on the container.
            // Emit the event on the item before the one on the container.
            _this.started.emit({ source: _this });
            if (_this.dropContainer) {
                var /** @type {?} */ element = _this.element.nativeElement;
                var /** @type {?} */ preview = _this._preview = _this._createPreviewElement();
                var /** @type {?} */ placeholder = _this._placeholder = _this._createPlaceholderElement();
                // We move the element out at the end of the body and we make it hidden, because keeping it in
                // place will throw off the consumer's `:last-child` selectors. We can't remove the element
                // from the DOM completely, because iOS will stop firing all subsequent events in the chain.
                element.style.display = 'none';
                _this._nextSibling = element.nextSibling;
                _this._document.body.appendChild(/** @type {?} */ ((element.parentNode)).replaceChild(placeholder, element));
                _this._document.body.appendChild(preview);
                _this.dropContainer.start();
            }
        };
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         */
        this._pointerMove = function (event) {
            // TODO(crisbeto): this should start dragging after a certain threshold,
            // otherwise we risk interfering with clicks on the element.
            if (!_this._dragDropRegistry.isDragging(_this)) {
                return;
            }
            _this._hasMoved = true;
            event.preventDefault();
            var /** @type {?} */ pointerPosition = _this._getConstrainedPointerPosition(event);
            if (_this.dropContainer) {
                _this._updateActiveDropContainer(pointerPosition);
            }
            else {
                var /** @type {?} */ activeTransform = _this._activeTransform;
                activeTransform.x =
                    pointerPosition.x - _this._pickupPositionOnPage.x + _this._passiveTransform.x;
                activeTransform.y =
                    pointerPosition.y - _this._pickupPositionOnPage.y + _this._passiveTransform.y;
                _this._setTransform(_this.element.nativeElement, activeTransform.x, activeTransform.y);
            }
            // Since this event gets fired for every pixel while dragging, we only
            // want to fire it if the consumer opted into it. Also we have to
            // re-enter the zone becaus we run all of the events on the outside.
            if (_this._moveEventSubscriptions > 0) {
                _this._ngZone.run(function () {
                    _this._moveEvents.next({
                        source: _this,
                        pointerPosition: pointerPosition,
                        event: event
                    });
                });
            }
        };
        /**
         * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
         */
        this._pointerUp = function () {
            if (!_this._dragDropRegistry.isDragging(_this)) {
                return;
            }
            _this._dragDropRegistry.stopDragging(_this);
            if (!_this.dropContainer) {
                // Convert the active transform into a passive one. This means that next time
                // the user starts dragging the item, its position will be calculated relatively
                // to the new passive transform.
                // Convert the active transform into a passive one. This means that next time
                // the user starts dragging the item, its position will be calculated relatively
                // to the new passive transform.
                _this._passiveTransform.x = _this._activeTransform.x;
                _this._passiveTransform.y = _this._activeTransform.y;
                _this._ngZone.run(function () { return _this.ended.emit({ source: _this }); });
                return;
            }
            _this._animatePreviewToPlaceholder().then(function () { return _this._cleanupDragArtifacts(); });
        };
        this._document = document;
        _dragDropRegistry.registerDragItem(this);
    }
    /**
     * Returns the element that is being used as a placeholder
     * while the current element is being dragged.
     */
    /**
     * Returns the element that is being used as a placeholder
     * while the current element is being dragged.
     * @return {?}
     */
    CdkDrag.prototype.getPlaceholderElement = /**
     * Returns the element that is being used as a placeholder
     * while the current element is being dragged.
     * @return {?}
     */
    function () {
        return this._placeholder;
    };
    /**
     * @return {?}
     */
    CdkDrag.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyPreview();
        this._destroyPlaceholder();
        // Do this check before removing from the registry since it'll
        // stop being considered as dragged once it is removed.
        if (this._dragDropRegistry.isDragging(this)) {
            // Since we move out the element to the end of the body while it's being
            // dragged, we have to make sure that it's removed if it gets destroyed.
            this._removeElement(this.element.nativeElement);
        }
        this._nextSibling = null;
        this._dragDropRegistry.removeDragItem(this);
        this._moveEvents.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Starts the dragging sequence. */
    /**
     * Starts the dragging sequence.
     * @param {?} event
     * @return {?}
     */
    CdkDrag.prototype._startDragging = /**
     * Starts the dragging sequence.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Delegate the event based on whether it started from a handle or the element itself.
        if (this._handles.length) {
            var /** @type {?} */ targetHandle = this._handles.find(function (handle) {
                var /** @type {?} */ element = handle.element.nativeElement;
                var /** @type {?} */ target = event.target;
                return !!target && (target === element || element.contains(/** @type {?} */ (target)));
            });
            if (targetHandle) {
                this._pointerDown(targetHandle.element, event);
            }
        }
        else {
            this._pointerDown(this.element, event);
        }
    };
    /**
     * Cleans up the DOM artifacts that were added to facilitate the element being dragged.
     * @return {?}
     */
    CdkDrag.prototype._cleanupDragArtifacts = /**
     * Cleans up the DOM artifacts that were added to facilitate the element being dragged.
     * @return {?}
     */
    function () {
        var _this = this;
        // Restore the element's visibility and insert it at its old position in the DOM.
        // It's important that we maintain the position, because moving the element around in the DOM
        // can throw off `NgFor` which does smart diffing and re-creates elements only when necessary,
        // while moving the existing elements in all other cases.
        this.element.nativeElement.style.display = '';
        if (this._nextSibling) {
            /** @type {?} */ ((this._nextSibling.parentNode)).insertBefore(this.element.nativeElement, this._nextSibling);
        }
        else {
            /** @type {?} */ ((this._placeholder.parentNode)).appendChild(this.element.nativeElement);
        }
        this._destroyPreview();
        this._destroyPlaceholder();
        // Re-enter the NgZone since we bound `document` events on the outside.
        this._ngZone.run(function () {
            var /** @type {?} */ currentIndex = _this.dropContainer.getItemIndex(_this);
            _this.ended.emit({ source: _this });
            _this.dropped.emit({
                item: _this,
                currentIndex: currentIndex,
                previousIndex: _this._initialContainer.getItemIndex(_this),
                container: _this.dropContainer,
                previousContainer: _this._initialContainer
            });
            _this.dropContainer.drop(_this, currentIndex, _this._initialContainer);
        });
    };
    /**
     * Updates the item's position in its drop container, or moves it
     * into a new one, depending on its current drag position.
     * @param {?} __0
     * @return {?}
     */
    CdkDrag.prototype._updateActiveDropContainer = /**
     * Updates the item's position in its drop container, or moves it
     * into a new one, depending on its current drag position.
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var x = _a.x, y = _a.y;
        // Drop container that draggable has been moved into.
        var /** @type {?} */ newContainer = this.dropContainer._getSiblingContainerFromPosition(this, x, y);
        if (newContainer) {
            this._ngZone.run(function () {
                // Notify the old container that the item has left.
                // Notify the old container that the item has left.
                _this.exited.emit({ item: _this, container: _this.dropContainer });
                _this.dropContainer.exit(_this);
                // Notify the new container that the item has entered.
                // Notify the new container that the item has entered.
                _this.entered.emit({ item: _this, container: newContainer });
                _this.dropContainer = newContainer;
                _this.dropContainer.enter(_this, x, y);
            });
        }
        this.dropContainer._sortItem(this, x, y);
        this._setTransform(this._preview, x - this._pickupPositionInElement.x, y - this._pickupPositionInElement.y);
    };
    /**
     * Creates the element that will be rendered next to the user's pointer
     * and will be used as a preview of the element that is being dragged.
     * @return {?}
     */
    CdkDrag.prototype._createPreviewElement = /**
     * Creates the element that will be rendered next to the user's pointer
     * and will be used as a preview of the element that is being dragged.
     * @return {?}
     */
    function () {
        var /** @type {?} */ preview;
        if (this._previewTemplate) {
            var /** @type {?} */ viewRef = this._viewContainerRef.createEmbeddedView(this._previewTemplate.templateRef, this._previewTemplate.data);
            preview = viewRef.rootNodes[0];
            this._previewRef = viewRef;
            this._setTransform(preview, this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
        }
        else {
            var /** @type {?} */ element = this.element.nativeElement;
            var /** @type {?} */ elementRect = element.getBoundingClientRect();
            preview = /** @type {?} */ (element.cloneNode(true));
            preview.style.width = elementRect.width + "px";
            preview.style.height = elementRect.height + "px";
            this._setTransform(preview, elementRect.left, elementRect.top);
        }
        preview.classList.add('cdk-drag-preview');
        preview.setAttribute('dir', this._dir ? this._dir.value : 'ltr');
        return preview;
    };
    /**
     * Creates an element that will be shown instead of the current element while dragging.
     * @return {?}
     */
    CdkDrag.prototype._createPlaceholderElement = /**
     * Creates an element that will be shown instead of the current element while dragging.
     * @return {?}
     */
    function () {
        var /** @type {?} */ placeholder;
        if (this._placeholderTemplate) {
            this._placeholderRef = this._viewContainerRef.createEmbeddedView(this._placeholderTemplate.templateRef, this._placeholderTemplate.data);
            placeholder = this._placeholderRef.rootNodes[0];
        }
        else {
            placeholder = /** @type {?} */ (this.element.nativeElement.cloneNode(true));
        }
        placeholder.classList.add('cdk-drag-placeholder');
        return placeholder;
    };
    /**
     * Figures out the coordinates at which an element was picked up.
     * @param {?} referenceElement Element that initiated the dragging.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    CdkDrag.prototype._getPointerPositionInElement = /**
     * Figures out the coordinates at which an element was picked up.
     * @param {?} referenceElement Element that initiated the dragging.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    function (referenceElement, event) {
        var /** @type {?} */ elementRect = this.element.nativeElement.getBoundingClientRect();
        var /** @type {?} */ handleElement = referenceElement === this.element ? null : referenceElement.nativeElement;
        var /** @type {?} */ referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
        var /** @type {?} */ x = this._isTouchEvent(event) ?
            event.targetTouches[0].pageX - referenceRect.left - this._scrollPosition.left :
            event.offsetX;
        var /** @type {?} */ y = this._isTouchEvent(event) ?
            event.targetTouches[0].pageY - referenceRect.top - this._scrollPosition.top :
            event.offsetY;
        return {
            x: referenceRect.left - elementRect.left + x,
            y: referenceRect.top - elementRect.top + y
        };
    };
    /**
     * Animates the preview element from its current position to the location of the drop placeholder.
     * @return {?} Promise that resolves when the animation completes.
     */
    CdkDrag.prototype._animatePreviewToPlaceholder = /**
     * Animates the preview element from its current position to the location of the drop placeholder.
     * @return {?} Promise that resolves when the animation completes.
     */
    function () {
        var _this = this;
        // If the user hasn't moved yet, the transitionend event won't fire.
        if (!this._hasMoved) {
            return Promise.resolve();
        }
        var /** @type {?} */ placeholderRect = this._placeholder.getBoundingClientRect();
        // Apply the class that adds a transition to the preview.
        this._preview.classList.add('cdk-drag-animating');
        // Move the preview to the placeholder position.
        this._setTransform(this._preview, placeholderRect.left, placeholderRect.top);
        // If the element doesn't have a `transition`, the `transitionend` event won't fire. Since
        // we need to trigger a style recalculation in order for the `cdk-drag-animating` class to
        // apply its style, we take advantage of the available info to figure out whether we need to
        // bind the event in the first place.
        var /** @type {?} */ duration = getTransitionDurationInMs(this._preview);
        if (duration === 0) {
            return Promise.resolve();
        }
        return this._ngZone.runOutsideAngular(function () {
            return new Promise(function (resolve) {
                var /** @type {?} */ handler = function (event) {
                    if (!event || event.target === _this._preview) {
                        _this._preview.removeEventListener('transitionend', handler);
                        resolve();
                        clearTimeout(timeout);
                    }
                };
                // If a transition is short enough, the browser might not fire the `transitionend` event.
                // Since we know how long it's supposed to take, add a timeout with a 50% buffer that'll
                // fire if the transition hasn't completed when it was supposed to.
                var /** @type {?} */ timeout = setTimeout(handler, duration * 1.5);
                _this._preview.addEventListener('transitionend', handler);
            });
        });
    };
    /**
     * Sets the `transform` style on an element.
     * @param {?} element Element on which to set the transform.
     * @param {?} x Desired position of the element along the X axis.
     * @param {?} y Desired position of the element along the Y axis.
     * @return {?}
     */
    CdkDrag.prototype._setTransform = /**
     * Sets the `transform` style on an element.
     * @param {?} element Element on which to set the transform.
     * @param {?} x Desired position of the element along the X axis.
     * @param {?} y Desired position of the element along the Y axis.
     * @return {?}
     */
    function (element, x, y) {
        element.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    };
    /**
     * Helper to remove an element from the DOM and to do all the necessary null checks.
     * @param {?} element Element to be removed.
     * @return {?}
     */
    CdkDrag.prototype._removeElement = /**
     * Helper to remove an element from the DOM and to do all the necessary null checks.
     * @param {?} element Element to be removed.
     * @return {?}
     */
    function (element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    /**
     * Determines the point of the page that was touched by the user.
     * @param {?} event
     * @return {?}
     */
    CdkDrag.prototype._getPointerPositionOnPage = /**
     * Determines the point of the page that was touched by the user.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    };
    /**
     * Gets the pointer position on the page, accounting for any position constraints.
     * @param {?} event
     * @return {?}
     */
    CdkDrag.prototype._getConstrainedPointerPosition = /**
     * Gets the pointer position on the page, accounting for any position constraints.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ point = this._getPointerPositionOnPage(event);
        var /** @type {?} */ dropContainerLock = this.dropContainer ? this.dropContainer.lockAxis : null;
        if (this.lockAxis === 'x' || dropContainerLock === 'x') {
            point.y = this._pickupPositionOnPage.y;
        }
        else if (this.lockAxis === 'y' || dropContainerLock === 'y') {
            point.x = this._pickupPositionOnPage.x;
        }
        return point;
    };
    /**
     * Determines whether an event is a touch event.
     * @param {?} event
     * @return {?}
     */
    CdkDrag.prototype._isTouchEvent = /**
     * Determines whether an event is a touch event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.type.startsWith('touch');
    };
    /**
     * Destroys the preview element and its ViewRef.
     * @return {?}
     */
    CdkDrag.prototype._destroyPreview = /**
     * Destroys the preview element and its ViewRef.
     * @return {?}
     */
    function () {
        if (this._preview) {
            this._removeElement(this._preview);
        }
        if (this._previewRef) {
            this._previewRef.destroy();
        }
        this._preview = this._previewRef = /** @type {?} */ ((null));
    };
    /**
     * Destroys the placeholder element and its ViewRef.
     * @return {?}
     */
    CdkDrag.prototype._destroyPlaceholder = /**
     * Destroys the placeholder element and its ViewRef.
     * @return {?}
     */
    function () {
        if (this._placeholder) {
            this._removeElement(this._placeholder);
        }
        if (this._placeholderRef) {
            this._placeholderRef.destroy();
        }
        this._placeholder = this._placeholderRef = /** @type {?} */ ((null));
    };
    CdkDrag.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkDrag]',
                    exportAs: 'cdkDrag',
                    host: {
                        'class': 'cdk-drag',
                        '(mousedown)': '_startDragging($event)',
                        '(touchstart)': '_startDragging($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkDrag.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_DROP_CONTAINER,] }, { type: Optional }, { type: SkipSelf },] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: NgZone, },
        { type: ViewContainerRef, },
        { type: ViewportRuler, },
        { type: DragDropRegistry, },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    CdkDrag.propDecorators = {
        "_handles": [{ type: ContentChildren, args: [CdkDragHandle,] },],
        "_previewTemplate": [{ type: ContentChild, args: [CdkDragPreview,] },],
        "_placeholderTemplate": [{ type: ContentChild, args: [CdkDragPlaceholder,] },],
        "data": [{ type: Input, args: ['cdkDragData',] },],
        "lockAxis": [{ type: Input, args: ['cdkDragLockAxis',] },],
        "started": [{ type: Output, args: ['cdkDragStarted',] },],
        "ended": [{ type: Output, args: ['cdkDragEnded',] },],
        "entered": [{ type: Output, args: ['cdkDragEntered',] },],
        "exited": [{ type: Output, args: ['cdkDragExited',] },],
        "dropped": [{ type: Output, args: ['cdkDragDropped',] },],
        "moved": [{ type: Output, args: ['cdkDragMoved',] },],
    };
    return CdkDrag;
}());
export { CdkDrag };
function CdkDrag_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkDrag.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkDrag.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkDrag.propDecorators;
    /** @type {?} */
    CdkDrag.prototype._document;
    /** @type {?} */
    CdkDrag.prototype._destroyed;
    /**
     * Element displayed next to the user's pointer while the element is dragged.
     * @type {?}
     */
    CdkDrag.prototype._preview;
    /**
     * Reference to the view of the preview element.
     * @type {?}
     */
    CdkDrag.prototype._previewRef;
    /**
     * Reference to the view of the placeholder element.
     * @type {?}
     */
    CdkDrag.prototype._placeholderRef;
    /**
     * Element that is rendered instead of the draggable item while it is being sorted.
     * @type {?}
     */
    CdkDrag.prototype._placeholder;
    /**
     * Coordinates within the element at which the user picked up the element.
     * @type {?}
     */
    CdkDrag.prototype._pickupPositionInElement;
    /**
     * Coordinates on the page at which the user picked up the element.
     * @type {?}
     */
    CdkDrag.prototype._pickupPositionOnPage;
    /**
     * Reference to the element that comes after the draggable in the DOM, at the time
     * it was picked up. Used for restoring its initial position when it's dropped.
     * @type {?}
     */
    CdkDrag.prototype._nextSibling;
    /**
     * CSS `transform` applied to the element when it isn't being dragged. We need a
     * passive transform in order for the dragged element to retain its new position
     * after the user has stopped dragging and because we need to know the relative
     * position in case they start dragging again. This corresponds to `element.style.transform`.
     * @type {?}
     */
    CdkDrag.prototype._passiveTransform;
    /**
     * CSS `transform` that is applied to the element while it's being dragged.
     * @type {?}
     */
    CdkDrag.prototype._activeTransform;
    /**
     * Whether the element has moved since the user started dragging it.
     * @type {?}
     */
    CdkDrag.prototype._hasMoved;
    /**
     * Drop container in which the CdkDrag resided when dragging began.
     * @type {?}
     */
    CdkDrag.prototype._initialContainer;
    /**
     * Cached scroll position on the page when the element was picked up.
     * @type {?}
     */
    CdkDrag.prototype._scrollPosition;
    /**
     * Emits when the item is being moved.
     * @type {?}
     */
    CdkDrag.prototype._moveEvents;
    /**
     * Amount of subscriptions to the move event. Used to avoid
     * hitting the zone if the consumer didn't subscribe to it.
     * @type {?}
     */
    CdkDrag.prototype._moveEventSubscriptions;
    /**
     * Elements that can be used to drag the draggable item.
     * @type {?}
     */
    CdkDrag.prototype._handles;
    /**
     * Element that will be used as a template to create the draggable item's preview.
     * @type {?}
     */
    CdkDrag.prototype._previewTemplate;
    /**
     * Template for placeholder element rendered to show where a draggable would be dropped.
     * @type {?}
     */
    CdkDrag.prototype._placeholderTemplate;
    /**
     * Arbitrary data to attach to this drag instance.
     * @type {?}
     */
    CdkDrag.prototype.data;
    /**
     * Locks the position of the dragged element along the specified axis.
     * @type {?}
     */
    CdkDrag.prototype.lockAxis;
    /**
     * Emits when the user starts dragging the item.
     * @type {?}
     */
    CdkDrag.prototype.started;
    /**
     * Emits when the user stops dragging an item in the container.
     * @type {?}
     */
    CdkDrag.prototype.ended;
    /**
     * Emits when the user has moved the item into a new container.
     * @type {?}
     */
    CdkDrag.prototype.entered;
    /**
     * Emits when the user removes the item its container by dragging it into another container.
     * @type {?}
     */
    CdkDrag.prototype.exited;
    /**
     * Emits when the user drops the item inside a container.
     * @type {?}
     */
    CdkDrag.prototype.dropped;
    /**
     * Emits as the user is dragging the item. Use with caution,
     * because this event will fire for every pixel that the user has dragged.
     * @type {?}
     */
    CdkDrag.prototype.moved;
    /**
     * Handler for when the pointer is pressed down on the element or the handle.
     * @type {?}
     */
    CdkDrag.prototype._pointerDown;
    /**
     * Handler that is invoked when the user moves their pointer after they've initiated a drag.
     * @type {?}
     */
    CdkDrag.prototype._pointerMove;
    /**
     * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
     * @type {?}
     */
    CdkDrag.prototype._pointerUp;
    /**
     * Element that the draggable is attached to.
     * @type {?}
     */
    CdkDrag.prototype.element;
    /**
     * Droppable container that the draggable is a part of.
     * @type {?}
     */
    CdkDrag.prototype.dropContainer;
    /** @type {?} */
    CdkDrag.prototype._ngZone;
    /** @type {?} */
    CdkDrag.prototype._viewContainerRef;
    /** @type {?} */
    CdkDrag.prototype._viewportRuler;
    /** @type {?} */
    CdkDrag.prototype._dragDropRegistry;
    /** @type {?} */
    CdkDrag.prototype._dir;
}
/**
 * Parses a CSS time value to milliseconds.
 * @param {?} value
 * @return {?}
 */
function parseCssTimeUnitsToMs(value) {
    // Some browsers will return it in seconds, whereas others will return milliseconds.
    var /** @type {?} */ multiplier = value.toLowerCase().indexOf('ms') > -1 ? 1 : 1000;
    return parseFloat(value) * multiplier;
}
/**
 * Gets the transition duration, including the delay, of an element in milliseconds.
 * @param {?} element
 * @return {?}
 */
function getTransitionDurationInMs(element) {
    var /** @type {?} */ computedStyle = getComputedStyle(element);
    var /** @type {?} */ rawDuration = computedStyle.getPropertyValue('transition-duration');
    var /** @type {?} */ rawDelay = computedStyle.getPropertyValue('transition-delay');
    return parseCssTimeUnitsToMs(rawDuration) + parseCssTimeUnitsToMs(rawDelay);
}
/**
 * Point on the page or within an element.
 * @record
 */
function Point() { }
function Point_tsickle_Closure_declarations() {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
//# sourceMappingURL=drag.js.map