/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, InjectionToken, TemplateRef, Input, Injectable, NgZone, Inject, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Output, ViewEncapsulation, ContentChild, Optional, SkipSelf, ViewContainerRef, NgModule, defineInjectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Subject, merge, Observable } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Handle that can be used to drag and CdkDrag instance.
 */
class CdkDragHandle {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
    }
}
CdkDragHandle.decorators = [
    { type: Directive, args: [{
                selector: '[cdkDragHandle]',
                host: {
                    'class': 'cdk-drag-handle'
                }
            },] },
];
/** @nocollapse */
CdkDragHandle.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Injection token that is used to provide a CdkDrop instance to CdkDrag.
 * Used for avoiding circular imports.
 */
const /** @type {?} */ CDK_DROP_CONTAINER = new InjectionToken('CDK_DROP_CONTAINER');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Element that will be used as a template for the preview
 * of a CdkDrag when it is being dragged.
 * @template T
 */
class CdkDragPreview {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CdkDragPreview.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[cdkDragPreview]'
            },] },
];
/** @nocollapse */
CdkDragPreview.ctorParameters = () => [
    { type: TemplateRef, },
];
CdkDragPreview.propDecorators = {
    "data": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Element that will be used as a template for the placeholder of a CdkDrag when
 * it is being dragged. The placeholder is displayed in place of the element being dragged.
 * @template T
 */
class CdkDragPlaceholder {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CdkDragPlaceholder.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[cdkDragPlaceholder]'
            },] },
];
/** @nocollapse */
CdkDragPlaceholder.ctorParameters = () => [
    { type: TemplateRef, },
];
CdkDragPlaceholder.propDecorators = {
    "data": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Event options that can be used to bind an active event.
 */
const /** @type {?} */ activeEventOptions = supportsPassiveEventListeners() ? { passive: false } : false;
// unsupported: template constraints.
/**
 * Service that keeps track of all the drag item and drop container
 * instances, and manages global event listeners on the `document`.
 * \@docs-private
 * @template I, C
 */
class DragDropRegistry {
    /**
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(_ngZone, _document) {
        this._ngZone = _ngZone;
        /**
         * Registered drop container instances.
         */
        this._dropInstances = new Set();
        /**
         * Registered drag item instances.
         */
        this._dragInstances = new Set();
        /**
         * Drag item instances that are currently being dragged.
         */
        this._activeDragInstances = new Set();
        /**
         * Keeps track of the event listeners that we've bound to the `document`.
         */
        this._globalListeners = new Map();
        /**
         * Emits the `touchmove` or `mousemove` events that are dispatched
         * while the user is dragging a drag item instance.
         */
        this.pointerMove = new Subject();
        /**
         * Emits the `touchend` or `mouseup` events that are dispatched
         * while the user is dragging a drag item instance.
         */
        this.pointerUp = new Subject();
        /**
         * Listener used to prevent `touchmove` events while the element is being dragged.
         * This gets bound once, ahead of time, because WebKit won't preventDefault on a
         * dynamically-added `touchmove` listener. See https://bugs.webkit.org/show_bug.cgi?id=184250.
         */
        this._preventScrollListener = (event) => {
            if (this._activeDragInstances.size) {
                event.preventDefault();
            }
        };
        this._document = _document;
    }
    /**
     * Adds a drop container to the registry.
     * @param {?} drop
     * @return {?}
     */
    registerDropContainer(drop) {
        if (!this._dropInstances.has(drop)) {
            if (this.getDropContainer(drop.id)) {
                throw Error(`Drop instance with id "${drop.id}" has already been registered.`);
            }
            this._dropInstances.add(drop);
        }
    }
    /**
     * Adds a drag item instance to the registry.
     * @param {?} drag
     * @return {?}
     */
    registerDragItem(drag) {
        this._dragInstances.add(drag);
        if (this._dragInstances.size === 1) {
            this._ngZone.runOutsideAngular(() => {
                // The event handler has to be explicitly active, because
                // newer browsers make it passive by default.
                this._document.addEventListener('touchmove', this._preventScrollListener, activeEventOptions);
            });
        }
    }
    /**
     * Removes a drop container from the registry.
     * @param {?} drop
     * @return {?}
     */
    removeDropContainer(drop) {
        this._dropInstances.delete(drop);
    }
    /**
     * Removes a drag item instance from the registry.
     * @param {?} drag
     * @return {?}
     */
    removeDragItem(drag) {
        this._dragInstances.delete(drag);
        this.stopDragging(drag);
        if (this._dragInstances.size === 0) {
            this._document.removeEventListener('touchmove', this._preventScrollListener, /** @type {?} */ (activeEventOptions));
        }
    }
    /**
     * Starts the dragging sequence for a drag instance.
     * @param {?} drag Drag instance which is being dragged.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    startDragging(drag, event) {
        this._activeDragInstances.add(drag);
        if (this._activeDragInstances.size === 1) {
            const /** @type {?} */ isTouchEvent = event.type.startsWith('touch');
            const /** @type {?} */ moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
            const /** @type {?} */ upEvent = isTouchEvent ? 'touchend' : 'mouseup';
            // We explicitly bind __active__ listeners here, because newer browsers will default to
            // passive ones for `mousemove` and `touchmove`. The events need to be active, because we
            // use `preventDefault` to prevent the page from scrolling while the user is dragging.
            this._globalListeners
                .set(moveEvent, { handler: e => this.pointerMove.next(e), options: activeEventOptions })
                .set(upEvent, { handler: e => this.pointerUp.next(e) })
                .forEach((config, name) => {
                this._ngZone.runOutsideAngular(() => {
                    this._document.addEventListener(name, config.handler, config.options);
                });
            });
        }
    }
    /**
     * Stops dragging a drag item instance.
     * @param {?} drag
     * @return {?}
     */
    stopDragging(drag) {
        this._activeDragInstances.delete(drag);
        if (this._activeDragInstances.size === 0) {
            this._clearGlobalListeners();
        }
    }
    /**
     * Gets whether a drag item instance is currently being dragged.
     * @param {?} drag
     * @return {?}
     */
    isDragging(drag) {
        return this._activeDragInstances.has(drag);
    }
    /**
     * Gets a drop container by its id.
     * @param {?} id
     * @return {?}
     */
    getDropContainer(id) {
        return Array.from(this._dropInstances).find(instance => instance.id === id);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dragInstances.forEach(instance => this.removeDragItem(instance));
        this._dropInstances.forEach(instance => this.removeDropContainer(instance));
        this._clearGlobalListeners();
        this.pointerMove.complete();
        this.pointerUp.complete();
    }
    /**
     * Clears out the global event listeners from the `document`.
     * @return {?}
     */
    _clearGlobalListeners() {
        this._globalListeners.forEach((config, name) => {
            this._document.removeEventListener(name, config.handler, config.options);
        });
        this._globalListeners.clear();
    }
}
DragDropRegistry.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
DragDropRegistry.ctorParameters = () => [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
/** @nocollapse */ DragDropRegistry.ngInjectableDef = defineInjectable({ factory: function DragDropRegistry_Factory() { return new DragDropRegistry(inject(NgZone), inject(DOCUMENT)); }, token: DragDropRegistry, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Element that can be moved inside a CdkDrop container.
 * @template T
 */
class CdkDrag {
    /**
     * @param {?} element
     * @param {?} dropContainer
     * @param {?} document
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _viewportRuler
     * @param {?} _dragDropRegistry
     * @param {?} _dir
     */
    constructor(element, /** Droppable container that the draggable is a part of. */
    dropContainer, document, _ngZone, _viewContainerRef, _viewportRuler, _dragDropRegistry, _dir) {
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
        this.moved = Observable.create(observer => {
            const /** @type {?} */ subscription = this._moveEvents.subscribe(observer);
            this._moveEventSubscriptions++;
            return () => {
                subscription.unsubscribe();
                this._moveEventSubscriptions--;
            };
        });
        /**
         * Handler for when the pointer is pressed down on the element or the handle.
         */
        this._pointerDown = (referenceElement, event) => {
            if (this._dragDropRegistry.isDragging(this)) {
                return;
            }
            const /** @type {?} */ endedOrDestroyed = merge(this.ended, this._destroyed);
            this._dragDropRegistry.pointerMove
                .pipe(takeUntil(endedOrDestroyed))
                .subscribe(this._pointerMove);
            this._dragDropRegistry.pointerUp
                .pipe(takeUntil(endedOrDestroyed))
                .subscribe(this._pointerUp);
            this._dragDropRegistry.startDragging(this, event);
            this._initialContainer = this.dropContainer;
            this._scrollPosition = this._viewportRuler.getViewportScrollPosition();
            // If we have a custom preview template, the element won't be visible anyway so we avoid the
            // extra `getBoundingClientRect` calls and just move the preview next to the cursor.
            this._pickupPositionInElement = this._previewTemplate ? { x: 0, y: 0 } :
                this._getPointerPositionInElement(referenceElement, event);
            this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
            // Emit the event on the item before the one on the container.
            this.started.emit({ source: this });
            if (this.dropContainer) {
                const /** @type {?} */ element = this.element.nativeElement;
                const /** @type {?} */ preview = this._preview = this._createPreviewElement();
                const /** @type {?} */ placeholder = this._placeholder = this._createPlaceholderElement();
                // We move the element out at the end of the body and we make it hidden, because keeping it in
                // place will throw off the consumer's `:last-child` selectors. We can't remove the element
                // from the DOM completely, because iOS will stop firing all subsequent events in the chain.
                element.style.display = 'none';
                this._nextSibling = element.nextSibling;
                this._document.body.appendChild(/** @type {?} */ ((element.parentNode)).replaceChild(placeholder, element));
                this._document.body.appendChild(preview);
                this.dropContainer.start();
            }
        };
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         */
        this._pointerMove = (event) => {
            // TODO(crisbeto): this should start dragging after a certain threshold,
            // otherwise we risk interfering with clicks on the element.
            if (!this._dragDropRegistry.isDragging(this)) {
                return;
            }
            this._hasMoved = true;
            event.preventDefault();
            const /** @type {?} */ pointerPosition = this._getConstrainedPointerPosition(event);
            if (this.dropContainer) {
                this._updateActiveDropContainer(pointerPosition);
            }
            else {
                const /** @type {?} */ activeTransform = this._activeTransform;
                activeTransform.x =
                    pointerPosition.x - this._pickupPositionOnPage.x + this._passiveTransform.x;
                activeTransform.y =
                    pointerPosition.y - this._pickupPositionOnPage.y + this._passiveTransform.y;
                this._setTransform(this.element.nativeElement, activeTransform.x, activeTransform.y);
            }
            // Since this event gets fired for every pixel while dragging, we only
            // want to fire it if the consumer opted into it. Also we have to
            // re-enter the zone becaus we run all of the events on the outside.
            if (this._moveEventSubscriptions > 0) {
                this._ngZone.run(() => {
                    this._moveEvents.next({
                        source: this,
                        pointerPosition,
                        event
                    });
                });
            }
        };
        /**
         * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
         */
        this._pointerUp = () => {
            if (!this._dragDropRegistry.isDragging(this)) {
                return;
            }
            this._dragDropRegistry.stopDragging(this);
            if (!this.dropContainer) {
                // Convert the active transform into a passive one. This means that next time
                // the user starts dragging the item, its position will be calculated relatively
                // to the new passive transform.
                this._passiveTransform.x = this._activeTransform.x;
                this._passiveTransform.y = this._activeTransform.y;
                this._ngZone.run(() => this.ended.emit({ source: this }));
                return;
            }
            this._animatePreviewToPlaceholder().then(() => this._cleanupDragArtifacts());
        };
        this._document = document;
        _dragDropRegistry.registerDragItem(this);
    }
    /**
     * Returns the element that is being used as a placeholder
     * while the current element is being dragged.
     * @return {?}
     */
    getPlaceholderElement() {
        return this._placeholder;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * Starts the dragging sequence.
     * @param {?} event
     * @return {?}
     */
    _startDragging(event) {
        // Delegate the event based on whether it started from a handle or the element itself.
        if (this._handles.length) {
            const /** @type {?} */ targetHandle = this._handles.find(handle => {
                const /** @type {?} */ element = handle.element.nativeElement;
                const /** @type {?} */ target = event.target;
                return !!target && (target === element || element.contains(/** @type {?} */ (target)));
            });
            if (targetHandle) {
                this._pointerDown(targetHandle.element, event);
            }
        }
        else {
            this._pointerDown(this.element, event);
        }
    }
    /**
     * Cleans up the DOM artifacts that were added to facilitate the element being dragged.
     * @return {?}
     */
    _cleanupDragArtifacts() {
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
        this._ngZone.run(() => {
            const /** @type {?} */ currentIndex = this.dropContainer.getItemIndex(this);
            this.ended.emit({ source: this });
            this.dropped.emit({
                item: this,
                currentIndex,
                previousIndex: this._initialContainer.getItemIndex(this),
                container: this.dropContainer,
                previousContainer: this._initialContainer
            });
            this.dropContainer.drop(this, currentIndex, this._initialContainer);
        });
    }
    /**
     * Updates the item's position in its drop container, or moves it
     * into a new one, depending on its current drag position.
     * @param {?} __0
     * @return {?}
     */
    _updateActiveDropContainer({ x, y }) {
        // Drop container that draggable has been moved into.
        const /** @type {?} */ newContainer = this.dropContainer._getSiblingContainerFromPosition(this, x, y);
        if (newContainer) {
            this._ngZone.run(() => {
                // Notify the old container that the item has left.
                this.exited.emit({ item: this, container: this.dropContainer });
                this.dropContainer.exit(this);
                // Notify the new container that the item has entered.
                this.entered.emit({ item: this, container: newContainer });
                this.dropContainer = newContainer;
                this.dropContainer.enter(this, x, y);
            });
        }
        this.dropContainer._sortItem(this, x, y);
        this._setTransform(this._preview, x - this._pickupPositionInElement.x, y - this._pickupPositionInElement.y);
    }
    /**
     * Creates the element that will be rendered next to the user's pointer
     * and will be used as a preview of the element that is being dragged.
     * @return {?}
     */
    _createPreviewElement() {
        let /** @type {?} */ preview;
        if (this._previewTemplate) {
            const /** @type {?} */ viewRef = this._viewContainerRef.createEmbeddedView(this._previewTemplate.templateRef, this._previewTemplate.data);
            preview = viewRef.rootNodes[0];
            this._previewRef = viewRef;
            this._setTransform(preview, this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
        }
        else {
            const /** @type {?} */ element = this.element.nativeElement;
            const /** @type {?} */ elementRect = element.getBoundingClientRect();
            preview = /** @type {?} */ (element.cloneNode(true));
            preview.style.width = `${elementRect.width}px`;
            preview.style.height = `${elementRect.height}px`;
            this._setTransform(preview, elementRect.left, elementRect.top);
        }
        preview.classList.add('cdk-drag-preview');
        preview.setAttribute('dir', this._dir ? this._dir.value : 'ltr');
        return preview;
    }
    /**
     * Creates an element that will be shown instead of the current element while dragging.
     * @return {?}
     */
    _createPlaceholderElement() {
        let /** @type {?} */ placeholder;
        if (this._placeholderTemplate) {
            this._placeholderRef = this._viewContainerRef.createEmbeddedView(this._placeholderTemplate.templateRef, this._placeholderTemplate.data);
            placeholder = this._placeholderRef.rootNodes[0];
        }
        else {
            placeholder = /** @type {?} */ (this.element.nativeElement.cloneNode(true));
        }
        placeholder.classList.add('cdk-drag-placeholder');
        return placeholder;
    }
    /**
     * Figures out the coordinates at which an element was picked up.
     * @param {?} referenceElement Element that initiated the dragging.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    _getPointerPositionInElement(referenceElement, event) {
        const /** @type {?} */ elementRect = this.element.nativeElement.getBoundingClientRect();
        const /** @type {?} */ handleElement = referenceElement === this.element ? null : referenceElement.nativeElement;
        const /** @type {?} */ referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
        const /** @type {?} */ x = this._isTouchEvent(event) ?
            event.targetTouches[0].pageX - referenceRect.left - this._scrollPosition.left :
            event.offsetX;
        const /** @type {?} */ y = this._isTouchEvent(event) ?
            event.targetTouches[0].pageY - referenceRect.top - this._scrollPosition.top :
            event.offsetY;
        return {
            x: referenceRect.left - elementRect.left + x,
            y: referenceRect.top - elementRect.top + y
        };
    }
    /**
     * Animates the preview element from its current position to the location of the drop placeholder.
     * @return {?} Promise that resolves when the animation completes.
     */
    _animatePreviewToPlaceholder() {
        // If the user hasn't moved yet, the transitionend event won't fire.
        if (!this._hasMoved) {
            return Promise.resolve();
        }
        const /** @type {?} */ placeholderRect = this._placeholder.getBoundingClientRect();
        // Apply the class that adds a transition to the preview.
        this._preview.classList.add('cdk-drag-animating');
        // Move the preview to the placeholder position.
        this._setTransform(this._preview, placeholderRect.left, placeholderRect.top);
        // If the element doesn't have a `transition`, the `transitionend` event won't fire. Since
        // we need to trigger a style recalculation in order for the `cdk-drag-animating` class to
        // apply its style, we take advantage of the available info to figure out whether we need to
        // bind the event in the first place.
        const /** @type {?} */ duration = getTransitionDurationInMs(this._preview);
        if (duration === 0) {
            return Promise.resolve();
        }
        return this._ngZone.runOutsideAngular(() => {
            return new Promise(resolve => {
                const /** @type {?} */ handler = (event) => {
                    if (!event || event.target === this._preview) {
                        this._preview.removeEventListener('transitionend', handler);
                        resolve();
                        clearTimeout(timeout);
                    }
                };
                // If a transition is short enough, the browser might not fire the `transitionend` event.
                // Since we know how long it's supposed to take, add a timeout with a 50% buffer that'll
                // fire if the transition hasn't completed when it was supposed to.
                const /** @type {?} */ timeout = setTimeout(handler, duration * 1.5);
                this._preview.addEventListener('transitionend', handler);
            });
        });
    }
    /**
     * Sets the `transform` style on an element.
     * @param {?} element Element on which to set the transform.
     * @param {?} x Desired position of the element along the X axis.
     * @param {?} y Desired position of the element along the Y axis.
     * @return {?}
     */
    _setTransform(element, x, y) {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    /**
     * Helper to remove an element from the DOM and to do all the necessary null checks.
     * @param {?} element Element to be removed.
     * @return {?}
     */
    _removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    /**
     * Determines the point of the page that was touched by the user.
     * @param {?} event
     * @return {?}
     */
    _getPointerPositionOnPage(event) {
        const /** @type {?} */ point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    }
    /**
     * Gets the pointer position on the page, accounting for any position constraints.
     * @param {?} event
     * @return {?}
     */
    _getConstrainedPointerPosition(event) {
        const /** @type {?} */ point = this._getPointerPositionOnPage(event);
        const /** @type {?} */ dropContainerLock = this.dropContainer ? this.dropContainer.lockAxis : null;
        if (this.lockAxis === 'x' || dropContainerLock === 'x') {
            point.y = this._pickupPositionOnPage.y;
        }
        else if (this.lockAxis === 'y' || dropContainerLock === 'y') {
            point.x = this._pickupPositionOnPage.x;
        }
        return point;
    }
    /**
     * Determines whether an event is a touch event.
     * @param {?} event
     * @return {?}
     */
    _isTouchEvent(event) {
        return event.type.startsWith('touch');
    }
    /**
     * Destroys the preview element and its ViewRef.
     * @return {?}
     */
    _destroyPreview() {
        if (this._preview) {
            this._removeElement(this._preview);
        }
        if (this._previewRef) {
            this._previewRef.destroy();
        }
        this._preview = this._previewRef = /** @type {?} */ ((null));
    }
    /**
     * Destroys the placeholder element and its ViewRef.
     * @return {?}
     */
    _destroyPlaceholder() {
        if (this._placeholder) {
            this._removeElement(this._placeholder);
        }
        if (this._placeholderRef) {
            this._placeholderRef.destroy();
        }
        this._placeholder = this._placeholderRef = /** @type {?} */ ((null));
    }
}
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
CdkDrag.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_DROP_CONTAINER,] }, { type: Optional }, { type: SkipSelf },] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: NgZone, },
    { type: ViewContainerRef, },
    { type: ViewportRuler, },
    { type: DragDropRegistry, },
    { type: Directionality, decorators: [{ type: Optional },] },
];
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
/**
 * Parses a CSS time value to milliseconds.
 * @param {?} value
 * @return {?}
 */
