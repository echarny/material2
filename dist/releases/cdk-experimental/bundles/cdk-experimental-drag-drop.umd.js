/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/platform'), require('rxjs'), require('@angular/cdk/bidi'), require('@angular/cdk/overlay'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define('@angular/cdk-experimental/dragDrop', ['exports', '@angular/core', '@angular/common', '@angular/cdk/platform', 'rxjs', '@angular/cdk/bidi', '@angular/cdk/overlay', 'rxjs/operators'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['cdk-experimental'] = global.ng['cdk-experimental'] || {}, global.ng['cdk-experimental'].dragDrop = {}),global.ng.core,global.ng.common,global.ng.cdk.platform,global.rxjs,global.ng.cdk.bidi,global.ng.cdk.overlay,global.rxjs.operators));
}(this, (function (exports,core,common,platform,rxjs,bidi,overlay,operators) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Handle that can be used to drag and CdkDrag instance.
 */
var CdkDragHandle = /** @class */ (function () {
    function CdkDragHandle(element) {
        this.element = element;
    }
    CdkDragHandle.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkDragHandle]',
                    host: {
                        'class': 'cdk-drag-handle'
                    }
                },] },
    ];
    /** @nocollapse */
    CdkDragHandle.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    return CdkDragHandle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Injection token that is used to provide a CdkDrop instance to CdkDrag.
 * Used for avoiding circular imports.
 */
var /** @type {?} */ CDK_DROP_CONTAINER = new core.InjectionToken('CDK_DROP_CONTAINER');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Element that will be used as a template for the preview
 * of a CdkDrag when it is being dragged.
 * @template T
 */
