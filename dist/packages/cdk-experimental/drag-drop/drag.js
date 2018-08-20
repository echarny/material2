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
var common_1 = require("@angular/common");
var bidi_1 = require("@angular/cdk/bidi");
var drag_handle_1 = require("./drag-handle");
var drop_container_1 = require("./drop-container");
var drag_preview_1 = require("./drag-preview");
var drag_placeholder_1 = require("./drag-placeholder");
var overlay_1 = require("@angular/cdk/overlay");
var drag_drop_registry_1 = require("./drag-drop-registry");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// TODO(crisbeto): add auto-scrolling functionality.
// TODO(crisbeto): add an API for moving a draggable up/down the
// list programmatically. Useful for keyboard controls.
/** Element that can be moved inside a CdkDrop container. */
var CdkDrag = /** @class */ (function () {
    function CdkDrag(/** Element that the draggable is attached to. */
    element, /** Droppable container that the draggable is a part of. */
    dropContainer, document, _ngZone, _viewContainerRef, _viewportRuler, _dragDropRegistry, _dir) {
        var _this = this;
        this.element = element;
        this.dropContainer = dropContainer;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
        this._dir = _dir;
        this._destroyed = new rxjs_1.Subject();
        /**
           * CSS `transform` applied to the element when it isn't being dragged. We need a
           * passive transform in order for the dragged element to retain its new position
           * after the user has stopped dragging and because we need to know the relative
           * position in case they start dragging again. This corresponds to `element.style.transform`.
           */
        this._passiveTransform = { x: 0, y: 0 };
        /** CSS `transform` that is applied to the element while it's being dragged. */
        this._activeTransform = { x: 0, y: 0 };
        /** Whether the element has moved since the user started dragging it. */
        this._hasMoved = false;
        /** Emits when the item is being moved. */
        this._moveEvents = new rxjs_1.Subject();
        /**
           * Amount of subscriptions to the move event. Used to avoid
           * hitting the zone if the consumer didn't subscribe to it.
           */
        this._moveEventSubscriptions = 0;
        /** Emits when the user starts dragging the item. */
        this.started = new core_1.EventEmitter();
        /** Emits when the user stops dragging an item in the container. */
        this.ended = new core_1.EventEmitter();
        /** Emits when the user has moved the item into a new container. */
        this.entered = new core_1.EventEmitter();
        /** Emits when the user removes the item its container by dragging it into another container. */
        this.exited = new core_1.EventEmitter();
        /** Emits when the user drops the item inside a container. */
        this.dropped = new core_1.EventEmitter();
        /**
           * Emits as the user is dragging the item. Use with caution,
           * because this event will fire for every pixel that the user has dragged.
           */
        this.moved = rxjs_1.Observable.create(function (observer) {
            var subscription = _this._moveEvents.subscribe(observer);
            _this._moveEventSubscriptions++;
            return function () {
                subscription.unsubscribe();
                _this._moveEventSubscriptions--;
            };
        });
        /** Handler for when the pointer is pressed down on the element or the handle. */
        this._pointerDown = function (referenceElement, event) {
            if (_this._dragDropRegistry.isDragging(_this)) {
                return;
            }
            var endedOrDestroyed = rxjs_1.merge(_this.ended, _this._destroyed);
            _this._dragDropRegistry.pointerMove
                .pipe(operators_1.takeUntil(endedOrDestroyed))
                .subscribe(_this._pointerMove);
            _this._dragDropRegistry.pointerUp
                .pipe(operators_1.takeUntil(endedOrDestroyed))
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
                var element = _this.element.nativeElement;
                var preview = _this._preview = _this._createPreviewElement();
                var placeholder = _this._placeholder = _this._createPlaceholderElement();
                // We move the element out at the end of the body and we make it hidden, because keeping it in
                // place will throw off the consumer's `:last-child` selectors. We can't remove the element
                // from the DOM completely, because iOS will stop firing all subsequent events in the chain.
                element.style.display = 'none';
                _this._nextSibling = element.nextSibling;
                _this._document.body.appendChild(element.parentNode.replaceChild(placeholder, element));
                _this._document.body.appendChild(preview);
                _this.dropContainer.start();
            }
        };
        /** Handler that is invoked when the user moves their pointer after they've initiated a drag. */
        this._pointerMove = function (event) {
            // TODO(crisbeto): this should start dragging after a certain threshold,
            // otherwise we risk interfering with clicks on the element.
            if (!_this._dragDropRegistry.isDragging(_this)) {
                return;
            }
            _this._hasMoved = true;
            event.preventDefault();
            var pointerPosition = _this._getConstrainedPointerPosition(event);
            if (_this.dropContainer) {
                _this._updateActiveDropContainer(pointerPosition);
            }
            else {
                var activeTransform = _this._activeTransform;
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
        /** Handler that is invoked when the user lifts their pointer up, after initiating a drag. */
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
       */
    CdkDrag.prototype.getPlaceholderElement = /**
       * Returns the element that is being used as a placeholder
       * while the current element is being dragged.
       */
    function () {
        return this._placeholder;
    };
    CdkDrag.prototype.ngOnDestroy = function () {
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
    /** Starts the dragging sequence. */
    CdkDrag.prototype._startDragging = /** Starts the dragging sequence. */
    function (event) {
        // Delegate the event based on whether it started from a handle or the element itself.
        if (this._handles.length) {
            var targetHandle = this._handles.find(function (handle) {
                var element = handle.element.nativeElement;
                var target = event.target;
                return !!target && (target === element || element.contains(target));
            });
            if (targetHandle) {
                this._pointerDown(targetHandle.element, event);
            }
        }
        else {
            this._pointerDown(this.element, event);
        }
    };
    /** Cleans up the DOM artifacts that were added to facilitate the element being dragged. */
    /** Cleans up the DOM artifacts that were added to facilitate the element being dragged. */
    CdkDrag.prototype._cleanupDragArtifacts = /** Cleans up the DOM artifacts that were added to facilitate the element being dragged. */
    function () {
        var _this = this;
        // Restore the element's visibility and insert it at its old position in the DOM.
        // It's important that we maintain the position, because moving the element around in the DOM
        // can throw off `NgFor` which does smart diffing and re-creates elements only when necessary,
        // while moving the existing elements in all other cases.
        this.element.nativeElement.style.display = '';
        if (this._nextSibling) {
            this._nextSibling.parentNode.insertBefore(this.element.nativeElement, this._nextSibling);
        }
        else {
            this._placeholder.parentNode.appendChild(this.element.nativeElement);
        }
        this._destroyPreview();
        this._destroyPlaceholder();
        // Re-enter the NgZone since we bound `document` events on the outside.
        this._ngZone.run(function () {
            var currentIndex = _this.dropContainer.getItemIndex(_this);
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
     */
    /**
       * Updates the item's position in its drop container, or moves it
       * into a new one, depending on its current drag position.
       */
    CdkDrag.prototype._updateActiveDropContainer = /**
       * Updates the item's position in its drop container, or moves it
       * into a new one, depending on its current drag position.
       */
    function (_a) {
        var _this = this;
        var x = _a.x, y = _a.y;
        // Drop container that draggable has been moved into.
        var newContainer = this.dropContainer._getSiblingContainerFromPosition(this, x, y);
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
     */
    /**
       * Creates the element that will be rendered next to the user's pointer
       * and will be used as a preview of the element that is being dragged.
       */
    CdkDrag.prototype._createPreviewElement = /**
       * Creates the element that will be rendered next to the user's pointer
       * and will be used as a preview of the element that is being dragged.
       */
    function () {
        var preview;
        if (this._previewTemplate) {
            var viewRef = this._viewContainerRef.createEmbeddedView(this._previewTemplate.templateRef, this._previewTemplate.data);
            preview = viewRef.rootNodes[0];
            this._previewRef = viewRef;
            this._setTransform(preview, this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
        }
        else {
            var element = this.element.nativeElement;
            var elementRect = element.getBoundingClientRect();
            preview = element.cloneNode(true);
            preview.style.width = elementRect.width + "px";
            preview.style.height = elementRect.height + "px";
            this._setTransform(preview, elementRect.left, elementRect.top);
        }
        preview.classList.add('cdk-drag-preview');
        preview.setAttribute('dir', this._dir ? this._dir.value : 'ltr');
        return preview;
    };
    /** Creates an element that will be shown instead of the current element while dragging. */
    /** Creates an element that will be shown instead of the current element while dragging. */
    CdkDrag.prototype._createPlaceholderElement = /** Creates an element that will be shown instead of the current element while dragging. */
    function () {
        var placeholder;
        if (this._placeholderTemplate) {
            this._placeholderRef = this._viewContainerRef.createEmbeddedView(this._placeholderTemplate.templateRef, this._placeholderTemplate.data);
            placeholder = this._placeholderRef.rootNodes[0];
        }
        else {
            placeholder = this.element.nativeElement.cloneNode(true);
        }
        placeholder.classList.add('cdk-drag-placeholder');
        return placeholder;
    };
    /**
     * Figures out the coordinates at which an element was picked up.
     * @param referenceElement Element that initiated the dragging.
     * @param event Event that initiated the dragging.
     */
    /**
       * Figures out the coordinates at which an element was picked up.
       * @param referenceElement Element that initiated the dragging.
       * @param event Event that initiated the dragging.
       */
    CdkDrag.prototype._getPointerPositionInElement = /**
       * Figures out the coordinates at which an element was picked up.
       * @param referenceElement Element that initiated the dragging.
       * @param event Event that initiated the dragging.
       */
    function (referenceElement, event) {
        var elementRect = this.element.nativeElement.getBoundingClientRect();
        var handleElement = referenceElement === this.element ? null : referenceElement.nativeElement;
        var referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
        var x = this._isTouchEvent(event) ?
            event.targetTouches[0].pageX - referenceRect.left - this._scrollPosition.left :
            event.offsetX;
        var y = this._isTouchEvent(event) ?
            event.targetTouches[0].pageY - referenceRect.top - this._scrollPosition.top :
            event.offsetY;
        return {
            x: referenceRect.left - elementRect.left + x,
            y: referenceRect.top - elementRect.top + y
        };
    };
    /**
     * Animates the preview element from its current position to the location of the drop placeholder.
     * @returns Promise that resolves when the animation completes.
     */
    /**
       * Animates the preview element from its current position to the location of the drop placeholder.
       * @returns Promise that resolves when the animation completes.
       */
    CdkDrag.prototype._animatePreviewToPlaceholder = /**
       * Animates the preview element from its current position to the location of the drop placeholder.
       * @returns Promise that resolves when the animation completes.
       */
    function () {
        var _this = this;
        // If the user hasn't moved yet, the transitionend event won't fire.
        if (!this._hasMoved) {
            return Promise.resolve();
        }
        var placeholderRect = this._placeholder.getBoundingClientRect();
        // Apply the class that adds a transition to the preview.
        this._preview.classList.add('cdk-drag-animating');
        // Move the preview to the placeholder position.
        this._setTransform(this._preview, placeholderRect.left, placeholderRect.top);
        // If the element doesn't have a `transition`, the `transitionend` event won't fire. Since
        // we need to trigger a style recalculation in order for the `cdk-drag-animating` class to
        // apply its style, we take advantage of the available info to figure out whether we need to
        // bind the event in the first place.
        var duration = getTransitionDurationInMs(this._preview);
        if (duration === 0) {
            return Promise.resolve();
        }
        return this._ngZone.runOutsideAngular(function () {
            return new Promise(function (resolve) {
                var handler = function (event) {
                    if (!event || event.target === _this._preview) {
                        _this._preview.removeEventListener('transitionend', handler);
                        resolve();
                        clearTimeout(timeout);
                    }
                };
                // If a transition is short enough, the browser might not fire the `transitionend` event.
                // Since we know how long it's supposed to take, add a timeout with a 50% buffer that'll
                // fire if the transition hasn't completed when it was supposed to.
                var timeout = setTimeout(handler, duration * 1.5);
                _this._preview.addEventListener('transitionend', handler);
            });
        });
    };
    /**
     * Sets the `transform` style on an element.
     * @param element Element on which to set the transform.
     * @param x Desired position of the element along the X axis.
     * @param y Desired position of the element along the Y axis.
     */
    /**
       * Sets the `transform` style on an element.
       * @param element Element on which to set the transform.
       * @param x Desired position of the element along the X axis.
       * @param y Desired position of the element along the Y axis.
       */
    CdkDrag.prototype._setTransform = /**
       * Sets the `transform` style on an element.
       * @param element Element on which to set the transform.
       * @param x Desired position of the element along the X axis.
       * @param y Desired position of the element along the Y axis.
       */
    function (element, x, y) {
        element.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    };
    /**
     * Helper to remove an element from the DOM and to do all the necessary null checks.
     * @param element Element to be removed.
     */
    /**
       * Helper to remove an element from the DOM and to do all the necessary null checks.
       * @param element Element to be removed.
       */
    CdkDrag.prototype._removeElement = /**
       * Helper to remove an element from the DOM and to do all the necessary null checks.
       * @param element Element to be removed.
       */
    function (element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    /** Determines the point of the page that was touched by the user. */
    /** Determines the point of the page that was touched by the user. */
    CdkDrag.prototype._getPointerPositionOnPage = /** Determines the point of the page that was touched by the user. */
    function (event) {
        var point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    };
    /** Gets the pointer position on the page, accounting for any position constraints. */
    /** Gets the pointer position on the page, accounting for any position constraints. */
    CdkDrag.prototype._getConstrainedPointerPosition = /** Gets the pointer position on the page, accounting for any position constraints. */
    function (event) {
        var point = this._getPointerPositionOnPage(event);
        var dropContainerLock = this.dropContainer ? this.dropContainer.lockAxis : null;
        if (this.lockAxis === 'x' || dropContainerLock === 'x') {
            point.y = this._pickupPositionOnPage.y;
        }
        else if (this.lockAxis === 'y' || dropContainerLock === 'y') {
            point.x = this._pickupPositionOnPage.x;
        }
        return point;
    };
    /** Determines whether an event is a touch event. */
    /** Determines whether an event is a touch event. */
    CdkDrag.prototype._isTouchEvent = /** Determines whether an event is a touch event. */
    function (event) {
        return event.type.startsWith('touch');
    };
    /** Destroys the preview element and its ViewRef. */
    /** Destroys the preview element and its ViewRef. */
    CdkDrag.prototype._destroyPreview = /** Destroys the preview element and its ViewRef. */
    function () {
        if (this._preview) {
            this._removeElement(this._preview);
        }
        if (this._previewRef) {
            this._previewRef.destroy();
        }
        this._preview = this._previewRef = (null);
    };
    /** Destroys the placeholder element and its ViewRef. */
    /** Destroys the placeholder element and its ViewRef. */
    CdkDrag.prototype._destroyPlaceholder = /** Destroys the placeholder element and its ViewRef. */
    function () {
        if (this._placeholder) {
            this._removeElement(this._placeholder);
        }
        if (this._placeholderRef) {
            this._placeholderRef.destroy();
        }
        this._placeholder = this._placeholderRef = (null);
    };
    CdkDrag.decorators = [
        { type: core_1.Directive, args: [{
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
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [drop_container_1.CDK_DROP_CONTAINER,] }, { type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: core_1.NgZone, },
        { type: core_1.ViewContainerRef, },
        { type: overlay_1.ViewportRuler, },
        { type: drag_drop_registry_1.DragDropRegistry, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    CdkDrag.propDecorators = {
        "_handles": [{ type: core_1.ContentChildren, args: [drag_handle_1.CdkDragHandle,] },],
        "_previewTemplate": [{ type: core_1.ContentChild, args: [drag_preview_1.CdkDragPreview,] },],
        "_placeholderTemplate": [{ type: core_1.ContentChild, args: [drag_placeholder_1.CdkDragPlaceholder,] },],
        "data": [{ type: core_1.Input, args: ['cdkDragData',] },],
        "lockAxis": [{ type: core_1.Input, args: ['cdkDragLockAxis',] },],
        "started": [{ type: core_1.Output, args: ['cdkDragStarted',] },],
        "ended": [{ type: core_1.Output, args: ['cdkDragEnded',] },],
        "entered": [{ type: core_1.Output, args: ['cdkDragEntered',] },],
        "exited": [{ type: core_1.Output, args: ['cdkDragExited',] },],
        "dropped": [{ type: core_1.Output, args: ['cdkDragDropped',] },],
        "moved": [{ type: core_1.Output, args: ['cdkDragMoved',] },],
    };
    return CdkDrag;
}());
exports.CdkDrag = CdkDrag;
/** Parses a CSS time value to milliseconds. */
function parseCssTimeUnitsToMs(value) {
    // Some browsers will return it in seconds, whereas others will return milliseconds.
    var multiplier = value.toLowerCase().indexOf('ms') > -1 ? 1 : 1000;
    return parseFloat(value) * multiplier;
}
/** Gets the transition duration, including the delay, of an element in milliseconds. */
function getTransitionDurationInMs(element) {
    var computedStyle = getComputedStyle(element);
    var rawDuration = computedStyle.getPropertyValue('transition-duration');
    var rawDelay = computedStyle.getPropertyValue('transition-delay');
    return parseCssTimeUnitsToMs(rawDuration) + parseCssTimeUnitsToMs(rawDelay);
}
//# sourceMappingURL=drag.js.map