function parseCssTimeUnitsToMs(value) {
    // Some browsers will return it in seconds, whereas others will return milliseconds.
    const /** @type {?} */ multiplier = value.toLowerCase().indexOf('ms') > -1 ? 1 : 1000;
    return parseFloat(value) * multiplier;
}
/**
 * Gets the transition duration, including the delay, of an element in milliseconds.
 * @param {?} element
 * @return {?}
 */
function getTransitionDurationInMs(element) {
    const /** @type {?} */ computedStyle = getComputedStyle(element);
    const /** @type {?} */ rawDuration = computedStyle.getPropertyValue('transition-duration');
    const /** @type {?} */ rawDelay = computedStyle.getPropertyValue('transition-delay');
    return parseCssTimeUnitsToMs(rawDuration) + parseCssTimeUnitsToMs(rawDelay);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Counter used to generate unique ids for drop zones.
 */
let /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Container that wraps a set of draggable items.
 * @template T
 */
class CdkDrop {
    /**
     * @param {?} element
     * @param {?} _dragDropRegistry
     */
    constructor(element, _dragDropRegistry) {
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
        this.id = `cdk-drop-${_uniqueIdCounter++}`;
        /**
         * Function that is used to determine whether an item
         * is allowed to be moved into a drop container.
         */
        this.enterPredicate = () => true;
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
    ngOnInit() {
        this._dragDropRegistry.registerDropContainer(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dragDropRegistry.removeDropContainer(this);
    }
    /**
     * Starts dragging an item.
     * @return {?}
     */
    start() {
        this._dragging = true;
        this._activeDraggables = this._draggables.toArray();
        this._cachePositions();
    }
    /**
     * Drops an item into this container.
     * @param {?} item Item being dropped into the container.
     * @param {?} currentIndex Index at which the item should be inserted.
     * @param {?} previousContainer Container from which the item got dragged in.
     * @return {?}
     */
    drop(item, currentIndex, previousContainer) {
        this._reset();
        this.dropped.emit({
            item,
            currentIndex,
            previousIndex: previousContainer.getItemIndex(item),
            container: this,
            // TODO(crisbeto): reconsider whether to make this null if the containers are the same.
            previousContainer
        });
    }
    /**
     * Emits an event to indicate that the user moved an item into the container.
     * @param {?} item Item that was moved into the container.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    enter(item, xOffset, yOffset) {
        this.entered.emit({ item, container: this });
        this.start();
        // We use the coordinates of where the item entered the drop
        // zone to figure out at which index it should be inserted.
        const /** @type {?} */ newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        const /** @type {?} */ currentIndex = this._activeDraggables.indexOf(item);
        const /** @type {?} */ newPositionReference = this._activeDraggables[newIndex];
        const /** @type {?} */ placeholder = item.getPlaceholderElement();
        // Since the item may be in the `activeDraggables` already (e.g. if the user dragged it
        // into another container and back again), we have to ensure that it isn't duplicated.
        if (currentIndex > -1) {
            this._activeDraggables.splice(currentIndex, 1);
        }
        // Don't use items that are being dragged as a reference, because
        // their element has been moved down to the bottom of the body.
        if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
            const /** @type {?} */ element = newPositionReference.element.nativeElement; /** @type {?} */
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
    }
    /**
     * Removes an item from the container after it was dragged into another container by the user.
     * @param {?} item Item that was dragged out.
     * @return {?}
     */
    exit(item) {
        this._reset();
        this.exited.emit({ item, container: this });
    }
    /**
     * Figures out the index of an item in the container.
     * @param {?} item Item whose index should be determined.
     * @return {?}
     */
    getItemIndex(item) {
        return this._dragging ?
            this._positionCache.items.findIndex(currentItem => currentItem.drag === item) :
            this._draggables.toArray().indexOf(item);
    }
    /**
     * Sorts an item inside the container based on its position.
     * @param {?} item Item to be sorted.
     * @param {?} xOffset Position of the item along the X axis.
     * @param {?} yOffset Position of the item along the Y axis.
     * @return {?}
     */
    _sortItem(item, xOffset, yOffset) {
        const /** @type {?} */ siblings = this._positionCache.items;
        const /** @type {?} */ isHorizontal = this.orientation === 'horizontal';
        const /** @type {?} */ newIndex = this._getItemIndexFromPointerPosition(item, xOffset, yOffset);
        const /** @type {?} */ placeholder = item.getPlaceholderElement();
        if (newIndex === -1 && siblings.length > 0) {
            return;
        }
        const /** @type {?} */ currentIndex = siblings.findIndex(currentItem => currentItem.drag === item);
        const /** @type {?} */ currentPosition = siblings[currentIndex];
        const /** @type {?} */ newPosition = siblings[newIndex];
        // Figure out the offset necessary for the items to be swapped.
        const /** @type {?} */ offset = isHorizontal ?
            currentPosition.clientRect.left - newPosition.clientRect.left :
            currentPosition.clientRect.top - newPosition.clientRect.top;
        const /** @type {?} */ topAdjustment = isHorizontal ? 0 : offset;
        const /** @type {?} */ leftAdjustment = isHorizontal ? offset : 0;
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
            `translate3d(${currentPosition.offset}px, 0, 0)` :
            `translate3d(0, ${currentPosition.offset}px, 0)`;
        newPosition.drag.element.nativeElement.style.transform = isHorizontal ?
            `translate3d(${newPosition.offset}px, 0, 0)` :
            `translate3d(0, ${newPosition.offset}px, 0)`;
    }
    /**
     * Figures out whether an item should be moved into a sibling
     * drop container, based on its current position.
     * @param {?} item Drag item that is being moved.
     * @param {?} x Position of the item along the X axis.
     * @param {?} y Position of the item along the Y axis.
     * @return {?}
     */
    _getSiblingContainerFromPosition(item, x, y) {
        const /** @type {?} */ result = this._positionCache.siblings.find(({ clientRect }) => {
            const { top, bottom, left, right } = clientRect;
            return y >= top && y <= bottom && x >= left && x <= right;
        });
        return result && result.drop.enterPredicate(item, this) ? result.drop : null;
    }
    /**
     * Refreshes the position cache of the items and sibling containers.
     * @return {?}
     */
    _cachePositions() {
        this._positionCache.items = this._activeDraggables
            .map(drag => {
            const /** @type {?} */ elementToMeasure = this._dragDropRegistry.isDragging(drag) ?
                // If the element is being dragged, we have to measure the
                // placeholder, because the element is hidden.
                drag.getPlaceholderElement() :
                drag.element.nativeElement;
            const /** @type {?} */ clientRect = elementToMeasure.getBoundingClientRect();
            return {
                drag,
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
            .sort((a, b) => a.clientRect.top - b.clientRect.top);
        this._positionCache.siblings = this.connectedTo
            .map(drop => typeof drop === 'string' ? /** @type {?} */ ((this._dragDropRegistry.getDropContainer(drop))) : drop)
            .filter(drop => drop && drop !== this)
            .map(drop => ({ drop, clientRect: drop.element.nativeElement.getBoundingClientRect() }));
    }
    /**
     * Resets the container to its initial state.
     * @return {?}
     */
    _reset() {
        this._dragging = false;
        // TODO(crisbeto): may have to wait for the animations to finish.
        this._activeDraggables.forEach(item => item.element.nativeElement.style.transform = '');
        this._activeDraggables = [];
        this._positionCache.items = [];
        this._positionCache.siblings = [];
    }
    /**
     * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
     * @param {?} clientRect `ClientRect` that should be updated.
     * @param {?} top New value for the `top` position.
     * @param {?} left New value for the `left` position.
     * @return {?}
     */
    _adjustClientRect(clientRect, top, left) {
        clientRect.top += top;
        clientRect.bottom = clientRect.top + clientRect.height;
        clientRect.left += left;
        clientRect.right = clientRect.left + clientRect.width;
    }
    /**
     * Gets the index of an item in the drop container, based on the position of the user's pointer.
     * @param {?} item Item that is being sorted.
     * @param {?} xOffset Position of the user's pointer along the X axis.
     * @param {?} yOffset Position of the user's pointer along the Y axis.
     * @return {?}
     */
    _getItemIndexFromPointerPosition(item, xOffset, yOffset) {
        return this._positionCache.items.findIndex(({ drag, clientRect }, _, array) => {
            if (drag === item) {
                // If there's only one item left in the container, it must be
                // the dragged item itself so we use it as a reference.
                return array.length < 2;
            }
            return this.orientation === 'horizontal' ?
                // Round these down since most browsers report client rects with
                // sub-pixel precision, whereas the mouse coordinates are rounded to pixels.
                xOffset >= Math.floor(clientRect.left) && xOffset <= Math.floor(clientRect.right) :
                yOffset >= Math.floor(clientRect.top) && yOffset <= Math.floor(clientRect.bottom);
        });
    }
}
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
CdkDrop.ctorParameters = () => [
    { type: ElementRef, },
    { type: DragDropRegistry, },
];
CdkDrop.propDecorators = {
    "_draggables": [{ type: ContentChildren, args: [forwardRef(() => CdkDrag),] },],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Moves an item one index in an array to another.
 * @template T
 * @param {?} array Array in which to move the item.
 * @param {?} fromIndex Starting index of the item.
 * @param {?} toIndex Index to which the item should be moved.
 * @return {?}
 */
function moveItemInArray(array, fromIndex, toIndex) {
    const /** @type {?} */ from = clamp(fromIndex, array.length - 1);
    const /** @type {?} */ to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    const /** @type {?} */ target = array[from];
    const /** @type {?} */ delta = to < from ? -1 : 1;
    for (let /** @type {?} */ i = from; i !== to; i += delta) {
        array[i] = array[i + delta];
    }
    array[to] = target;
}
/**
 * Moves an item from one array to another.
 * @template T
 * @param {?} currentArray Array from which to transfer the item.
 * @param {?} targetArray Array into which to put the item.
 * @param {?} currentIndex Index of the item in its current array.
 * @param {?} targetIndex Index at which to insert the item.
 * @return {?}
 */
function transferArrayItem(currentArray, targetArray, currentIndex, targetIndex) {
    const /** @type {?} */ from = clamp(currentIndex, currentArray.length - 1);
    const /** @type {?} */ to = clamp(targetIndex, targetArray.length);
    if (currentArray.length) {
        targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
    }
}
/**
 * Clamps a number between zero and a maximum.
 * @param {?} value
 * @param {?} max
 * @return {?}
 */
function clamp(value, max) {
    return Math.max(0, Math.min(max, value));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DragDropModule {
}
DragDropModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CdkDrop,
                    CdkDrag,
                    CdkDragHandle,
                    CdkDragPreview,
                    CdkDragPlaceholder,
                ],
                exports: [
                    CdkDrop,
                    CdkDrag,
                    CdkDragHandle,
                    CdkDragPreview,
                    CdkDragPlaceholder,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CdkDrop, CDK_DROP_CONTAINER, CdkDrag, CdkDragHandle, moveItemInArray, transferArrayItem, CdkDragPreview, CdkDragPlaceholder, DragDropModule, DragDropRegistry };
//# sourceMappingURL=drag-drop.js.map