var CdkDragPreview = /** @class */ (function () {
    function CdkDragPreview(templateRef) {
        this.templateRef = templateRef;
    }
    CdkDragPreview.decorators = [
        { type: core.Directive, args: [{
                    selector: 'ng-template[cdkDragPreview]'
                },] },
    ];
    /** @nocollapse */
    CdkDragPreview.ctorParameters = function () { return [
        { type: core.TemplateRef, },
    ]; };
    CdkDragPreview.propDecorators = {
        "data": [{ type: core.Input },],
    };
    return CdkDragPreview;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Element that will be used as a template for the placeholder of a CdkDrag when
 * it is being dragged. The placeholder is displayed in place of the element being dragged.
 * @template T
 */
var CdkDragPlaceholder = /** @class */ (function () {
    function CdkDragPlaceholder(templateRef) {
        this.templateRef = templateRef;
    }
    CdkDragPlaceholder.decorators = [
        { type: core.Directive, args: [{
                    selector: 'ng-template[cdkDragPlaceholder]'
                },] },
    ];
    /** @nocollapse */
    CdkDragPlaceholder.ctorParameters = function () { return [
        { type: core.TemplateRef, },
    ]; };
    CdkDragPlaceholder.propDecorators = {
        "data": [{ type: core.Input },],
    };
    return CdkDragPlaceholder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Event options that can be used to bind an active event.
 */
var /** @type {?} */ activeEventOptions = platform.supportsPassiveEventListeners() ? { passive: false } : false;
// unsupported: template constraints.
/**
 * Service that keeps track of all the drag item and drop container
 * instances, and manages global event listeners on the `document`.
 * \@docs-private
 * @template I, C
 */
var DragDropRegistry = /** @class */ (function () {
    function DragDropRegistry(_ngZone, _document) {
        var _this = this;
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
        this.pointerMove = new rxjs.Subject();
        /**
         * Emits the `touchend` or `mouseup` events that are dispatched
         * while the user is dragging a drag item instance.
         */
        this.pointerUp = new rxjs.Subject();
        /**
         * Listener used to prevent `touchmove` events while the element is being dragged.
         * This gets bound once, ahead of time, because WebKit won't preventDefault on a
         * dynamically-added `touchmove` listener. See https://bugs.webkit.org/show_bug.cgi?id=184250.
         */
        this._preventScrollListener = function (event) {
            if (_this._activeDragInstances.size) {
                event.preventDefault();
            }
        };
        this._document = _document;
    }
    /** Adds a drop container to the registry. */
    /**
     * Adds a drop container to the registry.
     * @param {?} drop
     * @return {?}
     */
    DragDropRegistry.prototype.registerDropContainer = /**
     * Adds a drop container to the registry.
     * @param {?} drop
     * @return {?}
     */
    function (drop) {
        if (!this._dropInstances.has(drop)) {
            if (this.getDropContainer(drop.id)) {
                throw Error("Drop instance with id \"" + drop.id + "\" has already been registered.");
            }
            this._dropInstances.add(drop);
        }
    };
    /** Adds a drag item instance to the registry. */
    /**
     * Adds a drag item instance to the registry.
     * @param {?} drag
     * @return {?}
     */
    DragDropRegistry.prototype.registerDragItem = /**
     * Adds a drag item instance to the registry.
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        var _this = this;
        this._dragInstances.add(drag);
        if (this._dragInstances.size === 1) {
            this._ngZone.runOutsideAngular(function () {
                // The event handler has to be explicitly active, because
                // newer browsers make it passive by default.
                // The event handler has to be explicitly active, because
                // newer browsers make it passive by default.
                _this._document.addEventListener('touchmove', _this._preventScrollListener, activeEventOptions);
            });
        }
    };
    /** Removes a drop container from the registry. */
    /**
     * Removes a drop container from the registry.
     * @param {?} drop
     * @return {?}
     */
    DragDropRegistry.prototype.removeDropContainer = /**
     * Removes a drop container from the registry.
     * @param {?} drop
     * @return {?}
     */
    function (drop) {
        this._dropInstances.delete(drop);
    };
    /** Removes a drag item instance from the registry. */
    /**
     * Removes a drag item instance from the registry.
     * @param {?} drag
     * @return {?}
     */
    DragDropRegistry.prototype.removeDragItem = /**
     * Removes a drag item instance from the registry.
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        this._dragInstances.delete(drag);
        this.stopDragging(drag);
        if (this._dragInstances.size === 0) {
            this._document.removeEventListener('touchmove', this._preventScrollListener, /** @type {?} */ (activeEventOptions));
        }
    };
    /**
     * Starts the dragging sequence for a drag instance.
     * @param drag Drag instance which is being dragged.
     * @param event Event that initiated the dragging.
     */
    /**
     * Starts the dragging sequence for a drag instance.
     * @param {?} drag Drag instance which is being dragged.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    DragDropRegistry.prototype.startDragging = /**
     * Starts the dragging sequence for a drag instance.
     * @param {?} drag Drag instance which is being dragged.
     * @param {?} event Event that initiated the dragging.
     * @return {?}
     */
    function (drag, event) {
        var _this = this;
        this._activeDragInstances.add(drag);
        if (this._activeDragInstances.size === 1) {
            var /** @type {?} */ isTouchEvent = event.type.startsWith('touch');
            var /** @type {?} */ moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
            var /** @type {?} */ upEvent = isTouchEvent ? 'touchend' : 'mouseup';
            // We explicitly bind __active__ listeners here, because newer browsers will default to
            // passive ones for `mousemove` and `touchmove`. The events need to be active, because we
            // use `preventDefault` to prevent the page from scrolling while the user is dragging.
            this._globalListeners
                .set(moveEvent, { handler: function (e) { return _this.pointerMove.next(e); }, options: activeEventOptions })
                .set(upEvent, { handler: function (e) { return _this.pointerUp.next(e); } })
                .forEach(function (config, name) {
                _this._ngZone.runOutsideAngular(function () {
                    _this._document.addEventListener(name, config.handler, config.options);
                });
            });
        }
    };
    /** Stops dragging a drag item instance. */
    /**
     * Stops dragging a drag item instance.
     * @param {?} drag
     * @return {?}
     */
    DragDropRegistry.prototype.stopDragging = /**
     * Stops dragging a drag item instance.
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        this._activeDragInstances.delete(drag);
        if (this._activeDragInstances.size === 0) {
            this._clearGlobalListeners();
        }
    };
    /** Gets whether a drag item instance is currently being dragged. */
    /**
     * Gets whether a drag item instance is currently being dragged.
     * @param {?} drag
     * @return {?}
     */
    DragDropRegistry.prototype.isDragging = /**
     * Gets whether a drag item instance is currently being dragged.
     * @param {?} drag
     * @return {?}
     */
    function (drag) {
        return this._activeDragInstances.has(drag);
    };
    /** Gets a drop container by its id. */
    /**
     * Gets a drop container by its id.
     * @param {?} id
     * @return {?}
     */
    DragDropRegistry.prototype.getDropContainer = /**
     * Gets a drop container by its id.
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return Array.from(this._dropInstances).find(function (instance) { return instance.id === id; });
    };
    /**
     * @return {?}
     */
    DragDropRegistry.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dragInstances.forEach(function (instance) { return _this.removeDragItem(instance); });
        this._dropInstances.forEach(function (instance) { return _this.removeDropContainer(instance); });
        this._clearGlobalListeners();
        this.pointerMove.complete();
        this.pointerUp.complete();
    };
    /**
     * Clears out the global event listeners from the `document`.
     * @return {?}
     */
    DragDropRegistry.prototype._clearGlobalListeners = /**
     * Clears out the global event listeners from the `document`.
     * @return {?}
     */
    function () {
        var _this = this;
        this._globalListeners.forEach(function (config, name) {
            _this._document.removeEventListener(name, config.handler, config.options);
        });
        this._globalListeners.clear();
    };
    DragDropRegistry.decorators = [
        { type: core.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    DragDropRegistry.ctorParameters = function () { return [
        { type: core.NgZone, },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
    ]; };
    /** @nocollapse */ DragDropRegistry.ngInjectableDef = core.defineInjectable({ factory: function DragDropRegistry_Factory() { return new DragDropRegistry(core.inject(core.NgZone), core.inject(common.DOCUMENT)); }, token: DragDropRegistry, providedIn: "root" });
    return DragDropRegistry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this._destroyed = new rxjs.Subject();
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
        this._moveEvents = new rxjs.Subject();
        /**
         * Amount of subscriptions to the move event. Used to avoid
         * hitting the zone if the consumer didn't subscribe to it.
         */
        this._moveEventSubscriptions = 0;
        /**
         * Emits when the user starts dragging the item.
         */
        this.started = new core.EventEmitter();
        /**
         * Emits when the user stops dragging an item in the container.
         */
        this.ended = new core.EventEmitter();
        /**
         * Emits when the user has moved the item into a new container.
         */
        this.entered = new core.EventEmitter();
        /**
         * Emits when the user removes the item its container by dragging it into another container.
         */
        this.exited = new core.EventEmitter();
        /**
         * Emits when the user drops the item inside a container.
         */
        this.dropped = new core.EventEmitter();
        /**
         * Emits as the user is dragging the item. Use with caution,
         * because this event will fire for every pixel that the user has dragged.
         */
        this.moved = rxjs.Observable.create(function (observer) {
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
            var /** @type {?} */ endedOrDestroyed = rxjs.merge(_this.ended, _this._destroyed);
            _this._dragDropRegistry.pointerMove
                .pipe(operators.takeUntil(endedOrDestroyed))
                .subscribe(_this._pointerMove);
            _this._dragDropRegistry.pointerUp
                .pipe(operators.takeUntil(endedOrDestroyed))
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
        { type: core.Directive, args: [{
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
        { type: core.ElementRef, },
        { type: undefined, decorators: [{ type: core.Inject, args: [CDK_DROP_CONTAINER,] }, { type: core.Optional }, { type: core.SkipSelf },] },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
        { type: core.NgZone, },
        { type: core.ViewContainerRef, },
        { type: overlay.ViewportRuler, },
        { type: DragDropRegistry, },
        { type: bidi.Directionality, decorators: [{ type: core.Optional },] },
    ]; };
    CdkDrag.propDecorators = {
        "_handles": [{ type: core.ContentChildren, args: [CdkDragHandle,] },],
        "_previewTemplate": [{ type: core.ContentChild, args: [CdkDragPreview,] },],
        "_placeholderTemplate": [{ type: core.ContentChild, args: [CdkDragPlaceholder,] },],
        "data": [{ type: core.Input, args: ['cdkDragData',] },],
        "lockAxis": [{ type: core.Input, args: ['cdkDragLockAxis',] },],
        "started": [{ type: core.Output, args: ['cdkDragStarted',] },],
        "ended": [{ type: core.Output, args: ['cdkDragEnded',] },],
        "entered": [{ type: core.Output, args: ['cdkDragEntered',] },],
        "exited": [{ type: core.Output, args: ['cdkDragExited',] },],
        "dropped": [{ type: core.Output, args: ['cdkDragDropped',] },],
        "moved": [{ type: core.Output, args: ['cdkDragMoved',] },],
    };
    return CdkDrag;
}());
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.dropped = new core.EventEmitter();
        /**
         * Emits when the user has moved a new drag item into this container.
         */
        this.entered = new core.EventEmitter();
        /**
         * Emits when the user removes an item from the container
         * by dragging it into another container.
         */
        this.exited = new core.EventEmitter();
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
        { type: core.Component, args: [{selector: 'cdk-drop',
                    exportAs: 'cdkDrop',
                    template: '<ng-content></ng-content>',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
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
        { type: core.ElementRef, },
        { type: DragDropRegistry, },
    ]; };
    CdkDrop.propDecorators = {
        "_draggables": [{ type: core.ContentChildren, args: [core.forwardRef(function () { return CdkDrag; }),] },],
        "connectedTo": [{ type: core.Input },],
        "data": [{ type: core.Input },],
        "orientation": [{ type: core.Input },],
        "id": [{ type: core.Input },],
        "lockAxis": [{ type: core.Input },],
        "enterPredicate": [{ type: core.Input },],
        "dropped": [{ type: core.Output },],
        "entered": [{ type: core.Output },],
        "exited": [{ type: core.Output },],
    };
    return CdkDrop;
}());

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
    var /** @type {?} */ from = clamp(fromIndex, array.length - 1);
    var /** @type {?} */ to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    var /** @type {?} */ target = array[from];
    var /** @type {?} */ delta = to < from ? -1 : 1;
    for (var /** @type {?} */ i = from; i !== to; i += delta) {
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
    var /** @type {?} */ from = clamp(currentIndex, currentArray.length - 1);
    var /** @type {?} */ to = clamp(targetIndex, targetArray.length);
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
var DragDropModule = /** @class */ (function () {
    function DragDropModule() {
    }
    DragDropModule.decorators = [
        { type: core.NgModule, args: [{
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
    return DragDropModule;
}());

exports.CdkDrop = CdkDrop;
exports.CDK_DROP_CONTAINER = CDK_DROP_CONTAINER;
exports.CdkDrag = CdkDrag;
exports.CdkDragHandle = CdkDragHandle;
exports.moveItemInArray = moveItemInArray;
exports.transferArrayItem = transferArrayItem;
exports.CdkDragPreview = CdkDragPreview;
exports.CdkDragPlaceholder = CdkDragPlaceholder;
exports.DragDropModule = DragDropModule;
exports.DragDropRegistry = DragDropRegistry;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-experimental-drag-drop.umd.js.map
